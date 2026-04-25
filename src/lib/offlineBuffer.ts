// IndexedDB wrapper for offline GPS buffering
// Stores GPS points when offline, syncs when connection restored

export interface BufferedPoint {
  lat: number
  lng: number
  speedKnots: number
  heading: number | null
  accuracy: number
  recordedAt: string
}

const DB_NAME = 'svalla-gps'
const DB_VERSION = 1
const STORE_NAME = 'pending_points'

/**
 * Initialize IndexedDB if available
 */
function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not available'))
      return
    }

    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onerror = () => reject(req.error)
    req.onsuccess = () => resolve(req.result)

    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement: true })
      }
    }
  })
}

/**
 * Buffer a GPS point to IndexedDB
 */
export async function bufferPoint(point: BufferedPoint): Promise<void> {
  try {
    const db = await getDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    return new Promise((resolve, reject) => {
      const req = store.add(point)
      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve()
    })
  } catch {
    // IndexedDB not available or error - silently fail
  }
}

/**
 * Retrieve all pending points
 */
export async function getPendingPoints(): Promise<{ key: IDBValidKey; point: BufferedPoint }[]> {
  try {
    const db = await getDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    return new Promise((resolve, reject) => {
      const req = store.openCursor()
      const result: { key: IDBValidKey; point: BufferedPoint }[] = []
      req.onerror = () => reject(req.error)
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest).result as IDBCursorWithValue | null
        if (cursor) {
          result.push({
            key: cursor.key,
            point: cursor.value as BufferedPoint,
          })
          cursor.continue()
        } else {
          resolve(result)
        }
      }
    })
  } catch {
    return []
  }
}

/**
 * Clear specific points by their keys after successful sync
 */
export async function clearPoints(keys: IDBValidKey[]): Promise<void> {
  try {
    const db = await getDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    return new Promise((resolve, reject) => {
      let completed = 0
      let hasError = false

      if (keys.length === 0) {
        resolve()
        return
      }

      keys.forEach((key) => {
        const req = store.delete(key)
        req.onerror = () => {
          hasError = true
          reject(req.error)
        }
        req.onsuccess = () => {
          completed++
          if (completed === keys.length && !hasError) {
            resolve()
          }
        }
      })
    })
  } catch {
    // Silently fail
  }
}

/**
 * Get count of pending points
 */
export async function getPendingCount(): Promise<number> {
  try {
    const db = await getDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    return new Promise((resolve, reject) => {
      const req = store.count()
      req.onerror = () => reject(req.error)
      req.onsuccess = () => resolve(req.result)
    })
  } catch {
    return 0
  }
}

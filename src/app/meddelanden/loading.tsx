// Högerspalten på dator medan sidan laddas. Inkorgen visar sitt eget laddläge.
export default function Loading() {
  return (
    <div className="md-valj" aria-busy="true">
      <div className="md-snurra" style={{ margin: 'auto' }} />
    </div>
  )
}

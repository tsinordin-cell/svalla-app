import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      '.netlify/**',
      '.vercel/**',
      'android/**',
      'ios/**',
      'next-env.d.ts',
      'tsconfig.tsbuildinfo',
    ],
  },

  // Bas: ESLint recommended + TypeScript recommended
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React + Next + a11y + import + unused-imports
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Notification: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        Blob: 'readonly',
        Image: 'readonly',
        Audio: 'readonly',
        FormData: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        AbortController: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        Event: 'readonly',
        Node: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLImageElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLSelectElement: 'readonly',
        IntersectionObserver: 'readonly',
        ResizeObserver: 'readonly',
        Uint8Array: 'readonly',
        // Timers
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        // Console
        console: 'readonly',
        // Node (för API-routes)
        process: 'readonly',
        Buffer: 'readonly',
        // React types
        React: 'readonly',
        JSX: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // ── React ────────────────────────────────────────────────────────────
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Next 15 + React 19: JSX-runtime gör import React onödig
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // PropTypes är dött i en TS-värld
      'react/prop-types': 'off',
      // Tom har medvetet inline-style i hela appen — inte ett bug
      'react/no-unescaped-entities': 'warn',

      // ── Next ─────────────────────────────────────────────────────────────
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Vissa <a href="/..."> är medvetna (cross-app, hard reload, etc).
      // Sänk till warn — fixa ad hoc där det är fel.
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-img-element': 'warn',

      // ── A11y ─────────────────────────────────────────────────────────────
      ...jsxA11y.configs.recommended.rules,
      // Stäng av: kodbasen använder <div onClick> som klickbara kort på
      // hundratals ställen (Svalla designsystem). Korrekt fix kräver en
      // <Pressable>-komponent + omfattande refactor — separat task.
      // Aktivera när Pressable finns och divs ersatts.
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      // Tom använder mycket aria-label på input + label utan htmlFor —
      // legitim mobile-design. Varna för att flagga utan att blockera.
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/media-has-caption': 'warn',
      // Real a11y-bugg om den triggar — håll som error
      'jsx-a11y/html-has-lang': 'error',

      // ── React hooks ──────────────────────────────────────────────────────
      // Klassiska regler — verkliga buggar, error
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Nya v7-regler från React 19 Compiler-eran. De fångar verkliga
      // mönster som blir buggiga med React Compiler men kräver en
      // separat refactor-pass på hela kodbasen (state-i-effects, refs-
      // i-render, Math.random i useMemo, inline-component-definitions).
      // Stäng av nu — aktivera när Compiler ska tas in.
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/config': 'off',
      'react-hooks/gating': 'off',

      // ── Unused imports/vars (auto-fixable, viktig städning) ──────────────
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': 'off', // hanteras av unused-imports nedan
      'unused-imports/no-unused-vars': ['warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // ── TypeScript ───────────────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      // Vi använder { ... } as Foo i många legitima runtime-castings
      '@typescript-eslint/no-non-null-assertion': 'off',

      // ── Bas-JS (ofta dubblerar TS, stäng av) ─────────────────────────────
      'no-unused-vars': 'off',
      'no-undef': 'off', // TS hanterar
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-useless-escape': 'warn',
      'no-prototype-builtins': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',

      // ── Import-ordning (kosmetiskt — varna) ──────────────────────────────
      'import/no-anonymous-default-export': 'warn',
    },
  },

  // Server components & API routes — inga DOM-globals förväntas
  {
    files: ['src/app/**/route.ts', 'src/lib/supabase-server.ts', 'src/middleware.ts'],
    rules: {
      // Lugn på explicit-any i serverkod som hanterar okänd JSON
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Testfiler
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Final override block — säkerställer att globala "no-undef" är av
  // även för filer som matchas av js.configs.recommended men inte av
  // våra files-blocks ovan.
  {
    rules: {
      'no-undef': 'off',
    },
  },
)

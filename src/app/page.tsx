// src/app/page.tsx
'use client'

import dynamic from 'next/dynamic'

// Use dynamic import with SSR disabled for Three.js components
const Experience = dynamic(() => import('@/components/canvas/Experience'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Experience />
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'

interface Stat {
  label: string
  value: number
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 3000
    const step = value / (duration / 16)

    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <span>{count.toLocaleString()}</span>
}

export default function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-white border-t border-[#6ab742]/30">
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto text-center">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="
                rounded-2xl p-8
                bg-white
                border border-[#6ab742]/30
                shadow-sm
                hover:shadow-lg
                transition-all duration-300
              "
            >
              <div className="text-3xl font-extrabold mb-2 text-[#397a34]">
                <Counter value={stat.value} />+
              </div>

              <div className="text-gray-700 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

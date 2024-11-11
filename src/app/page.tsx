'use client'

import { useState } from 'react'
import { Lock, Fish, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Component() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const router = useRouter()

  const menuItems = [
    { icon: Fish, label: 'Variables', color: 'text-red-500' },
    { icon: Lock, label: 'Datatypes', color: 'text-blue-500' },
    { icon: Lock, label: 'Conditionals', color: 'text-cyan-500' },
    { icon: Lock, label: 'Functions', color: 'text-orange-500' },
    { icon: List, label: 'Arrays', color: 'text-amber-500' },
    { icon: Lock, label: 'Loops', color: 'text-green-500' },
    { icon: Lock, label: 'Iteration', color: 'text-white' },
    { icon: Lock, label: 'Objects', color: 'text-blue-400' },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Radial Menu */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-64 w-64 scale-125">
          {menuItems.map((item, index) => {
            const rotation = index * (360 / menuItems.length)
            const isSelected = selectedIndex === index
            const isHovered = hoveredIndex === index
            
            return (
              <button
                key={item.label}
                onClick={() => {
                  setSelectedIndex(index)
                  router.replace(`/${item.label.toLowerCase()}`)
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-900/80 p-4 transition-all hover:bg-gray-800",
                  isSelected && "bg-gray-800"
                )}
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-120px) rotate(-${rotation}deg)`
                }}
                aria-label={item.label}
              >
                <item.icon className={cn("h-full w-full", item.color)} />
                {isHovered && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 text-sm font-bold text-black">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
          
          {/* Center Circle */}
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-900/80 bg-transparent" />
        </div>
      </div>
      
      {/* Selected Item Label */}
      {selectedIndex !== null && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl font-bold text-white">
          {menuItems[selectedIndex].label}
        </div>
      )}
    </div>
  )
}
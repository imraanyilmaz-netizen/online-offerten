'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type ThemeToggleTabsProps = {
  className?: string
}

const triggerClass = cn(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-sm px-1.5 py-1.5 text-xs font-medium',
  'ring-offset-background transition-all',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50 sm:px-2 sm:text-sm'
)

export function ThemeToggleTabs({ className }: ThemeToggleTabsProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn('inline-flex h-9 w-[10rem] sm:w-[14rem] rounded-md bg-muted/60', className)}
        aria-hidden
      />
    )
  }

  const value = theme === 'light' || theme === 'dark' ? theme : 'system'

  return (
    <div
      role="group"
      aria-label="Farbschema"
      className={cn(
        'inline-flex h-9 w-[10rem] sm:w-[14rem] rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
    >
      <div className="grid h-full w-full grid-cols-3 gap-0">
        <button
          type="button"
          className={cn(
            triggerClass,
            value === 'light' && 'bg-background text-foreground shadow-sm'
          )}
          aria-pressed={value === 'light'}
          aria-label="Hellmodus"
          onClick={() => setTheme('light')}
        >
          <Sun className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Hell</span>
        </button>
        <button
          type="button"
          className={cn(
            triggerClass,
            value === 'system' && 'bg-background text-foreground shadow-sm'
          )}
          aria-pressed={value === 'system'}
          aria-label="Systemeinstellung, hell oder dunkel je nach Gerät"
          onClick={() => setTheme('system')}
        >
          <Monitor className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">System</span>
        </button>
        <button
          type="button"
          className={cn(
            triggerClass,
            value === 'dark' && 'bg-background text-foreground shadow-sm'
          )}
          aria-pressed={value === 'dark'}
          aria-label="Dunkelmodus"
          onClick={() => setTheme('dark')}
        >
          <Moon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Dunkel</span>
        </button>
      </div>
    </div>
  )
}

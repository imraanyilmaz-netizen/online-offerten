'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Monitor, Moon, Sun } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type ThemeToggleTabsProps = {
  className?: string
}

export function ThemeToggleTabs({ className }: ThemeToggleTabsProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn('inline-flex h-9 w-[11.5rem] rounded-md bg-muted/60', className)}
        aria-hidden
      />
    )
  }

  const value = theme === 'light' || theme === 'dark' ? theme : 'system'

  return (
    <Tabs value={value} onValueChange={setTheme} className={cn('w-auto', className)}>
      <TabsList className="grid h-9 w-full grid-cols-3 gap-0 p-1">
        <TabsTrigger value="light" className="gap-1 px-1.5 text-xs sm:px-2" aria-label="Hellmodus">
          <Sun className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Hell</span>
        </TabsTrigger>
        <TabsTrigger value="system" className="gap-1 px-1.5 text-xs sm:px-2" aria-label="Systemeinstellung (hell oder dunkel)">
          <Monitor className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">System</span>
        </TabsTrigger>
        <TabsTrigger value="dark" className="gap-1 px-1.5 text-xs sm:px-2" aria-label="Dunkelmodus">
          <Moon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="hidden sm:inline">Dunkel</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

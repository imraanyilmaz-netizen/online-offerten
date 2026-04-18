import type { ReactNode } from 'react'

/**
 * Oturum / ödeme / giriş sayfaları — arka plan ve metin rengi tema değişkenleriyle
 * (karanlık mod) uyumlu olsun.
 */
export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>
}

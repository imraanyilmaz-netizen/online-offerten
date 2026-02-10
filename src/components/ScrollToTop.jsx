'use client'

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Smooth scroll to top on page navigation
    // Belirli yollarda scroll yapma (örneğin, form adımları arasında)
    // Eğer belirli sayfalarda bu davranış istenmiyorsa, burada koşul eklenebilir.
    // Örneğin: if (!pathname.startsWith('/form-step')) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
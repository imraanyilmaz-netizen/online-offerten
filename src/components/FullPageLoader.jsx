import React from 'react';
import { Loader2 } from 'lucide-react';

const FullPageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
    <Loader2 className="h-12 w-12 animate-spin text-green-600" />
  </div>
);

export default FullPageLoader;


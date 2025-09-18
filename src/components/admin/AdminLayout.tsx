'use client'

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6 max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  )
}


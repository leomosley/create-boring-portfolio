'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SiAnalogue } from 'react-icons/si';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  return pathname !== '/' ? (
    <button
      className='underline-offset-4 underline decoration-neutral-500 transition hover:decoration-inherit'
      onClick={() => router.back()}
    >← back
    </button>
  ) : (
    <SiAnalogue style={{ rotate: '242deg'}} />
  );
}

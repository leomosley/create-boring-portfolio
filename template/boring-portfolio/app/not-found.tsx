import React from 'react';
import Link from 'next/link';

export default function PageNotFound() {
  return (
    <div className='flex flex-col gap-2 mx-auto my-32'>
      <span className='text-3xl font-bold'>404 | page not found</span>
      <Link 
        className='underline-offset-4 underline decoration-neutral-500 transition hover:decoration-inherit mx-auto mt-2'
        href='/'
      >
        Home →
      </Link>
    </div>
  );
}
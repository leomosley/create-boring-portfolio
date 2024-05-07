import React from 'react';
import BackButton from './BackButton';

export default function Header() {
  return (
    <header id='header' className='flex mb-4'>
      <BackButton />
      <p className='text-neutral-400 ml-auto'>{process.env.GITHUB_USERNAME}</p>
    </header>
  );
}

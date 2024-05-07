import React from 'react';

import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';

export default async function Home() {
  return (
    <>
      <section id='intro' className='mt-8'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        </p>
      </section>
      <Projects />
      <Blogs />
    </>
  );
}
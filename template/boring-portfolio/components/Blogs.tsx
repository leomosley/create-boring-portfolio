import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { BlogItem } from './blog-item';
import { getBlogs } from '@/lib/utils';

export function Blogs() {
  const blogs = getBlogs();
  return (
    <section id='blog' className='w-full space-y-5'>
      <h2 className='text-xl font-bold mt-20'>Blog</h2>
      <div className='flex flex-col space-y-4'>
        {blogs?.slice(0, 4).map((blog, index) => (
          <BlogItem key={index} blog={blog} />
        ))}
        <div className='flex'>
          <Link
            className={clsx(
              'underline-offset-4 underline decoration-neutral-500',
              'transition hover:decoration-inherit'
            )}
            href='/blog'
          >All posts →
          </Link>
        </div>
      </div>
    </section>
  )
}

import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Blog } from '@/blog/interfaces';

interface Props {
  blog: Blog;
  description?: boolean;
  date?: boolean;
}

export function BlogItem({
  blog,
  description = false,
  date = true
}: Props) {
  return (
    <div className='flex'>
      <div className='flex flex-col space-y-1'>
        <Link
          className={clsx(
            'underline-offset-4 underline decoration-neutral-500',
            'transition hover:decoration-inherit'
          )}
          href={`/blog/${blog.data.filename.slice(0, -3)}`}
        >{blog.data.title}
        </Link>
        {description && <p className='text-neutral-300'>{blog.data.description}</p>}
      </div>
      {date && <p className='ml-auto min-w-fit'>{blog.data.date}</p>}
    </div>
  );
}

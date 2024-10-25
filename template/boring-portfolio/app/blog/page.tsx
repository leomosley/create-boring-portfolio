import React from 'react';
import { Metadata } from 'next';
import { getBlogs } from '@/lib/utils';
import { BlogItem } from '@/components/blog-item';

export const metadata: Metadata = {
  title: `Blog • ${process.env.GITHUB_USERNAME}`
}

export default function BlogHome() {
  const blogs = getBlogs();
  return (
    <section className='flex flex-col space-y-5 mt-8'>
      <h1 className='text-4xl font-bold'>Blog</h1>
      {blogs.map((blog, index) => (
        <BlogItem
          key={index}
          blog={blog}
          description={true}
          date={false}
        />
      ))}
    </section>
  )
}

import { getBlog } from '@/lib/utils';
import React from 'react';
import Markdown from 'react-markdown';


export default async function Blog(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = getBlog(params.slug + '.md');
  return (
    <article className='prose prose-h1:text-3xl prose-invert mt-8'>
      {blog ? (
        <Markdown>{blog.content}</Markdown>
      ) : (
        <p>Content couldnt be loaded.</p>
      )}
    </article>
  );
}

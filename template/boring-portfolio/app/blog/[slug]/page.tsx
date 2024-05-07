import React from 'react';
import Markdown from 'react-markdown';
import getBlog from '@/utils/getBlog';


export default async function Blog({ params } : { params: { slug: string}}) {
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

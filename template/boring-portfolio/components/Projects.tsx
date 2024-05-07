import React from 'react';
import clsx from 'clsx';

interface Repo {
  [key: string]: string;
}

async function getRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch repos');
    }
    return await res.json() as Repo[];

  } catch (error) {
    console.error(error);
  }
}
async function getProjectRepos() {
  const repos = await getRepos();
  if (repos) {
    const filtered = repos.filter(repo => repo.topics?.includes(process.env.REPO_TAG ?? ''));
    return filtered;
  }
}

export default async function Projects() {
  const repos = await getProjectRepos();
  return (
    <section id='projects' className='w-full space-y-5'>
      <h2 className='text-xl font-bold mt-12'>Projects</h2>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
        {repos?.slice(0, 6).map((repo, index) => (
          <div key={index} className='flex flex-1 flex-col space-y-2'>
            <a
              className={clsx(
                'underline-offset-4 underline decoration-neutral-500',
                'transition hover:decoration-inherit'
              )}
              target='_blank'
              href={repo.html_url}  
            >{repo.name}
            </a>
            <p className='text-neutral-300'>{repo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
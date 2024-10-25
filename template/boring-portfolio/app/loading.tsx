import clsx from 'clsx';
import Link from 'next/link';

export default function Loading() {
  return (
    <>
      <section id='intro' className='mt-8'>
        <p>
          Hi there, I&apos;m <b>Leo</b>.
          I&apos;m a Software Engineering student at <a target='_blank' href='https://www.port.ac.uk/'><b>UoP</b></a>
          who&apos;s passionate about <b>coding</b> and <b>building cool things</b>.
          I enjoy <b>full-stack web development</b>, creating fun <b>APIs</b>, and everything else <b>code</b>.
        </p>
      </section>
      <section id='projects' className='w-full space-y-5'>
        <h2 className='text-xl font-bold mt-12'>Projects</h2>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
          {[...Array(3)].slice(0, 6).map((value, index) => (
            <div key={index} className='flex flex-1 flex-col space-y-2 my-1.5'>
              <div
                className={clsx(
                  'underline-offset-4 underline decoration-neutral-500',
                  'transition hover:decoration-inherit'
                )}
              >
                <div className='animate-pulse rounded-md bg-neutral-500/20 h-[1rem] w-28 mb-1'></div>
              </div>
              <div className='animate-pulse rounded-md bg-neutral-500/20 h-[1rem] w-36'></div>
              <div className='animate-pulse rounded-md bg-neutral-500/20 h-[1rem] w-14'></div>
            </div>
          ))}
        </div>
      </section>
      <section id='blog' className='w-full space-y-5'>
        <h2 className='text-xl font-bold mt-20'>Blog</h2>
        <div className='flex flex-col space-y-4'>
          {[...Array(1)].slice(0, 4).map((value, index) => (
            <div key={index} className="flex gap-1 my-1">
              <div className='animate-pulse rounded-md bg-neutral-500/20 h-[1rem] w-24' ></div>
              <div className='ml-auto animate-pulse rounded-md bg-neutral-500/20 h-[1rem] w-14' ></div>
            </div>
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
      </section >
    </>
  );
}

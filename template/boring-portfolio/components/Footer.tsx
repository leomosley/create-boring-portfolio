import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter, FaSitemap, FaRss} from 'react-icons/fa6';

export default function Footer() {
  const url = process.env.VERCEL_URL
    ? 'https://' + process.env.VERCEL_URL
    : 'http://localhost:3000'
  ;
  const links = [
    { href: `${url}/sitemap.xml`, icon: <FaSitemap /> },
    { href: `${url}/feed.xml`, icon: <FaRss />},
    { href: 'https://github.com/leomosley', icon: <FaGithub />},
    { href: 'https://www.linkedin.com/in/leo-mosley-606785222/', icon: <FaLinkedin />},
    { href: 'https://twitter.com/leomosly', icon: <FaXTwitter />},

  ];
  return (
    <footer id='footer' className='flex border-t-2 mt-20 mb-4 border-neutral-400'>
      <div className='flex gap-4 ml-auto mt-4 text-neutral-400'>
        {links.map((link, index) => (
          <a 
            key={index} 
            className=''
            target='_blank'
            href={link.href}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}

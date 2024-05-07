import fs from 'fs';
import matter from 'gray-matter';
import { Blog } from '@/blog/interfaces';

export default function getBlogs() {
  try {
    const files = fs.readdirSync(
      process.cwd() + '/blog'
    );
    const markdownPosts = files.filter(file => file.endsWith('.md'));
  
    const blogs = markdownPosts.map((filename) => {
      const fileContents = fs.readFileSync(`blog/${filename}`, 'utf8')
      return matter(fileContents);
    });
    return blogs as Blog[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
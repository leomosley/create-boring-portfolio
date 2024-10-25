import fs from 'fs';
import matter from 'gray-matter';
import { Blog } from '@/blog/interfaces';

export function getBlogs() {
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

export function getBlog(filename: string) {
  try {
    const blogs = getBlogs();
    const content = blogs.find(blog => blog.data.filename === filename);
    return content;
  } catch (error) {
    console.log(error);
  }
}
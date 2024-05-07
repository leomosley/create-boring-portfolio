import getBlogs from './getBlogs';

export default function getBlog(filename: string) {
  try {
    const blogs = getBlogs();
    const content = blogs.find(blog => blog.data.filename === filename);
    return content;
  } catch (error) {
    console.log(error);
  }
}
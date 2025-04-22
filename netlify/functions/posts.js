import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export const handler = async () => {
  try {
    const directory = path.join(process.cwd(), 'content', 'blog');
    const files = await fs.readdir(directory);

    const posts = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directory, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        if (!content.trim()) {
          console.log(`Skipping empty file: ${file}`);
          return null;
        }

        const { data, content: body } = matter(content);

        if (!data.title || !body.trim()) {
          console.log(`Skipping invalid post: ${file}`);
          return null;
        }

        const excerpt = body.slice(0, 150) + (body.length > 150 ? '...' : '');

        return {
          slug: file.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          thumbnail: data.thumbnail || '/profileHD.jpeg',
          category: data.category || 'Uncategorized',
          excerpt,
          body,
        };
      })
    );

    const validPosts = posts.filter(post => post !== null);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validPosts),
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to fetch posts',
        details: error.message,
      }),
    };
  }
};

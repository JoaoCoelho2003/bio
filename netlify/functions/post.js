import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export const handler = async (event) => {
  try {
    const slug = event.path.split('/').pop();
    console.log('Fetching post with slug:', slug);

    const directory = path.join(process.cwd(), 'content', 'blog');
    const files = await fs.readdir(directory);

    const matchingFile = files.find((file) => file.includes(slug));

    if (!matchingFile) {
      throw new Error(`No post found for slug: ${slug}`);
    }

    const filePath = path.join(directory, matchingFile);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const excerpt = content.slice(0, 150) + (content.length > 150 ? '...' : '');

    const body = content;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: matchingFile.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        thumbnail: data.thumbnail || '/default-thumbnail.jpg',
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        excerpt,
        body,
      }),
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Post not found',
        details: error.message,
        stack: error.stack,
      }),
    };
  }
};
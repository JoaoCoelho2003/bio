import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export const handler = async (event) => {
  try {
    const slug = event.path.split('/').pop();
    console.log('Fetching project with slug:', slug);

    const directory = path.join(process.cwd(), 'content', 'projects');
    const files = await fs.readdir(directory);

    const matchingFile = files.find((file) => file.includes(slug));

    if (!matchingFile) {
      throw new Error(`No project found for slug: ${slug}`);
    }

    const filePath = path.join(directory, matchingFile);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const body = content;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: matchingFile.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        images: Array.isArray(data.images) ? data.images : (data.images ? [data.images] : []),
        technologies: Array.isArray(data.technologies) ? data.technologies : (data.technologies ? [data.technologies] : []),
        liveUrl: data.liveUrl || '',
        repoUrl: data.repoUrl || '',
        body,
      }),
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Project not found',
        details: error.message,
        stack: error.stack,
      }),
    };
  }
};

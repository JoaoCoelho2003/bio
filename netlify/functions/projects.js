import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export const handler = async () => {
  try {
    const directory = path.join(process.cwd(), 'content', 'projects');
    const files = await fs.readdir(directory);

    const projects = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directory, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        if (!content.trim()) {
          console.log(`Skipping empty file: ${file}`);
          return null;
        }

        const { data, content: body } = matter(content);

        if (!data.title || !body.trim()) {
          console.log(`Skipping invalid project: ${file}`);
          return null;
        }

        return {
          slug: file.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          description: data.description || '',
          images: Array.isArray(data.images) ? data.images : (data.images ? [data.images] : []),
          technologies: Array.isArray(data.technologies) ? data.technologies : (data.technologies ? [data.technologies] : []),
          liveUrl: data.liveUrl || '',
          repoUrl: data.repoUrl || '',
          body,
        };
      })
    );

    const validProjects = projects.filter(project => project !== null);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validProjects),
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to fetch projects',
        details: error.message,
      }),
    };
  }
};

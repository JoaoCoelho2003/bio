import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});


export async function loadContent(path) {
  try {
    const response = await fetch(`/data/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${path}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading content from ${path}:`, error);
    throw error;
  }
}


export function parseMarkdown(markdown) {
  if (!markdown) return '';
  return md.render(markdown);
}


export async function loadBlogPosts() {
  try {
    const response = await fetch('/data/blog/index.json');
    const { posts } = await response.json();
    
    const blogPosts = await Promise.all(
      posts.map(async (filename) => {
        const post = await loadContent(`blog/${filename}`);
        return {
          ...post,
          excerpt: post.content.slice(0, 150) + (post.content.length > 150 ? '...' : '')
        };
      })
    );
    
    return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function loadBlogPost(id) {
  return await loadContent(`blog/${id}.json`);
}

export async function loadProjects() {
  return await loadContent('projects.json');
}

export async function loadProfile() {
  return await loadContent('profile.json');
}

export async function loadEducation() {
  return await loadContent('education.json');
}

export async function loadExperience() {
  return await loadContent('experience.json');
}

export async function loadAchievements() {
  return await loadContent('achievements.json');
}

export async function loadSkills() {
  return await loadContent('skills.json');
}

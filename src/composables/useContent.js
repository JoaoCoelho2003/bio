import { ref } from 'vue';
import {
  loadProfile,
  loadEducation,
  loadExperience,
  loadAchievements,
  loadSkills,
  loadProjects,
  loadBlogPosts,
  loadBlogPost,
  parseMarkdown
} from '@/utils/contentLoader';

export function useContent() {
  const loading = ref(false);
  const error = ref(null);

  const loadData = async (loader) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await loader();
      return data;
    } catch (err) {
      error.value = err.message;
      console.error('Error loading content:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    parseMarkdown,
    getProfile: () => loadData(loadProfile),
    getEducation: () => loadData(loadEducation),
    getExperience: () => loadData(loadExperience),
    getAchievements: () => loadData(loadAchievements),
    getSkills: () => loadData(loadSkills),
    getProjects: () => loadData(loadProjects),
    getBlogPosts: () => loadData(loadBlogPosts),
    getBlogPost: (id) => loadData(() => loadBlogPost(id)),
  };
}

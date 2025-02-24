import { createRouter, createWebHistory } from "vue-router"
import LandingView from "../views/LandingView.vue"
import HomeView from "../views/HomeView.vue"
import SkillsView from "../views/SkillsView.vue"
import ProjectsView from "../views/ProjectsView.vue"
import ContactView from "../views/ContactView.vue"
import BlogView from "../views/BlogView.vue"
import BlogPostView from "../views/BlogPostView.vue"
import NotFound from "../views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      meta: {
        title: 'João Coelho | Software Engineer & Full Stack Developer',
        description: 'Welcome to my digital realm. Software Engineer specializing in full-stack development, AI, and cybersecurity. Master\'s student at University of Minho.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        title: 'Home | João Coelho',
        description: 'First-year Master\'s student in Software Engineering at University of Minho. Expertise in Full Stack Development, AI, and Software Engineering.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/skills",
      name: "skills",
      component: SkillsView,
      meta: {
        title: 'Technical Arsenal | João Coelho',
        description: 'Explore my technical skills in Elixir, Phoenix, Python, JavaScript, TypeScript, Vue.js, and more. Full stack developer with expertise in various technologies.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
      meta: {
        title: 'Digital Creations | João Coelho',
        description: 'Browse my portfolio of projects including NFT marketplaces, 3D engines, and image management platforms.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: {
        title: 'Establish Connection | João Coelho',
        description: 'Get in touch for collaboration opportunities or questions. Based in Braga, Portugal. Let\'s create something amazing together.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/blog",
      name: "blog",
      component: BlogView,
      meta: {
        title: 'Cyber Chronicles | João Coelho',
        description: 'Explore the digital frontier through my curated collection of tech musings.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/blog/:slug",
      name: "blogPost",
      component: BlogPostView,
      meta: {
        title: 'Blog | João Coelho',
        description: 'Tech insights and programming knowledge sharing.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
      meta: {
        title: '404 - System Malfunction | João Coelho',
        description: 'The requested data packet has been lost in the digital void.',
        image: 'https://sjc.microlink.io/mgfYbADPF1sl6zLr80j0bMa6-WGEcRERRSxTQ33sXsNOjybms8WGP3NaObakI4NeywfsCTgNNAbWa6iebSCAGQ.jpeg'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  const metaTags = [
    {
      name: 'description',
      content: to.meta.description
    },
    {
      property: 'og:title',
      content: to.meta.title
    },
    {
      property: 'og:description',
      content: to.meta.description
    },
    {
      property: 'og:image',
      content: to.meta.image
    },
    {
      property: 'og:url',
      content: `https://joaocoelho.xyz${to.path}`
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:title',
      content: to.meta.title
    },
    {
      property: 'twitter:description',
      content: to.meta.description
    },
    {
      property: 'twitter:image',
      content: to.meta.image
    }
  ]

  metaTags.forEach(tag => {
    let element = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`)
    
    if (!element) {
      element = document.createElement('meta')
      if (tag.property) {
        element.setAttribute('property', tag.property)
      } else {
        element.setAttribute('name', tag.name)
      }
      document.head.appendChild(element)
    }
    
    element.setAttribute('content', tag.content)
  })

  next()
})

export default router
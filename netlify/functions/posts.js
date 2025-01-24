exports.handler = async (event, context) => {
    try {
      const { getCollection } = await import('@nuxt/content')
      const posts = await getCollection('blog')
      return {
        statusCode: 200,
        body: JSON.stringify(posts)
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred fetching the posts' })
      }
    }
  }
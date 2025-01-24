const { getContent } = require('@nuxt/content')

exports.handler = async (event, context) => {
  try {
    const slug = event.path.split('/').pop()
    const post = await getContent('blog', slug)
    return {
      statusCode: 200,
      body: JSON.stringify(post)
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Post not found' })
    }
  }
}
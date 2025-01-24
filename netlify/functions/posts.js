export const handler = async (event, context) => {
    try {
      const { getCollection } = await import("@nuxt/content")
  
      console.log("Current working directory:", process.cwd())
      console.log("Attempting to fetch posts from blog collection")
  
      const posts = await getCollection("blog")
      console.log("Found posts:", posts)
  
      return {
        statusCode: 200,
        body: JSON.stringify(posts),
      }
    } catch (error) {
      console.error("Error details:", error)
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "An error occurred fetching the posts",
          details: error.message,
          stack: error.stack,
        }),
      }
    }
  }  
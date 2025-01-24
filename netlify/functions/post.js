export const handler = async (event, context) => {
    try {
      const { getContent } = await import("@nuxt/content")
  
      const slug = event.path.split("/").pop()
      console.log("Fetching post with slug:", slug)
  
      const post = await getContent("blog", slug)
      console.log("Found post:", post)
  
      return {
        statusCode: 200,
        body: JSON.stringify(post),
      }
    } catch (error) {
      console.error("Error details:", error)
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Post not found",
          details: error.message,
          stack: error.stack,
        }),
      }
    }
  }  
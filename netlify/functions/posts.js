import { getCollection } from "@nuxt/content"
import { readdir } from "fs/promises"
import { join } from "path"

export const handler = async (event, context) => {
  try {
    console.log("Current working directory:", process.cwd())

    const contentDir = join(process.cwd(), "content", "blog")
    console.log("Attempting to read content directory:", contentDir)

    const files = await readdir(contentDir)
    console.log("Files in content directory:", files)

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
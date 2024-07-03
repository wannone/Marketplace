import app from "./src/app"

const server = Bun.serve({
    port: 3000,
    fetch: app.fetch,
  })
  
  console.log(`Listening on localhost:${server.port}`)
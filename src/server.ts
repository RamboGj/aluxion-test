import Moralis from "moralis"
import { app } from "./app"
import { env } from "./env"

app.listen({
  port: env.PORT
}).then(async (app) => {
  try {
    await Moralis.start({
      apiKey: env.MORALIS_API_KEY
    })

    console.log("Server is running..." )
  } catch (err) {
    console.log("Error when running server...")
  }
})

let express = require("express")

module.exports = function createApp(){
  let app = express()
  app.use(express.json()) 
  app.use(express.urlencoded({ extended: true })) 
  

  return app
}
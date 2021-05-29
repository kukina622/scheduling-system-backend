let createApp = require("./app");
let mongoose = require("mongoose");

// import environmental variables
require("dotenv-flow").config();

const mongoURL=`mongodb://${process.env.DATEBASE_USER}:${process.env.DATEBASE_PASSWORD}@${process.env.DATEBASE_HOST}:${process.env.DATEBASE_PORT}/${process.env.DATEBASE_NAME}`
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log("Connect success")
})
.catch(err=>{
	console.log(err)
})


let app = createApp();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Start listening ${port} port`);
});

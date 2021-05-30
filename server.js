let create_app = require("./app");

// import environmental variables
require("dotenv-flow").config();

const mongoURL = `mongodb://${process.env.DATEBASE_USER}:${process.env.DATEBASE_PASSWORD}@${process.env.DATEBASE_HOST}:${process.env.DATEBASE_PORT}/${process.env.DATEBASE_NAME}`;
const port = process.env.PORT;
const serect_key=process.env.SECRET_KEY

create_app(mongoURL,serect_key).then((app) => {
	app.listen(port, () => {
		console.log(`Start listening ${port} port`);
	});
});

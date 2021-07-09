let express = require("express");
let mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger");
const { ValidationError } = require("express-validation");
const expressJWT = require("express-jwt");

// route
let registerRoute = require("./routes/registerRoute");
let loginRoute = require("./routes/loginRoute");
let userRoute = require("./routes/userRoute");

module.exports = function create_app(mongoURL, serect_key) {
  let app = express();
  return new Promise(async (resolve) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // solve DeprecationWarning
      useCreateIndex: true,
    });

    // 設定serect_key
    app.set("serect_key", serect_key);

    // jwt驗證
    // app.use(
    //   expressJWT({ secret: serect_key, algorithms: ["HS256"] }).unless({
    //     path: ["/api/login", "/api/register"],
    //   })
    // );

    // 註冊路由
    app.use("/api", registerRoute);
    app.use("/api", loginRoute);
    app.use("/api/user", userRoute);

    //swagger open api
    const specs = swaggerJsdoc(swaggerOptions);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    // error handle
    app.use(function (err, req, res, next) {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
      } else if (err.name === "UnauthorizedError") {
        return res.status(401).send("Unauthorized");
      }
      return res.status(500).json(err);
    });

    resolve(app);
  });
};

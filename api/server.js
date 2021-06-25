const express = require('express')

const { router } = require("./routes/app.routes")
const fs = require('fs')

const app = express()
const port = process.env.PORT || 5000
app.use(express.json());
// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.1",
//     info: {
//       title: "My apis in swaager",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: `http://127.0.0.1:${port}`,
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };
// const swaggerSpecs = swaggerJsDoc(options);



const swaggerFile = (process.cwd()+"/swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
// const customCss = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
const swaggerDocument = JSON.parse(swaggerData);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(port)

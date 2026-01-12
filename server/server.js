require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const contactRoute = require("./router/contact-router");
const errorMiddleware = require("./middlewares/validate-middleware");

const corsOptions = {
origin: "https://surplus-food-management-client.onrender.com",
method: "GET,POST,PUT,DELETE,PATCH,HEAD",
credentials:true,
};
app.use(cors(corsOptions));
// to get the json data in express app.
app.use(express.json());
// Log all incoming requests (for debugging purposes)
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});

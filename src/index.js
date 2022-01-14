const express = require("express");

//db connection
require("./database/mongoose");

const userRouter = require("./routers/user");
const holidaysRouter = require("./routers/holidays");

const app = express();

// app.use(express.static('public')
const router = new express.Router();

app.use(express.static(process.cwd()+"/angular/invest-with-tribe/"));

router.get("/", async (req, res) => {
    res.sendFile(process.cwd()+"/angular/invest-with-tribe/index.html")
});



app.use(express.json());
app.use(userRouter);
app.use(holidaysRouter);
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("App is running on port " + process.env.PORT);
});

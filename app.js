require("dotenv").config();
const express = require("express")
const connectDB = require("./config/db")
const User = require("./models/models")
const jwt = require("jsonwebtoken")
const helmet = require("helmet")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
let { refreshTokensList } = require("./Controllers/login")
const Post = require("./models/postModel")

const app = express()
app.use(helmet())
app.use(cors())

const GobalRateLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    max: 100,
    message : "Too many requests from this Ip, please try again after 15 minutes"
})

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many Logins attempts from thie Ip, please try again after 15 Minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false
})

app.use(GobalRateLimiter)
app.use(express.json())

connectDB()

app.use("/api/auth", loginRateLimiter, require("./routers/appRouter"))

app.use("/api/",GobalRateLimiter, authentication, require("./routers/appDataRoutes"))

function authentication(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get("/", authentication, async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    res.json({ user: user.name });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`Port is Running on ${PORT}`)
})

app.post("/refresh", (req,res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if(!refreshTokensList.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const payload = { email: user.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        res.json({ accessToken });
    });
})

app.post("/delete", (req,res) => {
    let { refreshToken } = req.body;
    refreshTokensList = refreshTokensList.filter(token => token !== refreshToken);
    res.sendStatus(204);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
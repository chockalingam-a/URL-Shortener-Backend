import express, { json } from "express";
import { generateId } from "./utils.js";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,
})

app.use(json());
app.use(limiter);

app.get("/", (req, res) => {
    res.send("Welcome to URL Shortener.")
})

// temp storage, need to store it on DB
const urls = [];
// Url Schema -> _id, longURL, shortId

// create shorten url
app.post("/shorten", async (req, res) => {
    const { longURL } = req.body;

    if (!longURL) return res.status(400).json({ error: "Long URL is required" });

    const url = urls.find(item => item.longURL === longURL);

    if (url) {
        return res.json({ shortUrl: `${process.env.FRONT_END_URL}/${url.shortId}`, longURL })
    }

    const shortId = generateId(7);
    // store
    urls.push({
        _id: generateId(6),
        shortId,
        longURL,
    })

    return res.json({ shortUrl: `${process.env.FRONT_END_URL}/${shortId}`, longURL })
})

// get long URL
app.get("/:shortId", (req, res) => {
    const { shortId } = req.params;

    const url = urls.find(item => item.shortId === shortId);

    if (!url) {
        return res.status(404).json({ error: "Short Id not found" })
    }

    return res.redirect(url.longURL);
})

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
})
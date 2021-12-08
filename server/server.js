const { addURL, findURL, getFullURL } = require("./helpers.js");
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 80;

// Connect to MongoDB database
mongoose
  .connect("mongodb://mongo:27017/url_db", { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(port, () => console.log(`Listening on port ${port}`));

    app.get("/express_backend", (req, res) => {
      res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
    });

    app.post("/new_url", async (req, res) => {
      // Search for URL in database
      const url = await findURL(req.body.full_url_input);
      if (url) {
        return res.send({ fullURL: url.fullURL, shortURL: url.shortURL });
      } else {
        const newURLData = await addURL(req.body.full_url_input);
        return res.send({
          fullURL: newURLData.fullURL,
          shortURL: newURLData.shortURL,
        });
      }
    });

    app.get("/:short_endpoint", async (req, res) => {
      const fullURL = await getFullURL(req.params.short_endpoint);
      if (fullURL) return res.redirect(fullURL);
    });
  })
  .catch((err) => console.log(err));

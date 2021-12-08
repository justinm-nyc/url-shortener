const { addURL, findURL, getFullURL } = require("./helpers.js");
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 80;

/* Connect to MongoDB database and set api routes */
mongoose
  .connect("mongodb://mongo:27017/url_db", { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(port, () => console.log(`Listening on port ${port}`));

    /* Search for URL in database, if found return the data, if else, 
    add the new URL to the database and then return the data */
    app.post("/new_url", async (req, res) => {
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

    /* Search for full URL in database using the short URL and then redirect to full URL if found  */
    app.get("/:short_endpoint", async (req, res) => {
      const fullURL = await getFullURL(req.params.short_endpoint);
      if (fullURL) return res.redirect(fullURL);
    });
  })
  .catch((err) => console.log(err));

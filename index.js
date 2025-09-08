import express from "express";
import axios from "axios";

const port = 3000;
const app = express();
const API_URL = "https://favqs.com/api";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/qotd`);
    res.render("index.ejs", {
      quote: result.data.quote.body,
      author: result.data.quote.author,
    });
    console.log(result.data);
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.render("index.ejs", {
      quote: "Sorry, we couldn't load a quote.",
      author: "",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

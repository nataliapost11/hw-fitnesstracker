const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const routes = require('./controllers');

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(routes);

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for exercise page
app.get('/exercise', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/exercise.html'))
);

// GET Route for stats page
app.get('/stats', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/stats.html'))
);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}! http://localhost:${PORT}/`);
});

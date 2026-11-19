const express = require("express");
const cors = require("cors");
const sequelize = require("./database/database");

const Hero = require("./models/Hero");
const Movie = require("./models/Movie");
const heroesRoutes = require("./routes/heroes.routes");
const moviesRoutes = require("./routes/movies.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

Hero.belongsToMany(Movie, { through: "HeroMovies" });
Movie.belongsToMany(Hero, { through: "HeroMovies" });

app.use("/heroes", heroesRoutes);
app.use("/movies", moviesRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Banco de Dados sincronizado.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o Banco:", error);
  });

module.exports = app;

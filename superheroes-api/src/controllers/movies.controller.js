const Hero = require("../models/Hero");
const Movie = require("../models/Movie");

async function list(req, res) {
  try {
    const movies = await Movie.findAll({ include: Hero });
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar filmes", error: error.message });
  }
}

async function create(req, res) {
  try {
    const { title, year } = req.body;

    if (!title || !year) {
      return res
        .status(400)
        .json({ message: "Título e ano são obrigatórios" });
    }

    const movie = await Movie.create({ title, year });
    return res.status(201).json(movie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar filme", error: error.message });
  }
}

async function linkHero(req, res) {
  try {
    const { heroId, movieId } = req.body;

    const hero = await Hero.findByPk(heroId);
    const movie = await Movie.findByPk(movieId);

    if (!hero || !movie) {
      return res
        .status(404)
        .json({ message: "Herói ou filme não encontrado" });
    }

    await hero.addMovie(movie);

    return res
      .status(200)
      .json({ message: "Filme vinculado ao herói com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao vincular filme", error: error.message });
  }
}

module.exports = {
  list,
  create,
  linkHero,
};
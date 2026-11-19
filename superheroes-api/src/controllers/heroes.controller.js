const Hero = require("../models/Hero");
const Movie = require("../models/Movie");

async function list(req, res) {
  try {
    const heroes = await Hero.findAll({
      include: Movie,
    });
    return res.status(200).json(heroes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar heróis", error: error.message });
  }
}

async function getId(req, res) {
  try {
    const { id } = req.params;
    const hero = await Hero.findByPk(id, {
      include: Movie,
    });

    if (!hero) {
      return res.status(404).json({ message: "Herói não encontrado" });
    }

    return res.status(200).json(hero);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar herói", error: error.message });
  }
}

async function create(req, res) {
  try {
    const { name, universe, power, movieTitle, movieYear } = req.body;

    if (!name || !universe || !power) {
      return res.status(400).json({
        message: "Nome, universo e poder são obrigatórios",
      });
    }

    const hero = await Hero.create({ name, universe, power });

    
    if (movieTitle && movieYear) {
      const [movie] = await Movie.findOrCreate({
        where: { title: movieTitle },
        defaults: { year: Number(movieYear) },
      });
      await hero.addMovie(movie);
    }

    return res.status(201).json(hero);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar herói", error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, universe, power, movieTitle, movieYear } = req.body;

    const hero = await Hero.findByPk(id);
    if (!hero) {
      return res.status(404).json({ message: "Herói não encontrado" });
    }

    if (!name || !universe || !power) {
      return res.status(400).json({
        message: "Nome, universo e poder são obrigatórios",
      });
    }

    await hero.update({ name, universe, power });

    
    if (movieTitle && movieYear) {
      const [movie] = await Movie.findOrCreate({
        where: { title: movieTitle },
        defaults: { year: Number(movieYear) },
      });
      await hero.addMovie(movie);
    }

    return res.status(200).json(hero);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar herói", error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const hero = await Hero.findByPk(id);

    if (!hero) {
      return res.status(404).json({ message: "Herói não encontrado" });
    }

    await hero.destroy();
    return res.status(200).json({ message: "Herói removido com sucesso" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao deletar herói", error: error.message });
  }
}

module.exports = {
  list,
  getId,
  create,
  update,
  remove,
};
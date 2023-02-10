import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res) => {
    const { id } = req.params;

    autores.findById(id, (err, autores) => {
      err
        ? res
            .status(404)
            .send({ message: `Este Autor não existe ${err.message}` })
        : res.status(200).send(autores);
    });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);

    autor.save((err) => {
      err
        ? res.status(500).send({
            message: `Falha ao cadastrar o Autor porque ${err.message}`,
          })
        : res.status(200).send(autor.toJSON());
    });
  };

  static atualizarAutor = (req, res) => {
    const { id } = req.params;

    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      err
        ? res.status(500).send({
            message: `Falha ao atualizar o Autor porque ${err.message}`,
          })
        : res.status(200).send({ message: "Autor atualizado com sucesso" });
    });
  };

  static removerAutor = (req, res) => {
    var { id } = req.params;

    autores.findByIdAndDelete(id, (err) => {
      err
        ? res
            .status(500)
            .send({ message: `Erro ao tentar deletar o Autor ${err.message}` })
        : res.status(200).send({ message: "O Autor foi deletado com sucesso" });
    });
  };
}

export default AutorController;

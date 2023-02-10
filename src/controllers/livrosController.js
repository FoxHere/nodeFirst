import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const { id } = req.params;

    livros
      .findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        err
          ? res
              .status(404)
              .send({ message: `Este livro não existe ${err.message}` })
          : res.status(200).send(livros);
      });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      err
        ? res.status(500).send({
            message: `Falha ao cadastrar o livro porque ${err.message}`,
          })
        : res.status(200).send(livro.toJSON());
    });
  };

  static atualizarLivro = (req, res) => {
    const { id } = req.params;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      err
        ? res.status(500).send({
            message: `Falha ao atualizar o livro porque ${err.message}`,
          })
        : res.status(200).send({ message: "Livro atualizado com sucesso" });
    });
  };

  static removerLivro = (req, res) => {
    var { id } = req.params;

    livros.findByIdAndDelete(id, (err) => {
      err
        ? res
            .status(500)
            .send({ message: `Erro ao tentar deletar o livro ${err.message}` })
        : res.status(200).send({ message: "O livro foi deletado com sucesso" });
    });
  };

  static buscarLivrosPorEditora = (req, res) => {
    const editora = req.query.editora;

    livros.find({ editora: editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  };
}

export default LivroController;

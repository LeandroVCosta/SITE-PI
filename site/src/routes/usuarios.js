var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.atualizar(req, res);
});

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/registraruser", function (req, res) {
    usuarioController.registraruser(req, res);
});

router.post("/listarusuario", function (req, res) {
    usuarioController.listarusuario(req, res);
});

router.post("/excluirUsuario", function (req, res) {
    usuarioController.excluirUsuario(req, res);
});

module.exports = router;
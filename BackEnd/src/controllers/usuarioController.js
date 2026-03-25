import * as usuarioModel from "../models/usuarioModel.js";
import crypto from "crypto";

export async function listar(req, res) {
  const usuarios = await usuarioModel.listarUsuarios();
  res.json(usuarios);
}

export async function buscarPorId(req, res) {
  const usuario = await usuarioModel.buscarUsuarioPorId(req.params.id);

  if (!usuario) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }

  res.json(usuario);
}

export async function criar(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      msg: "nome, email e senha são obrigatórios"
    });
  }
  const senha_hash = crypto
    .createHash("sha256")
    .update(senha)
    .digest("hex");

  const id = await usuarioModel.criarUsuario({
    nome,
    email,
    senha_hash
  });

  res.status(201).json({
    msg: "Usuário criado com sucesso",
    id
  });
}

export async function atualizar(req, res) {
  const { nome, email, senha } = req.body;

  const atualizado = await usuarioModel.atualizarUsuario(
    req.params.id,
    { nome, email, senha }
  );

  if (!atualizado) {
    return res.status(404).json({
      msg: "Usuário não encontrado"
    });
  }

  res.json({
    msg: "Usuário atualizado"
  });
}


export async function remover(req, res) {
  const deletado = await usuarioModel.deletarUsuario(req.params.id);

  if (!deletado) {
    return res.status(404).json({
      msg: "Usuário não encontrado"
    });
  }

  res.json({
    msg: "Usuário removido"
  });
}


export async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: "email e senha são obrigatórios" });
  }

  // 1) procura o usuário pelo email
  const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
  if (!usuario) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  // 2) gera hash da senha recebida e compara com o hash do banco
  const senha_hash = crypto.createHash("sha256").update(senha).digest("hex");

  if (senha_hash !== usuario.senha_hash) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  // 3) gera um token simples (didático)
  const token = crypto.randomBytes(24).toString("hex");

  // 4) retorna dados básicos (não devolva senha_hash)
  return res.status(200).json({
    msg: "Login realizado com sucesso",
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
}
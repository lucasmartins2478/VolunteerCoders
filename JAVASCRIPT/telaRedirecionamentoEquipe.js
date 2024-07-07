var nomeLider = localStorage.getItem("nome");

document
  .getElementById("btn-open-side-bar")
  .addEventListener("click", function () {
    document.getElementById("side-bar").classList.toggle("open-sidebar");
  });

function logout(event) {
  event.preventDefault();

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Quer mesmo sair do Sistema!?",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../landing-page.html";
    }
  });
}

var equipeRecente;
var emailsRemovidos = [];
var nomeEquipesCadastradas = [];

let imagens = [
  "../CSS/imagens/menina.png",
  "../CSS/imagens/homem.png",
  "../CSS/imagens/menina2.png",
  "../CSS/imagens/homem2.png",
];

let indiceAleatorio = Math.floor(Math.random() * imagens.length);
let src = imagens[indiceAleatorio];

document.addEventListener("DOMContentLoaded", function () {
  equipeRecente = JSON.parse(localStorage.getItem("equipeRecente"));

  if (!equipeRecente) {
    document.querySelector(".nome-equipe p").textContent =
      "Nenhuma equipe encontrada";
  }

  if (equipeRecente) {
    if (!nomeEquipesCadastradas.includes(equipeRecente.nomeEquipe)) {
      nomeEquipesCadastradas.push(equipeRecente.nomeEquipe);
    }
  }

  if (equipeRecente) {
    document.querySelector(".nome-equipe p").textContent =
      equipeRecente.nomeEquipe;
    document.querySelector(".nome-lider p").textContent = nomeLider;
    console.log(nomeLider);

    // let tudoDeMembros = document.querySelector('.tudo-de-membros');

    // let membrosDiv = document.createElement('div');
    // membrosDiv.classList.add('membros');

    let membrosDiv = document.querySelector(".membros");
    // equipeInfoDiv.innerHTML = '';

    let span = document.createElement("span");
    span.classList.add("participantes");
    span.textContent = "Participantes:";
    membrosDiv.appendChild(span);

    equipeRecente.emails.forEach(function (email) {
      let membroEquipe = document.createElement("div");
      membroEquipe.classList.add("membro");

      var membros = document.querySelectorAll(".membro");
      if (membros.length >= 5) {
        Swal.fire({
          icon: "error",
          title: "Limite de membros atingido!",
          text: "Sua equipe já possui o número máximo de membros permitidos.",
        });
        return;
      }

      indiceAleatorio = Math.floor(Math.random() * imagens.length);
      src = imagens[indiceAleatorio];

      let img = document.createElement("img");
      img.classList.add("membro-img");
      img.setAttribute("src", src);

      membroEquipe.appendChild(img);

      let membroInfosDiv = document.createElement("div");
      membroInfosDiv.classList.add("membro-infos");

      let membroEmailP = document.createElement("p");
      membroEmailP.className = "membro-infos-p";
      membroEmailP.textContent = email;

      membroInfosDiv.appendChild(membroEmailP);
      membroEquipe.appendChild(membroInfosDiv);
      membrosDiv.appendChild(membroEquipe);
    });
  }
});

function redirecionarParaMinhaEquipe() {
  window.location.href = "../HTML/telaRedirecionamentoEquipe.html";
}
function redirecionarParaHome() {
  window.location.href = "../HTML/homeAluno.html";
}

function criarEquipe(event) {
  event.preventDefault();

  if (equipeRecente) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Você já possui uma equipe!",
    });
    return;
  } else {
    window.location.href = "../HTML/cadastroEquipe.html";
  }
}

function excluirEquipe(event) {
  event.preventDefault();

  if (!equipeRecente) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Não há uma equipe para excluir!",
    });
    return;
  }
  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Quer mesmo excluir a equipe!?",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("equipeRecente");
      document.querySelector(".nome-equipe p").textContent = "";
      document.querySelector(".nome-lider p").textContent = "";
      document.querySelector(".membros").innerHTML = "";

      var index = nomeEquipesCadastradas.indexOf(equipeRecente.nomeEquipe);
      if (index !== -1) {
        nomeEquipesCadastradas.splice(index, 1);
      }

      Swal.fire("Equipe excluída!", "", "success");
    }
  });
}

function editarEquipe(event) {
  event.preventDefault();

  // document.querySelector('.botao-salvarNome').style.display = "inline-block";

  var nomeEquipe = document.querySelector(".nome-equipe p");
  nomeEquipe.style.display = "none";
  var inputNomeEquipe = document.createElement("input");
  inputNomeEquipe.type = "text";
  inputNomeEquipe.value = nomeEquipe.textContent;
  inputNomeEquipe.classList.add("input-nome-equipe");
  nomeEquipe.parentNode.insertBefore(inputNomeEquipe, nomeEquipe.nextSibling);

  var divBotoesEdicaoEquipe = document.createElement("div");
  divBotoesEdicaoEquipe.classList.add("div-editarEquipe");

  //botao de +

  var divAdicionarMembro = document.createElement("div");
  divAdicionarMembro.classList.add("div-adicionarMembro");

  var btnAdicionarMembro = document.createElement("button");
  btnAdicionarMembro.classList.add("btn-adicionarMembro");
  btnAdicionarMembro.onclick = adicionarMembro;

  var iconAdd = document.createElement("i");
  iconAdd.classList.add("fi", "fi-sr-square-plus");
  btnAdicionarMembro.appendChild(iconAdd);

  divAdicionarMembro.appendChild(btnAdicionarMembro);
  divBotoesEdicaoEquipe.appendChild(divAdicionarMembro);

  var equipeMembros = document.querySelector(".tudo-de-membros");
  equipeMembros.appendChild(divBotoesEdicaoEquipe);

  // salvar equipe e cancelar
  var divSalvarEquipe = document.createElement("div");
  divSalvarEquipe.classList.add("div-salvarEquipe");

  var btnSalvarEdicao = document.createElement("button");
  btnSalvarEdicao.classList.add("btn-salvarEdicaoEquipe");
  btnSalvarEdicao.onclick = salvarEdicaoEquipe;
  btnSalvarEdicao.textContent = "Salvar";

  var iconSalvar = document.createElement("i");
  iconSalvar.classList.add("fi", "fi-ss-floppy-disk-pen");
  btnSalvarEdicao.appendChild(iconSalvar);

  var btnCancelarEdicao = document.createElement("button");
  btnCancelarEdicao.classList.add("btn-cancelarEdicaoEquipe");
  btnCancelarEdicao.onclick = cancelarEdicaoEquipe;
  btnCancelarEdicao.textContent = "Cancelar";

  var iconCancelar = document.createElement("i");
  iconCancelar.classList.add("fi", "fi-rr-delete");
  btnCancelarEdicao.appendChild(iconCancelar);

  divSalvarEquipe.appendChild(btnSalvarEdicao);
  divSalvarEquipe.appendChild(btnCancelarEdicao);

  var equipeInfo = document.querySelector(".card-conteudo");
  equipeInfo.appendChild(divSalvarEquipe);

  // excluir emails

  var membros = document.querySelectorAll(".membro");

  membros.forEach(function (membro) {
    // let divImagem = document.createElement('div')
    // divImagem.className = 'divImagem';
    let imagem = document.createElement("img");
    imagem.src = "../CSS/imagens/marca-retangular-x.png";
    imagem.className = "btn-apagar-pessoa";

    imagem.addEventListener("click", function () {
      var email = membro.querySelector(".membro-infos-p");
      if (email) {
        var emailRemover = email.textContent.trim();
        var indiceEmail = equipeRecente.emails.indexOf(emailRemover);
        if (indiceEmail !== -1) {
          equipeRecente.emails.splice(indiceEmail, 1);
          localStorage.setItem("equipeRecente", JSON.stringify(equipeRecente));
          emailsRemovidos.push(emailRemover);
        }
      }
      membro.remove();
      imagem.remove();
    });

    // membro.appendChild(divImagem);
    membro.appendChild(imagem);
  });
  console.log(emailsRemovidos);
}

function adicionarMembro() {
  var membros = document.querySelectorAll(".membro");
  if (membros.length >= 5) {
    Swal.fire({
      icon: "error",
      title: "Limite de membros atingido!",
      text: "Sua equipe já possui o número máximo de membros permitidos.",
    });
    return;
  }

  var novoMembro = document.createElement("div");
  novoMembro.classList.add("membro");

  novoMembro.innerHTML =
    '<img src="' +
    src +
    '" alt="Avatar">' +
    '<div class="membro-infos">' +
    '<input class="input-membro-infos-p"></input>' +
    '<button class="validarEmail" onclick="validarEmail()"><i class="fi fi-rr-vote-yea"></i></button>' +
    "</div>";

  var membros = document.querySelector(".membros");
  membros.appendChild(novoMembro);
}

function salvarEdicaoEquipe() {
  // var equipeRecente = JSON.parse(localStorage.getItem("equipeRecente"));

  var index = nomeEquipesCadastradas.indexOf(equipeRecente.nomeEquipe);
  if (index !== -1) {
    nomeEquipesCadastradas.splice(index, 1);
  }

  var novoNomeEquipe = document.querySelector(".input-nome-equipe").value;
  var nomeEquipe = document.querySelector(".nome-equipe p");
  nomeEquipe.textContent = novoNomeEquipe;

  if (nomeEquipesCadastradas.includes(novoNomeEquipe)) {
    Swal.fire({
      icon: "error",
      title: "Nome de equipe já existe!",
      text: "Por favor, escolha outro nome para a equipe.",
    });
    return;
  }

  equipeRecente.nomeEquipe = novoNomeEquipe;
  localStorage.setItem("equipeRecente", JSON.stringify(equipeRecente));

  nomeEquipe.style.display = "block";
  document.querySelector(".input-nome-equipe").remove();

  if (!equipeRecente) {
    console.error("Equipe recente não encontrada no armazenamento local");
    return;
  }

  var inputMembro = document.querySelector(".input-membro-infos-p");
  if (inputMembro) {
    // Verifica se o campo de entrada não está vazio
    if (inputMembro.value.trim() !== "") {
      var novoEmailEquipe = inputMembro.value;
      equipeRecente.emails.push(novoEmailEquipe);
      localStorage.setItem("equipeRecente", JSON.stringify(equipeRecente));
    }
    inputMembro.disabled = true;
  }
  console.log(emailsRemovidos);

  emailsRemovidos.forEach(function (emailRemover) {
    var indiceEmail = equipeRecente.emails.indexOf(emailRemover);
    if (indiceEmail !== -1) {
      equipeRecente.emails.splice(indiceEmail, 1);
    }
  });

  emailsRemovidos = [];

  Swal.fire("Edição da equipe salva com sucesso!", "", "success");

  var botoesRemover = document.querySelectorAll(".btn-apagar-pessoa");

  botoesRemover.forEach(function (botao) {
    botao.remove();
  });

  document.querySelector(".div-editarEquipe").style.display = "none";
  document.querySelector(".div-salvarEquipe").style.display = "none";
}

function cancelarEdicaoEquipe() {
  var botoesRemover = document.querySelectorAll(".btn-apagar-pessoa");

  botoesRemover.forEach(function (botao) {
    botao.remove();
  });

  document.querySelector(".div-editarEquipe").style.display = "none";
  document.querySelector(".div-salvarEquipe").style.display = "none";
}

function validacaoEmail(email) {
  var dominiosValidos = [
    "facens.br",
    "uniso.br",
    "usp.br",
    "aluno.unip.br",
    "unicamp.br",
    "ufscar.br",
    "fatec.sp.gov.br",
  ];

  var dominio = email.split("@")[1];
  return dominiosValidos.includes(dominio);
}

function validarEmail() {
  let email = document.querySelector(".input-membro-infos-p").value.trim();
  console.log(email);

  if (validacaoEmail(email)) {
    document.querySelector(".validarEmail").style.display = "none";
  } else {
    Swal.fire({
      icon: "error",
      title: "Email Inválido!",
      text: "Por favor, insira um email institucional válido.",
    });
  }
}

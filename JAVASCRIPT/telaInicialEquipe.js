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

document.addEventListener("DOMContentLoaded", function () {
  let equipeRecente = JSON.parse(localStorage.getItem("equipeRecente"));
  console.log("Dados da equipe recuperados:", equipeRecente);

  // console.log(equipeRecente)

  if (equipeRecente) {
    document.querySelector(".nome-equipe p").textContent =
      equipeRecente.nomeEquipe;
    document.querySelector(".nome-lider p").textContent = nomeLider;
    console.log(nomeLider);

    let tudoDeMembros = document.querySelector(".tudo-de-membros");

    let membrosDiv = document.createElement("div");
    membrosDiv.classList.add("membros");

    let equipeInfoDiv = document.querySelector(".membros");
    // equipeInfoDiv.innerHTML = '';

    let span = document.createElement("span");
    span.classList.add("participantes");
    span.textContent = "Participantes:";
    membrosDiv.appendChild(span);

    let imagens = [
      "../CSS/imagens/menina.png",
      "../CSS/imagens/homem.png",
      "../CSS/imagens/menina2.png",
      "../CSS/imagens/homem2.png",
    ];

    let indiceAleatorio = Math.floor(Math.random() * imagens.length);
    let src = imagens[indiceAleatorio];

    equipeRecente.emails.forEach(function (email) {
      let membroEquipe = document.createElement("div");
      membroEquipe.classList.add("membro");

      // let membroImg = document.createElement('div');
      // membroImg.classList.add('membro-img');

      let indiceAleatorio = Math.floor(Math.random() * imagens.length);
      let src = imagens[indiceAleatorio];

      let img = document.createElement("img");
      img.classList.add("membro-img");
      img.setAttribute("src", src);

      membroEquipe.appendChild(img);
      // membrosDiv.appendChild(membroImg);

      let membroInfosDiv = document.createElement("div");
      membroInfosDiv.classList.add("membro-infos");

      let membroEmailP = document.createElement("p");
      membroEmailP.className = "membro-infos-p";
      membroEmailP.textContent = email;

      membroInfosDiv.appendChild(membroEmailP);
      membroEquipe.appendChild(membroInfosDiv);
      membrosDiv.appendChild(membroEquipe);
    });
    tudoDeMembros.appendChild(membrosDiv);
  }
});

function fecharEquipe() {
  var equipeCadastrada = document.querySelector(".equipes-cadastradas");
  equipeCadastrada.style.display = "none";
  window.location.href = "../HTML/homeAluno.html";
}
function redirecionarParaMinhaEquipe() {
  window.location.href = "../HTML/telaInicialEquipe.html";
}
function redirecionarParaHome() {
  window.location.href = "../HTML/homeAluno.html";
}

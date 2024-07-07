let nomesEquipesCadastradas = [];
let emailsPorEquipe = [];

var nomeLider = localStorage.getItem("nome");
document.querySelector("#lider").value = nomeLider;

function validarNomeEquipe(nomeEquipe) {
  return nomesEquipesCadastradas.includes(nomeEquipe);
}

function adicionarNomeEquipe(nomeEquipe) {
  nomesEquipesCadastradas.push(nomeEquipe);
}

function validarEmail(email) {
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

function adicionar(event, nomeEquipe) {
  event.preventDefault();
  let email = document.querySelector("#equipe").value.trim();

  if (validarEmail(email)) {
    if (emailsPorEquipe.length >= 5) {
      Swal.fire({
        icon: "error",
        title: "Limite de membros atingido!",
        text: "Sua equipe já possui o número máximo de membros permitidos.",
      });
      return;
    }

    emailsPorEquipe.push(email);

    let pessoa = document.createElement("li");
    pessoa.textContent = email;
    let imagem = document.createElement("img");
    imagem.src = "../CSS/imagens/marca-retangular-x.png";
    imagem.className = "btn-apagar-pessoa";

    imagem.addEventListener("click", function () {
      pessoa.remove();

      let index = emailsPorEquipe.indexOf(email);
      if (index !== -1) {
        emailsPorEquipe.splice(index, 1);
      }
    });

    pessoa.appendChild(imagem);
    let listaEquipe = document.querySelector("#listaPessoas");
    listaEquipe.appendChild(pessoa);

    localStorage.setItem(nomeEquipe, JSON.stringify(emailsPorEquipe));

    document.querySelector("#equipe").value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Email Inválido!",
      text: "Por favor, insira um email institucional válido.",
    });
  }
}

function cancelar(event) {
  event.preventDefault();

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Quer mesmo cancelar a criação de equipe?",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "antes-telaInicialAluno.html";
    }
  });
}

function validarFormulario() {
  const nomeEquipe = document.getElementById("nome-equipe").value.trim();

  const listaPessoas = document.querySelectorAll("ul#listaPessoas li");
  nomeLider = document.getElementById("lider").value.trim();

  if (listaPessoas.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Lista de Pessoas Vazia!",
      text: "Por favor, adicione pelo menos uma pessoa à equipe.",
    });
    return;
  }

  if (nomeEquipe === "" || nomeLider === "") {
    Swal.fire({
      icon: "error",
      title: "Campos Vazios!",
      text: "Por favor, preencha todos os campos.",
    });
    return false;
  }

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Os dados fornecidos serão transmitidos e armazenados conforme as diretrizes de segurança. Por favor, confirme que está ciente para prosseguirmos com o cadastro.",
    showCancelButton: true,
    confirmButtonText: "Estou ciente e quero cadastrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const senhaCorreta = "s";

      Swal.fire({
        title: "Insira uma senha para essa equipe:",
        text: "Essa senha será usada futuramente!",
        input: "password",
        inputAttributes: {
          class: "swal2-input minha-classe-personalizada",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const senhaInserida = result.value;

          if (senhaInserida === senhaCorreta) {
            // const validacaoNomeEquipe = document.getElementById("nome-equipe").value.trim();

            if (validarNomeEquipe(nomeEquipe)) {
              Swal.fire({
                icon: "error",
                title: "Nome de Equipe Duplicado!",
                text: "O nome da equipe já está cadastrado. Por favor, escolha outro nome.",
              });
              return false;
            }

            Swal.fire({
              icon: "success",
              title: "Equipe criada!",
              text: "Sua equipe foi criada com sucesso",
              delay: 1500,
              showCancelButton: false,
            }).then(() => {
              localStorage.setItem(
                "equipeRecente",
                JSON.stringify({
                  nomeEquipe: nomeEquipe,
                  nomeLider: nomeLider,
                  emails: emailsPorEquipe,
                })
              );
              adicionarNomeEquipe(nomeEquipe);
              console.log(nomesEquipesCadastradas);
              console.log(
                "Dados da equipe armazenados:",
                localStorage.getItem("equipeRecente")
              );
              window.location.href = "telaInicialEquipe.html";
            });

            document.getElementById("nome-equipe").value = "";
            document.getElementById("lider").value = "";
            listaPessoas.forEach((item) => item.remove());

            let imagem = document.createElement("img");
            imagem.src = "../CSS/imagens/marca-retangular-x.png";
            imagem.className = "btn-apagar-pessoa";
            imagem.addEventListener("click", function () {
              pessoa.remove();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Senha incorreta",
              text: "Por favor, tente novamente.",
            });
          }
        } else {
          Swal.fire({
            icon: "info",
            title: "Operação cancelada",
            text: "A criação da equipe foi cancelada.",
          });

          // localStorage.removeItem("nomeEquipeRecente");
        }
      });
      return true;
    }
  });
}
function apagar(event) {
  event.preventDefault();

  document.querySelector("#equipe").value = "";
}

apagar();

var email = localStorage.getItem("email");
var nomeAluno = localStorage.getItem("nome");

document.querySelector("#nome-aluno").value = nomeAluno;
document.querySelector("#email-aluno").value = email;

document.addEventListener("DOMContentLoaded", function () {
  const campos = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], input[type="date"], input[type="number"], select, textarea'
  );
  const botaoCadastrar = document.querySelector(".btn-cadastrar-problema");

  campos.forEach(function (campo, index) {
    campo.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const próximoCampo = campos[index + 1];
        if (próximoCampo) {
          próximoCampo.focus();
        } else if (campo === campos[campos.length - 1]) {
          botaoCadastrar.click();
        }
      }
    });
  });

  botaoCadastrar.addEventListener("click", function () {
    if (todosCamposPreenchidos()) {
      var senhaCorreta = "s";

      const swalConfig = {
        title: "Insira sua senha de login para confirmar sua identidade:",
        input: "password",
        inputAttributes: {
          class: "swal2-input minha-classe-personalizada",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      };

      Swal.fire(swalConfig).then((result) => {
        if (result.isConfirmed) {
          var senhaInserida = result.value;

          if (senhaInserida === senhaCorreta) {
            var nomeAluno = document.getElementById("nome-aluno").value;
            var cidade = document.getElementById("cidade-aluno").value;
            var dataNasc = document.getElementById("data-nasc").value;
            var cpf = document.getElementById("cpf").value;
            var email = document.getElementById("email-aluno").value;
            var telefone = document.getElementById("telefone-aluno").value;
            var instituicao = document.getElementById("instituicao").value;
            var email = document.getElementById("email").value;

            Swal.fire({
              icon: "warning",
              title: "Atenção!",
              text: "Os dados fornecidos serão transmitidos e armazenados conforme as diretrizes de segurança. Por favor, confirme que está ciente para prosseguirmos com o cadastro.",
              showCancelButton: true,
              confirmButtonText: "Estou ciente e quero cadastrar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: "success",
                  title: "Cadastrado!",
                  text: "Os dados foram cadastrados com sucesso.",
                  timer: 3000,
                  showConfirmButton: false,
                }).then(() => {
                  window.location.href = "antes-telaInicialAluno.html";
                });
              }
            });
            document.getElementById("nome-aluno").value = "";
            document.getElementById("cidade-aluno").value = "";
            document.getElementById("data-nasc").value = "";
            document.getElementById("cpf").value = "";
            document.getElementById("email-aluno").value = "";
            document.getElementById("telefone-aluno").value = "";
            document.getElementById("instituicao").value = "";
            document.getElementById("email").value = "";
          } else {
            Swal.fire({
              icon: "error",
              title: "Senha incorreta",
              text: "Por favor, tente novamente.",
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Campos vazios",
        text: "Por favor, preencha todos os campos antes de prosseguir.",
      });
    }
  });
});

function enviarDadosParaServidor(dados) {
  fetch("https://664fbf7dec9b4a4a602fbb1c.mockapi.io/aluno", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erro ao enviar dados para o servidor.");
    })
    .then((data) => {
      console.log("Dados enviados com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro:", error.message);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const campos = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], input[type="date"], input[type="number"], select, textarea'
  );
  const botaoCadastrar = document.querySelector(".btn-cadastrar-problema");

  campos.forEach(function (campo, index) {
    campo.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const próximoCampo = campos[index + 1];
        if (próximoCampo) {
          próximoCampo.focus();
        } else if (campo === campos[campos.length - 1]) {
          botaoCadastrar.click();
        }
      }
    });
  });

  botaoCadastrar.addEventListener("click", function () {
    if (todosCamposPreenchidos()) {
      var senhaCorreta = "s";

      const swalConfig = {
        title: "Insira sua senha de login para confirmar sua identidade:",
        input: "password",
        inputAttributes: {
          class: "swal2-input minha-classe-personalizada",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      };

      Swal.fire(swalConfig).then((result) => {
        if (result.isConfirmed) {
          var senhaInserida = result.value;

          if (senhaInserida === senhaCorreta) {
            var dados = {
              nomeAluno: document.getElementById("nome-aluno").value,
              cidade: document.getElementById("cidade-aluno").value,
              dataNasc: document.getElementById("data-nasc").value,
              cpf: document.getElementById("cpf").value,
              email: document.getElementById("email-aluno").value,
              telefone: document.getElementById("telefone-aluno").value,
              instituicao: document.getElementById("instituicao").value,
              emailInstitucional: document.getElementById("email").value,
            };

            enviarDadosParaServidor(dados);

            document.getElementById("nome-aluno").value = "";
            document.getElementById("cidade-aluno").value = "";
            document.getElementById("data-nasc").value = "";
            document.getElementById("cpf").value = "";
            document.getElementById("email-aluno").value = "";
            document.getElementById("telefone-aluno").value = "";
            document.getElementById("instituicao").value = "";
            document.getElementById("email").value = "";

            Swal.fire({
              icon: "success",
              title: "Cadastrado!",
              text: "Os dados foram cadastrados com sucesso.",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              window.location.href = "antes-telaInicialAluno.html";
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Senha incorreta",
              text: "Por favor, tente novamente.",
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Campos vazios",
        text: "Por favor, preencha todos os campos antes de prosseguir.",
      });
    }
  });

  function todosCamposPreenchidos() {
    var nomeAluno = document.getElementById("nome-aluno").value;
    var cidade = document.getElementById("cidade-aluno").value;
    var dataNasc = document.getElementById("data-nasc").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email-aluno").value;
    var telefone = document.getElementById("telefone-aluno").value;
    var instituicao = document.getElementById("instituicao").value;
    var emailInstitucional = document.getElementById("email").value;

    if (
      nomeAluno === "" ||
      cidade === "" ||
      dataNasc === "" ||
      cpf === "" ||
      email === "" ||
      telefone === "" ||
      instituicao === "" ||
      emailInstitucional === ""
    ) {
      return false;
    }

    return true;
  }
});
function validarEstudante() {
  var email = document.getElementById("email").value;
  var dominiosValidos = [
    "facens.br",
    "uniso.br",
    "uniso.br",
    "usp.br",
    "unicamp.br",
    "ufscar.br",
  ];
  var dominio = email.split("@")[1];

  var iconeCorreto = document.getElementById("icone-correto");
  var iconeIncorreto = document.getElementById("icone-incorreto");

  if (dominiosValidos.includes(dominio)) {
    iconeCorreto.style.display = "inline";
    iconeIncorreto.style.display = "none";
    Swal.fire({
      icon: "success",
      title: "E-mail institucional correto!",
      text: "Você foi autenticado com sucesso.",
    });
  } else {
    iconeCorreto.style.display = "none";
    iconeIncorreto.style.display = "inline";
    Swal.fire({
      icon: "error",
      title: "E-mail da instituição inválido!",
      text: "Por favor, insira um e-mail institucional válido.",
    });
  }
}

function cancelar(event) {
  event.preventDefault();

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Quer mesmo cancelar o cadastro de aluno e voltar para a tela inicial?",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "index.html";
    }
  });
}

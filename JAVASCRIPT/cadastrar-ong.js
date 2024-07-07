var email = localStorage.getItem("email");
      var nome = localStorage.getItem("nome");

      document.querySelector("#nome-responsavel").value = nome;
      document.querySelector("#email-ong").value = email;

      //validação de CNPJ
      function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, "");

        if (cnpj === "") return false;

        if (cnpj.length !== 14) return false;

        // Elimina CNPJs conhecidos inválidos
        if (
          cnpj === "00000000000000" ||
          cnpj === "11111111111111" ||
          cnpj === "22222222222222" ||
          cnpj === "33333333333333" ||
          cnpj === "44444444444444" ||
          cnpj === "55555555555555" ||
          cnpj === "66666666666666" ||
          cnpj === "77777777777777" ||
          cnpj === "88888888888888" ||
          cnpj === "99999999999999"
        ) {
          return false;
        }

        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0), 10)) return false;

        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1), 10)) return false;

        return true;
      }

      var validacao = true;
      function validarFormulario() {
        let cnpj = document.getElementById("cnpj").value;
        if (validarCNPJ(cnpj)) {
          // CRIA O ALERTA AQUI
          // ALERTA CNPJ VALIDO
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "CNPJ válido!",
          });
          validacao = true;
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "CNPJ inválido!",
          });
          validacao = false;
        }
        return false;
      }

      document
        .getElementById("btn-cadastrar-ong")
        .addEventListener("click", function () {
          // Capturando os valores dos campos
          const nomeONG = document.getElementById("nome-ong").value.trim();
          const nomeResponsavel = document
            .getElementById("nome-responsavel")
            .value.trim();
          const cnpj = document.getElementById("cnpj").value.trim();
          const segmento = document.getElementById("segmento").value.trim();
          const cep = document.getElementById("cep-ong").value.trim();
          const estado = document.getElementById("estado").value.trim();
          const cidade = document.getElementById("cidade-ong").value.trim();
          const endereco = document.getElementById("endereco").value.trim();
          const numeroEndereco = document
            .getElementById("numero-endereco")
            .value.trim();
          const emailONG = document.getElementById("email-ong").value.trim();
          const telefoneONG = document
            .getElementById("telefone-ong")
            .value.trim();
          const sobreONG = document.getElementById("sobre").value.trim();
          const urlONG = document.getElementById("url-ong").value.trim();

          // Verificando se algum campo está vazio
          if (
            nomeONG === "" ||
            nomeResponsavel === "" ||
            cnpj === "" ||
            segmento === "" ||
            cep === "" ||
            estado === "" ||
            cidade === "" ||
            // endereco === "" ||
            // numeroEndereco === "" ||
            emailONG === "" ||
            telefoneONG === "" ||
            sobreONG === "" ||
            urlONG === ""
          ) {
            Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Por favor, preencha todos os campos.",
            });
          } else if (validacao == false) {
            // Se todos os campos estiverem preenchidos, prossegue com o cadastro
            Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "O CNPJ é inválido.",
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Atenção!",
              text: "Os dados fornecidos serão transmitos e armazenados conforme as diretrizes de segurança. Por favor, confirme que está ciente para prosseguirmos com o cadastro.",
              showCancelButton: true,
              confirmButtonText: "Estou ciente e quero cadastrar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                // Depois iremos colocar aqui a função para cadastrar os dados da ONG
                // Por exemplo: cadastrarONG();
                let url =
                  "https://664f28a4fafad45dfae29755.mockapi.io/api/v1/ong";

                let ong = {
                  nomeONg: nomeONG,
                  nomeResponsavel: nomeResponsavel,
                  cnpj: cnpj,
                  causa: segmento,
                  cep: cep,
                  estado: estado,
                  cidade: cidade,
                  endereco: endereco,
                  numero: numeroEndereco,
                  email: emailONG,
                  telefone: telefoneONG,
                  urlSite: urlONG,
                  sobre: sobreONG,
                };
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(ong),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    Swal.fire(
                      "Cadastrado!",
                      "Os dados foram cadastrados com sucesso.",
                      "success"
                    );
                    window.location.href = "telaInicialONG.html";
                  })
                  .catch((error) => {
                    Swal.fire({
                      icon: "error",
                      title: "Erro",
                      text: "Não foi possível realizar essa ação!.",
                    });
                    return;
                  });

                Swal.fire(
                  "Cadastrado!",
                  "Os dados foram cadastrados com sucesso.",
                  "success"
                ).then(() => {
                  document.getElementById("nome-ong").value = "";
                  document.getElementById("nome-responsavel").value = "";
                  document.getElementById("cnpj").value = "";
                  document.getElementById("segmento").selectedIndex = 0;
                  document.getElementById("cep-ong").value = "";
                  document.getElementById("estado").selectedIndex = 0;
                  document.getElementById("cidade-ong").value = "";
                  document.getElementById("endereco").value = "";
                  document.getElementById("numero-endereco").value = "";
                  document.getElementById("email-ong").value = "";
                  document.getElementById("telefone-ong").value = "";
                  document.getElementById("url-ong").value = "";
                  document.getElementById("sobre").value = "";

                  window.location.href = "telaInicialONG.html";
                });
              }
            });
          }
        });

      document.addEventListener("DOMContentLoaded", function () {
        const campos = document.querySelectorAll(
          'input[type="text"],input[type="number"], input[type="email"], input[type="password"], select,textarea, button, a'
        );
        const botaoEnviar = document.getElementById("botaoEnviar");

        campos.forEach(function (campo, index) {
          campo.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
              event.preventDefault(); // Impede o envio do formulário
              const próximoCampo = campos[index + 1];
              if (próximoCampo) {
                próximoCampo.focus();
              } else if (campo === campos[campos.length - 1]) {
                window.location.href = botaoEnviar
                  .getAttribute("onclick")
                  .replace("window.location.href='", "")
                  .replace("';", "");
              }
            }
          });
        });
      });

      function cancelar(event) {
        event.preventDefault();

        Swal.fire({
          icon: "warning",
          title: "Atenção!",
          text: "Quer mesmo cancelar o cadastro de ONG e voltar para a tela inicial?",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "index.html";
          }
        });
      }
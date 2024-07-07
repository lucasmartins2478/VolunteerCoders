document.getElementById("imagem").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imageData = event.target.result;
    localStorage.setItem("imagemBase64", imageData);

    const imagemPreview = document.getElementById("imagem-preview");
    imagemPreview.src = imageData;
    imagemPreview.style.display = "block";

    document.getElementById("imagem").style.display = "none";
  };

  reader.readAsDataURL(file);
});

document
  .querySelector(".btn-trocar-imagem")
  .addEventListener("click", function () {
    document.getElementById("imagem").style.display = "block";

    const imagemPreview = document.getElementById("imagem-preview");
    imagemPreview.src = "#";
    imagemPreview.style.display = "none";
    document.getElementById("imagem").value = "";

    localStorage.removeItem("imagemBase64");
  });

document
  .getElementById("btn-cadastrar")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Impede o envio do formulário pelo método padrão
    const titulo = document.querySelector("#titulo").value;
    const causa = document.querySelector("#causas-da-ong").value;
    const telefone = document.querySelector("#telefone").value;
    const responsavel = document.querySelector("#responsavel").value;
    const descricao = document.querySelector("#descricao").value;

    if (!titulo || !causa || !telefone || !responsavel || !descricao) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Preencha todos os campos.",
      });
      return;
    }

    const problema = {
      titulo: titulo,
      causa: causa,
      telefone: telefone,
      responsavel: responsavel,
      descricao: descricao,
    };

    const url = "https://664d0a0cede9a2b556527d60.mockapi.io/api/v1/problema";

    // Envia os dados para a API usando fetch
    fetch(url, {
      method: "POST", // Define o método como POST
      headers: {
        "Content-Type": "application/json", // Define o cabeçalho como JSON
      },
      body: JSON.stringify(problema), // Converte o objeto problema para uma string JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Aqui você pode adicionar código para exibir uma mensagem de sucesso ao usuário
      })
      .catch((error) => {
        console.error("Error:", error);
        // Aqui você pode adicionar código para exibir uma mensagem de erro ao usuário
      });
  });

function cancelar(event) {
  event.preventDefault();

  Swal.fire({
    icon: "warning",
    title: "Atenção!",
    text: "Quer mesmo cancelar o cadastro de problema e voltar para a tela inicial?",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "telaInicialONG.html";
    }
  });
}

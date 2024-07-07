function recuperarSenha() {
  const email = document.getElementById("email").value;

  if (!validarEmail(email)) {
    Swal.fire({
      icon: "error",
      title: "Erro no formato do e-mail",
      text: "Por favor, insira um endereço de e-mail válido.",
    });
    return;
  }

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "E-mail enviado",
        text: "Um link para redefinição de senha foi enviado para o seu e-mail.",
      }).then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      console.error(
        "Error sending password reset email:",
        error.code,
        error.message
      );
      Swal.fire({
        icon: "error",
        title: "Erro ao enviar e-mail",
        text: "Ocorreu um erro ao enviar o e-mail para redefinição de senha. Verifique o e-mail e tente novamente.",
      });
    });
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
  const campos = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], select, button, a'
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

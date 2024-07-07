const db = firebase.firestore();
function logar(event) {
  event.preventDefault();

  if (todosCamposPreenchidos()) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

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
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return db.collection("usuarios").doc(email).get();
      })
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.tipoCadastro === "aluno") {
            window.location.href = "./antes-telaInicialAluno.html";
          } else if (userData.tipoCadastro === "ong") {
            window.location.href = "./telaInicialONG.html";
          }
        } else {
          console.error("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error.code, error.message);

        // error.code == "auth/user-not-found"
        Swal.fire({
          icon: "error",
          title: "Erro no login",
          text: "Verifique seu email e senha e tente novamente.",
        });
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Campos vazios",
      text: "Por favor, preencha todos os campos antes de prosseguir.",
    });
  }
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function recuperarSenha() {}

function todosCamposPreenchidos() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  // Verifica se algum campo está vazio
  if (email === "" || senha === "") {
    return false; // Retorna falso se algum campo estiver vazio
  }

  return true; // Retorna verdadeiro se todos os campos estiverem preenchidos
}

document.addEventListener("DOMContentLoaded", function () {
  const campos = document.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="password"], select, button, a'
  );
  const botaoEnviar = document.getElementById("btnLogin");

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

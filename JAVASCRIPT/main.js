document.querySelector('.btn-cadastrar-problema').addEventListener('click', function () {
    // Verifica se todos os campos estão preenchidos
    if (todosCamposPreenchidos()) {
        var senhaCorreta = "s"; // Senha correta para cadastro 

        // Configuração do alerta personalizado
        const swalConfig = {
            title: 'Insira sua senha de login para confirmar sua identidade:',
            input: 'password', // Define o tipo de entrada como senha
            inputAttributes: {
                // Adiciona classes personalizadas ao campo de senha
                class: 'swal2-input minha-classe-personalizada'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        };

        // Exibe o alerta personalizado
        Swal.fire(swalConfig).then((result) => {
            if (result.isConfirmed) {
                var senhaInserida = result.value;

                if (senhaInserida === senhaCorreta) {
                    // Se a senha estiver correta, continue com o processo de cadastro
                    var titulo = document.getElementById("titulo").value;
                    var descricao = document.getElementById("descricao").value;
                    var causasDaOng = document.getElementById("causas-da-ong").value;
                    var responsavel = document.getElementById("responsavel").value;
                    var telefone = document.getElementById("telefone").value;

                    // Obtendo a data e hora atuais
                    var dataAtual = new Date();
                    var dataFormatada = dataAtual.toLocaleDateString() + ' ' + dataAtual.toLocaleTimeString();

                    // Exibe um alerta de sucesso
                    Swal.fire({
                        icon: 'success',
                        title: 'Problema cadastrado com sucesso!',
                        text: 'Os dados sensíveis de ONG e estudante são privados.'
                    });

                    // Limpando os campos após o cadastro
                    document.getElementById("titulo").value = "";
                    document.getElementById("descricao").value = "";
                    document.getElementById("causas-da-ong").selectedIndex = 0;
                    document.getElementById("responsavel").value = "";
                    document.getElementById("telefone").value = "";

                } else {
                    // Se a senha estiver incorreta, exibe uma mensagem de erro
                    Swal.fire({
                        icon: 'error',
                        title: 'Senha incorreta',
                        text: 'Por favor, tente novamente.'
                    });
                }
            }
        });
    } else {
        // Exibe um alerta informando que todos os campos precisam ser preenchidos
        Swal.fire({
            icon: 'warning',
            title: 'Campos vazios',
            text: 'Por favor, preencha todos os campos antes de prosseguir.'
        });
    }
});

// Função para verificar se todos os campos estão preenchidos
function todosCamposPreenchidos() {
    var titulo = document.getElementById("titulo").value;
    var descricao = document.getElementById("descricao").value;
    var causasDaOng = document.getElementById("causas-da-ong").value;
    var responsavel = document.getElementById("responsavel").value;
    var telefone = document.getElementById("telefone").value;

    // Verifica se algum campo está vazio
    if (titulo === "" || descricao === "" || causasDaOng === "" || responsavel === "" || telefone === "") {
        return false; // Retorna falso se algum campo estiver vazio
    }

    return true; // Retorna verdadeiro se todos os campos estiverem preenchidos
}


document.getElementById('imagem').addEventListener('change', function (event) {
    var file = event.target.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Seleciona o elemento de input de imagem
            var inputImagem = document.getElementById('imagem');

            // Define a imagem selecionada como plano de fundo do campo de input de imagem
            inputImagem.style.backgroundImage = 'url(' + e.target.result + ')';
            inputImagem.style.backgroundSize = 'cover';
            inputImagem.style.backgroundPosition = 'center';

            // Oculta o botão de upload (Rever isso)
            var uploadButton = document.querySelector('#file-upload-button');
            uploadButton.style.display = 'none';
        };

        reader.readAsDataURL(file);
    }
});  
document.addEventListener("DOMContentLoaded", function() {
    const campos = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], select,textarea, button ');
    const botaoEnviar = document.getElementById('btn-cadastrar-problema');
  
    campos.forEach(function(campo, index) {
      campo.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Impede o envio do formulário
          const próximoCampo = campos[index + 1];
          if (próximoCampo) {
            próximoCampo.focus();
          } else if (campo === campos[campos.length - 1]) {
            window.location.href = btn-cadastrar-problema.getAttribute('onclick').replace("window.location.href='", "").replace("';", "");
          }
        }
      });
    });
  });
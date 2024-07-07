const db = firebase.firestore();

        function show(anything) {
            document.querySelector(".text-box").value = anything;
        }
        let selectUser = document.querySelector(".select-user");
        selectUser.onclick = function () {
            selectUser.classList.toggle("active");
        };

        //criando função que altera a pagina
        //de cadastro dependendo do tipo
        //de usuario selecionado

        document
            .getElementById("continue-bnt")
            .addEventListener("click", function () {
                var selectedValue = document
                    .getElementById("options")
                    .value.trim()
                    .toLowerCase();

                var nome = document.getElementById("nome").value.trim();
                var email = document.getElementById("email").value.trim();
                var senha = document
                    .getElementById("password")
                    .value.trim();
                var confirmSenha = document
                    .getElementById("confirmPassword")
                    .value.trim();

                if (
                    nome === "" ||
                    email === "" ||
                    senha === "" ||
                    confirmSenha === ""
                ) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 8000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Por favor, Preencha os campos obrigatórios",
                    });
                } else {
                    if (selectedValue !== "tipo de cadastro") {
                        firebase.auth().createUserWithEmailAndPassword(email, senha).then(userCredential => {
                            const user = userCredential.user;
                            const uid = user.uid;

                            localStorage.setItem('nome', nome);
                            localStorage.setItem('email', email);

                            return db.collection('usuarios').doc(email).set({
                                email: email,
                                senha: senha,
                                tipoCadastro: selectedValue
                            }).then(() => {
                                if (selectedValue === "aluno") {
                                    db.collection("alunos").doc(uid).set({
                                        email: email
                                    });
                                    window.location.href = "cadastroAluno.html";
                                } else if (selectedValue === "ong") {
                                    db.collection("ongs").doc(uid).set({
                                        email: email
                                    });
                                    window.location.href = "cadastroONG.html";
                                }
                            });
                        }).catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                // Endereço de e-mail já em uso
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Erro no cadastro',
                                    text: 'O endereço de e-mail já está em uso. Por favor, utilize outro endereço de e-mail.',
                                });
                            } else {
                                // Outro erro durante o cadastro do usuário
                                console.error('Erro ao criar usuário:', error.code, error.message);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Erro no cadastro',
                                    text: 'Erro inesperado. Verifique os dados e tente novamente.',
                                });
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Selecione um tipo de cadastro",
                            text: "Por favor, selecione Aluno ou ONG.",
                        });
                    }
                }
            });

        function showPasswordSuggestions(show) {
            const passwordSuggestions = document.getElementById(
                "password-suggestions"
            );
            passwordSuggestions.style.display = show ? "block" : "none";
        }

        function showPasswordMatchMessage(show) {
            const passwordMatchMessage = document.getElementById(
                "passwordMatchMessage"
            );
            passwordMatchMessage.style.display = show ? "block" : "none";
        }

        function validatePassword(password) {
            const passwordSuggestions = document.getElementById(
                "password-suggestions"
            );
            const minLength = document.getElementById("min-length");
            const maxLength = document.getElementById("max-length");
            const lowercase = document.getElementById("lowercase");
            const uppercase = document.getElementById("uppercase");
            const number = document.getElementById("number");
            const specialChar = document.getElementById("special-char");
            const suggestionText = passwordSuggestions.querySelector("p");

            const hasMinLength = password.length >= 8;
            const hasMaxLength = password.length <= 70;
            const hasLowercase = /[a-z]/.test(password);
            const hasUppercase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar =
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

            minLength.style.color = hasMinLength ? "green" : "red";
            maxLength.style.color = hasMaxLength ? "green" : "red";
            lowercase.style.color = hasLowercase ? "green" : "red";
            uppercase.style.color = hasUppercase ? "green" : "red";
            number.style.color = hasNumber ? "green" : "red";
            specialChar.style.color = hasSpecialChar ? "green" : "red";

            if (
                hasMinLength &&
                hasMaxLength &&
                hasLowercase &&
                hasUppercase &&
                hasNumber &&
                hasSpecialChar
            ) {
                suggestionText.innerHTML = "Senha forte!";
                suggestionText.classList.add("green");
            }
        }
        function checkPasswordMatch(confirmPassword) {
            const password = document.getElementById("password").value;
            const passwordMatchMessage = document.getElementById(
                "passwordMatchMessage"
            );

            if (password === confirmPassword) {
                passwordMatchMessage.textContent = "As senhas coincidem.";
                passwordMatchMessage.style.color = "green";
            } else {
                passwordMatchMessage.textContent =
                    "As senhas não coincidem.";
                passwordMatchMessage.style.color = "red";
            }
        }

        function redirectAndAlert() {
            // Verifica se alguma opção foi selecionada
            const alunoSelected = document
                .getElementById("aluno")
                .classList.contains("selected");
            const ongSelected = document
                .getElementById("ong")
                .classList.contains("selected");

            if (!alunoSelected && !ongSelected) {
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
                    title: "selecione ou ONG ou Aluno!",
                });
                // } else if (ongSelected) {
                //     window.location.replace("cadastroONG.html");//
            }
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
        const text = "talentos digitais ";
        let index = 1;
        let direction = 1;

        function type() {
            if (index === text.length) {
                direction = -1; // volta
            } else if (index === 1) {
                direction = 1; // frente
            }

            document.getElementById("digitando").innerHTML = text.substring(
                0,
                index
            );

            if (direction === 1) {
                index++;
            } else {
                index--;
            }

            if (index === 0 || index === text.length) {
                setTimeout(type, 1500);
            } else {
                setTimeout(type, 190);
            }
        }

        type();
window.sr = ScrollReveal({ reset: true });

      sr.reveal(".container", {
        rotate: { x: 0, y: 80, z: 0 },
        duration: 2000,
      });
      sr.reveal(".causas-container", {
        rotate: { x: 0, y: 80, z: 0 },
        delay: 200,
        duration: 2000,
      });

      sr.reveal(".linguagens-info", {
        // origin: 'left',
        rotate: { x: 0, y: 80, z: 0 },
        delay: 200,
        duration: 2000,
      });

      sr.reveal(".login", {
        origin: "top",
        distance: "10px",
        duration: 2000,
        delay: 500,
        easing: "ease",
      });
      sr.reveal(".form-container", {
        origin: "top",
        distance: "10px",
        duration: 2000,
        delay: 500,
        easing: "ease",
      });

      function scrollToForm() {
        const formSection = document.getElementById("form-section");
        formSection.scrollIntoView({ behavior: "smooth" });
      }
      function cadastro() {
        window.location.href = "HTML/index.html";
      }

      function inscrever(event) {
        event.preventDefault();
        var nome = document.querySelector("#nome").value;
        var email = document.querySelector("#email").value;

        if (nome == "" || email == "") {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Preencha todos os campos.",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Email enviado",
            text: "Enviaremos um email para mais informações.",
          }).then(() => {
            window.location.href = "HTML/index.html";
          });
        }
        document.querySelector("#nome").value = "";
        document.querySelector("#email").value = "";
      }
      function login() {
        window.location.href = "HTML/login.html";
      }
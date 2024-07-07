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

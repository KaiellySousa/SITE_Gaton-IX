document.querySelector("#formContato").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const mensagem = document.querySelector("#mensagem").value.trim();
  const q1 = document.querySelector('input[name="q1"]:checked')?.value;
  const q2 = document.querySelector('select[name="q2"]').value;
  const q3 = document.querySelector('input[name="q3"]:checked')?.value;
  const retorno = document.querySelector("#retorno");

  if (!nome || !email || !mensagem || !q1 || !q2 || !q3) {
    retorno.textContent = "Por favor, preencha todos os campos!";
    retorno.style.color = "purple";
    return;
  }

  const dados = {
    data: {
      nome,
      email,
      mensagem,
      q1,
      q2,
      q3,
      data_envio: new Date().toISOString()
    }
  };

  try {
    const response = await fetch("https://sheetdb.io/api/v1/2hjgojmpfe3b1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      retorno.textContent = "Mensagem enviada com sucesso para a nave! 🚀";
      retorno.style.color = "lightgreen";
      document.querySelector("#formContato").reset();
    } else {
      retorno.textContent = "Erro ao enviar. Tente novamente.";
      retorno.style.color = "red";
    }
  } catch (error) {
    retorno.textContent = "Erro de conexão com a API.";
    retorno.style.color = "red";
    console.error(error);
  }
});
async function carregarMensagensHolograficas() {
  try {
    const response = await fetch("https://sheetdb.io/api/v1/2hjgojmpfe3b1");
    const mensagens = await response.json();

    const ultimas = mensagens.slice(-3).reverse();

    ultimas.forEach((msg, index) => {
      const garrafa = document.querySelector(`#garrafa${index + 1}`);
      if (garrafa) {
        garrafa.innerHTML = `
          <div class="holograma">
            <strong>${msg.nome}</strong> diz:<br>
            "${msg.mensagem}"
          </div>
        `;
      }
    });
  } catch (error) {
    console.error("Erro ao carregar mensagens holográficas:", error);
  }
}

// Chama essa função quando a página carregar
document.addEventListener("DOMContentLoaded", carregarMensagensHolograficas);


document.getElementById('enviar').onclick = async () => {
  const prompt = document.getElementById('prompt').value;
  const respostaEl = document.getElementById('resposta');
  respostaEl.textContent = 'Carregando...';

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-coder:6.7b-instruct',
        prompt,
        stream: false
      })
    });

    const data = await res.json();

    console.log(data);
    respostaEl.textContent = data.response;
  } catch (err) {
    respostaEl.textContent = 'Erro: ' + err.message;
  }
};

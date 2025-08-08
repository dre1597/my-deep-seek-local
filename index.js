let fileContent = '';

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    fileContent = e.target.result;
    console.log('Arquivo carregado:', file.name);
  };
  reader.readAsText(file);
});

document.getElementById('enviar').onclick = async () => {
  const userPrompt = document.getElementById('prompt').value;
  const respostaEl = document.getElementById('resposta');
  respostaEl.textContent = 'Carregando...';

  const fullPrompt = fileContent
    ? `Considere o seguinte código:\n\n${fileContent}\n\nAgora, responda: ${userPrompt}`
    : userPrompt;

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-coder:6.7b-instruct',
        prompt: fullPrompt,
        stream: false
      })
    });

    const data = await res.json();
    respostaEl.textContent = data.response;
  } catch (err) {
    respostaEl.textContent = 'Erro: ' + err.message;
  }
};

import { useEffect } from "react";

const Tetris = () => {
  useEffect(() => {
    // Carregue e adicione o conteúdo HTML/JS aqui
    fetch('../../../../game/dist/index.html')
      .then(response => response.text())
      .then(html => {
        const container = document.getElementById('embedded-project-container');
        container.innerHTML = html;

        // Adicione qualquer lógica adicional de inicialização do projeto, se necessário
      })
      .catch(error => console.error('Erro ao carregar o arquivo HTML:', error));
  }, []);

  return (
    <div id="embedded-project-container">
      {/* O conteúdo será renderizado aqui */}
    </div>
  );
};

export default Tetris;
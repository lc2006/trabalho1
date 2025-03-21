// Função para carregar as tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const listaTarefas = document.getElementById('listaTarefas');
    
    // Limpar a lista antes de adicionar as tarefas
    listaTarefas.innerHTML = '';

    // Adicionar as tarefas salvas
    tarefasSalvas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="tarefa${index}" ${tarefa.concluida ? 'checked' : ''} />
            <label for="tarefa${index}">${tarefa.nome}</label>
            <button onclick="removerTarefa(${index})">Remover</button>
        `;
        listaTarefas.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    const inputTarefa = document.getElementById('novaTarefa');
    const nomeTarefa = inputTarefa.value.trim();

    if (nomeTarefa) {
        const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefasSalvas.push({ nome: nomeTarefa, concluida: false });
        localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

        inputTarefa.value = ''; // Limpar o campo de entrada
        carregarTarefas(); // Recarregar as tarefas
    }
}

// Função para remover uma tarefa
function removerTarefa(index) {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.splice(index, 1); // Remover a tarefa pelo índice
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
    carregarTarefas(); // Recarregar as tarefas
}

// Função para marcar/desmarcar uma tarefa como concluída
function marcarTarefaConcluida(index) {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas[index].concluida = !tarefasSalvas[index].concluida; // Alterar o status da tarefa
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));
    carregarTarefas(); // Recarregar as tarefas
}

// Inicialização
document.getElementById('adicionarTarefa').addEventListener('click', adicionarTarefa);

// Adicionar evento de marcar/desmarcar quando clicar na checkbox
document.getElementById('listaTarefas').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const index = Array.from(e.target.closest('ul').children).indexOf(e.target.closest('li'));
        marcarTarefaConcluida(index);
    }
});

// Carregar as tarefas ao carregar a página
window.onload = carregarTarefas;
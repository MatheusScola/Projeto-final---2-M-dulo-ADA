/* Requisitos
Dentre as funcionalidades, espera-se que seja possível:

Adicionar uma tarefa
Editar uma tarefa salva
Remover uma tarefa salva
Listar todas as tarefas salvas
Obter uma tarefa, através de um parâmetro (id)

Observações
Não haverá a persistência das tarefas em banco de dados. Para isso, podem utilizar um array para armazenar a lista das tarefas cadastradas.
*/

// Declarando Variáveis

let contador = 0;
let input = document.getElementById('input-adicionar');
let buttonAdicionarTarefa = document.getElementById("adicionar");
let buttonProcurarTarefa = document.getElementById("procurar");
let container = document.getElementById("lista");
let listItens = document.querySelectorAll(".item");

// Nomeando Funções

const adicionarTarefa = () => {
    let vlInput = input.value;

    // Conferindo valor do digito no input e id do input.
    if (vlInput !== null && vlInput !== "" && vlInput !== undefined && input.id != "input-editar") {

        contador++;

        // Criando novo item da lista

        let novoItem = `<div id="${contador}" class="item">
        <div onclick="alterarStatus(${contador})" class="item-icone">
            <i id="icone_${contador}" class="iconify" data-icon="mdi-circle-outline"></i>
        </div>
        <div onclick="alterarStatus(${contador})" class="item-nome">
            <p class="descicao-tarefa">${vlInput}</p>
        </div>
        <div class="item-botao">
            <button onclick="removerTarefaSalva(${contador})" class="delete"><i class="iconify" data-icon="mdi-delete"></i>Apagar</button>
            <button onclick="editarTarefa(${contador})" class="edit"><i class="iconify" data-icon="mdi-edit"></i>Editar</button>
        </div>`;

        // Exibindo Item criado no HTML
        container.innerHTML += novoItem;
        input.value = "";
        input.focus();

    } else {

        // Configurando elementos caso o valor do input ou id sejam inválidos.

        input.value = "";
        input.id = "input-adicionar";
        input.focus();
        input.removeEventListener("input", atualizarDescricaoTarefa);

    }
}

const editarTarefa = (idTarefa) => {
    input.focus();

    // Instanciando elementos HTML

    let item = document.getElementById(idTarefa);
    let vlTarefa = item.getElementsByClassName('descicao-tarefa');
    let idInput = input.getAttribute("id");

    // Pegando valor da tarefa que vai ser editada
    vlTarefa = vlTarefa[0];
    vlTarefa = vlTarefa.firstChild.nodeValue;

    // Alterando ID do input para a alteração ser realizada
    if (idInput === "input-adicionar") {
        input.id = "input-editar";
    }

    // Colocando valor da Tareda a ser editada no Input.
    input.value = vlTarefa;

    // Criando evento no Input para cada vez que o valor dele for alterado também seja alterado o valor da tarefa.
    input.addEventListener("input", atualizarDescricaoTarefa = (e) => {
        let novoValor = item.getElementsByClassName('descicao-tarefa');
        novoValor[0].firstChild.textContent = e.target.value;
    });
}

const alterarStatus = (idTarefa) => {

    // Instanciando elementos HTML
    let item = document.getElementById(idTarefa);
    let classe = item.getAttribute("class");
    let pathIcone = document.querySelector(`#icone_${idTarefa} path`);

    // Conferindo classe do Item para alterar o status dele
    if (classe == "item") {
        item.classList.add('clicado');

        //Alterando Path do icone
        pathIcone.setAttribute('d', 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z')

        // Movendo o Item para o final da lista
        item.parentNode.appendChild(item);

    } else {
        item.classList.remove('clicado');

        //Alterando Path do icone
        pathIcone.setAttribute('d', 'M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2')

    }
}

const removerTarefaSalva = (idTarefa) => {

    // Instanciando elementos HTML
    let tarefa = document.getElementById(idTarefa);

    // Removendo Tareda do HTML
    tarefa.remove();
}

const listarTarefas = () => {

    // Instanciando elementos HTML
    let classLista = container.className;
    let btnListar = document.getElementById("mostrar");

    // Conferindo classe do container da lista para ocultar o mesmo
    if (classLista == "container-oculto") {
        container.classList.remove('container-oculto');
        container.classList.add('container');

        // alterando Icone do olho
        btnListar.innerHTML = 'Ocultar Lista <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" id="eye" class="iconify" data-icon="mdi-eye" style="vertical-align: -0.125em; transform: rotate(360deg);"><path fill="currentColor" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"></path></svg>'

    } else {
        container.classList.remove('container');
        container.classList.add('container-oculto');
        btnListar.textContent = 'Mostrar Lista'

        // alterando Icone do olho
        btnListar.innerHTML = 'Mostrar Lista <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" id="eye" class="iconify" data-icon="mdi-eye" style="vertical-align: -0.125em; transform: rotate(360deg);"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path></svg>'

    }

}

const procurarTarefa = () => {

    // Instanciando elementos HTML
    let itens = document.getElementsByClassName("item");
    let vlProcurado = input.value;

    // Fução que vai comparar os valores dos itens da lista com o valor procurado
    let compararValores = () => {

        // adicionado evento no Input
        input.addEventListener("input", teste = (e) => {
            if (e.target.value === "") {
                input.id = "input-adicionar";

                for (let i = 0; i < itens.length; i++) {
                    itens[i].classList.remove("item-oculto");
                }

            }
        });

        for (let i = 0; i < itens.length; i++) {

            let vlItem = itens[i].getElementsByClassName('descicao-tarefa')[0].firstChild.nodeValue

            if (vlProcurado !== vlItem) {
                itens[i].classList.add("item-oculto");
            }
        }
    };

    // Verificando valor do Input
    if (vlProcurado) {
        input.id = "input-procurar";
        compararValores();
    }

};


// adicionado evento no Input
input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        buttonAdicionarTarefa.click();
    }
});
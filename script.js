// criando as constantes para os campos que vou utilizar no localStorage e de interaçao com o layout (front)
// querySelector é usado para buscar elementos no html
// foi usado a tag # para buscar pelo ID do html
const tbody = document.querySelector('tbody')
const product = document.querySelector('#product')
const valueProd = document.querySelector('#valueProd')
const saveProd = document.querySelector('#btnSalvar')

// variaveis para manipular os valores no localStorage

var itens, id

// funçoes do CRUD , dividido em CREATE , READ , UPDATE e DELETE
// conversao
const getItens = () => JSON.parse(localStorage.getItem('dbprod')) ?? []
const setItens = () => localStorage.setItem('dbprod', JSON.stringify(itens))
// UPDATE ou  EDIÇÃO , ONDE EU VOU INSERIR DADOS EM UMA TABELA

function createItem(item, index) {
    // var criado para armazenar o novo valor do tr da tabela
    var tr = document.createElement('tr')
    // Nesse caso foi usado o innerHTML  ,  onde ele cria uma linha na tabela usando as variaveis inseridas no input
    // é usado a crase para concatenar o html com javascript
    tr.innerHTML = `
    <td>${item.product}</td>
    <td>R$ ${item.valueProd}</td>
    <td>
        <button class ='edit' onclick='updateItem(${index})' > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg> </button>
    </td>
    <td>
        <button class ='exclude' onclick='deleteItem(${index})'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
      </svg> </button>
    </td>
     `
    // adionando o novo tr ao elemento pai da tabela 
    tbody.appendChild(tr)

}

// DELETE 
// Usado o splice para retirar 1 index dos itens
// Depois é definido(setItens) os itens e atualizado(loadItens) 
function deleteItem(index) {
    let deletar = confirm('Deseja excluir este produto?')
    if (deletar == true) {
        itens.splice(index, 1)
        setItens()
        loadItens()
    } else {
    }
}

// UPDATE

function updateItem(index) {
    product.value = itens[index].product;
    valueProd.value = itens[index].valueProd;
    id = index
}
// função para limpar os campos apos salvar o produto novo
// ao adicionar o produto novo ou editado o id recebe undefined para controle de edição ou adição
const clearFields = () => {
    id = undefined;
    product.value = "";
    valueProd.value = "";
};
// Save
// Aqui ele cancela o evento de click se os campos não estiverem preenchidos
btnSalvar.onclick = e => {
    if (product.value == '', valueProd.value == '') {
        return
    }
    document.getElementById('btnSalvar').addEventListener('click', e);
    e.preventDefault();

    // verifica se o campo tem um index , se nao tiver ele adiciona novos dados no final do array , atraves do PUSH
    let teste = confirm('Deseja adicionar este produto?')
    if (teste == true) {
        if (id > 0) {
            itens[id].product = product.value
            itens[id].valueProd = valueProd.value
            clearFields()
        } else{
            itens.push({ 'product': product.value, 'valueProd': valueProd.value })

        }
        setItens()
        clearFields()
        loadItens()
    } else {
        clearFields()
    }

}


// atualizar os itens

function loadItens() {
    itens = getItens()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        createItem(item, index)
    })
}
loadItens()



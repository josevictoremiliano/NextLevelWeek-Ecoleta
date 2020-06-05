
function ufs(){
    const ufSelect = document.querySelector("select[name=uf]")
       
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then ( res => res.json())
        .then( states=>{
            for( const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
    
}

ufs()

function getCities(event){
    const citySelect = document.querySelector("select[name=cidade]")
    const stateInput = document.querySelector("Input[name=estado]")

    const ufValue = event.target.value

    const stateselectPUser = event.target.selectedIndex
    stateInput.value = event.target.options[stateselectPUser].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    // limpa o campo e bloqueia
    citySelect.innerHTML= "<option value>Selecione a cidade</option>"
    citySelect.disabled = false

    fetch(url)
        .then ( res => res.json())
        .then( cities=>{

            for( const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            }
            citySelect.disabled = false
        })
}
document
.querySelector("select[name=uf]")
. addEventListener("change", getCities)

//listas
const itemsColeta = document.querySelectorAll(".items-grid li")
    for (const item of itemsColeta){
        item.addEventListener("click", itemSelecionado)
    }

    const itemColetado = document.querySelector("input[name=items]")

    let selectedItems = []


    function itemSelecionado(event){
        const itemLi = event.target
        //Add ou remove class com JS
        itemLi.classList.toggle("selected")

        const itemId= event.target.dataset.id


        
        //verifica items e pega os itens;
        const seSelecionado = selectedItems.findIndex(item =>{
            const achadoItem = item  == itemId //verdadeiro ou falso
            return achadoItem
        })
        //se selecionado tira da seleção;
         if(seSelecionado >= 0){
             //tira da seleção
             const filtroItems = selectedItems.filter(item =>{
                const itemDiferente = item != itemId  //false
                return itemDiferente
             })
             selectedItems = filtroItems
         }
        //se não tiver selecionado add a seleção;
         else{
             selectedItems.push(itemId)
         }
        
        //atualizar campo escondido;
        itemColetado.value = selectedItems
    }
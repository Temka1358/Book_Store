


let buttons = document.getElementsByClassName("delete-btn")
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", deleteHander)
}
function deleteHander(event){
    let id = this.id
    fetch(`http://localhost:3000/api/deletebook/${id}`)
    .then(response => response.text())
    .then(data => {
        alert(data)
        location.reload()
    })
}


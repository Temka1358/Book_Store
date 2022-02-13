

// get selected book by id and send delete request
let buttons = document.getElementsByClassName("delete-btn")
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", deleteHander)
}
function deleteHander(event){
    event.preventDefault();
    let id = this.id
    fetch(`http://localhost:3000/api/deletebook/${id}`)
    .then(response => response.text())
    .then(data => {
        alert(data)
        location.reload()
    })
}

// reset books list to default list
document.getElementById("reset-btn").addEventListener('click', (event)=>{
    event.preventDefault();
    fetch('http://localhost:3000/reset')
    .then(response =>{
        return response
    })
    .then(response => {
        alert("Books list is set to default")
        location.reload()
    })
})




document.getElementById('add-form').addEventListener('submit', formHandler)

function formHandler(event){
    event.preventDefault();
    book = {
        "img" : event.target.image.value,
        "isbn" : event.target.isbn.value,
        "title" : event.target.title.value,
        "subtitle" : event.target.subtitle.value,
        "author" : event.target.author.value,
        "published" : event.target.published.value,
        "publisher" : event.target.publisher.value,
        "pages": event.target.pages.value,
        "website" : event.target.website.value,
        "description" : event.target.description.value   
    }
    fetch('http://localhost:3000/api/addbook', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => {
        if (response.ok) return response.json()
        else throw new Error ("Status code: " + response.status)
    })
    .then(data => {
        console.log("Success: ", data)
    })
    .catch((error)=>{
        alert(error)
    })
}
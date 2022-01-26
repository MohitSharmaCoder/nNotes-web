// If user adds a not 
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e){

    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem('notes')
    if (notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }

    notesObj.push(addTxt.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addTxt.value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard ncard">
            <div class="card-body">
                <h3 class="card-title">Note ${index+1}</h3>
                <p class="card-text" style="font-size: 20px; word-wrap: break-word;">${element}</p>
                <span>
                    <button id=${index} class="btn" onclick="deleteNote(this.id)">Delete Note</button>
                </span>
            </div>
        </div>
        `
    });

    let notesElm = document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = "Nothing to show! Use 'nNotes-Web' section above to add notes."
    }
}


// function to delete a note 
function deleteNote(index){
    let notes = localStorage.getItem('notes');
    if (notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase()
    console.log("event fire", inputVal)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
    })

})

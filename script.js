let totalWords = document.getElementById('totalWords');
const searchBoxLabel = document.getElementById('searchBoxLabel');
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const wordListPlace = document.getElementById('wordListPlace');
const wordList = document.getElementById('wordList');
let words = new Array();
searchButton.addEventListener('click', submitSearch);
searchBox.focus();

function submitSearch() {
    /*     console.log(searchBox.value) */
    //Moving the search box + search button on the right side
    searchBoxLabel.id = "newSearchLabel";
    document.getElementById('searchText').remove();
    searchBox.className = "form-control-sm";
    searchButton.className = 'btn btn-primary btn-sm';
    //Creating a new add panel for adding new words
    const addWordButton = document.createElement('button');
    addWordButton.innerText = "Add";
    addWordButton.className = "btn btn-outline-secondary";
    document.getElementById('addPlace').appendChild(addWordButton);
    const addWordBox = document.createElement('input');
    addWordBox.type = "text";
    addWordBox.placeholder = "Add a new word";
    addWordBox.className = "form-control";
    document.getElementById('addLabel').appendChild(addWordBox);

    addWordButton.addEventListener('click', () => {
         words.push(addWordBox.value);
        words.forEach(element => {
            let newWord = document.createElement('li');
            newWord.innerText = element;
            wordList.appendChild(newWord);
        }); 
        
    });



}


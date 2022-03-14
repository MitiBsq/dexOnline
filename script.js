let totalWords = document.getElementById('totalWords');
const searchBoxLabel = document.getElementById('searchBoxLabel');
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const wordListPlace = document.getElementById('wordListPlace');
const wordList = document.getElementById('wordList');
wordListPlace.style.visibility = 'hidden';
searchBox.focus();
totalWords.innerHTML = "Total number of Words: ";
const verify = new Array();
for (let i = 0; i < localStorage.length; i++) {
    verify.push(localStorage.key(i));
    let words = document.createElement('li');
    words.innerText = localStorage.key(i);
    wordList.appendChild(words);
}
// Adding an event to the searchButton + fixing the error of not typing something
searchButton.addEventListener('click', () => {
    if (searchBox.value !== "") {
        if (verify.indexOf(searchBox.value) !== -1) {
            document.getElementById('searchText').innerText = "Great! Word found";
            document.getElementById('searchText').style.color = 'green';
            showWord(searchBox.value);
        } else {
            nextPage();
        }
    } else {
        document.getElementById('searchText').innerText = "Insert a word!";
        document.getElementById('searchText').style.color = 'red';
    }

});
//VEzi ca cuvantul ramane salvat 
const wordFound = document.createElement('h4');
function showWord(element) {
    wordFound.innerText = searchBox.value;
    searchBoxLabel.appendChild(wordFound);
}

function nextPage() {
    wordFound.remove();
    wordListPlace.style.visibility = 'visible';
    //Moving the search box + search button on the right side
    searchBoxLabel.id = "newSearchLabel";
    document.getElementById('searchText').remove();
    searchBox.className = "form-control-sm";
    searchButton.className = 'btn btn-primary btn-sm';
    searchBoxLabel.appendChild(document.createElement("h6")).innerText = "Sorry, we couldn't find your choosed word, maybe you can find it in the list below";
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
    const addWordBoxDetail = document.createElement('input');
    addWordBoxDetail.type = "text";
    addWordBoxDetail.placeholder = "What it means?";
    addWordBoxDetail.className = "form-control";
    document.getElementById('addLabel').appendChild(addWordBoxDetail);
    // sa folosesc localStorage pentru stocarea datelor
    addWordButton.addEventListener('click', () => {
        let newWord = document.createElement('li');
        newWord.innerText = addWordBox.value;
        let newWordDetail = addWordBoxDetail.value;
        wordList.appendChild(newWord);
        localStorage.setItem(addWordBox.value, "cuvant");
        if (addWordBoxDetail.value === '') {
            console.log('merge')
        } else {
            console.log(addWordBoxDetail.value)
        }

    });
}


let totalWords = document.getElementById('totalWords');
const searchBoxLabel = document.getElementById('searchBoxLabel');
const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const wordListPlace = document.getElementById('wordListPlace');
const wordList = document.getElementById('wordList');
const searchText = document.getElementById('searchText');
wordListPlace.style.visibility = 'hidden';
searchBox.focus();
totalWords.innerHTML = "Total number of Words: " + localStorage.length;
for (let i = 0; i < localStorage.length; i++) {
    let words = document.createElement('li');
    words.className = 'list-group-item ';
    words.innerText = localStorage.key(i);
    words.innerText = words.innerText + " = " + localStorage.getItem(words.innerText);
    words.style.fontSize = 'large';
    wordList.appendChild(words);
    settingButtons(words, localStorage.key(i));
}

// Adding an event to the searchButton + fixing the error of not typing something
searchButton.addEventListener('click', firstEvent);
function firstEvent() {
    if (searchBox.value !== "") {
        searchBox.value = searchBox.value[0].toUpperCase() + searchBox.value.substring(1);
        if (localStorage.getItem(searchBox.value) === null) {
            nextPage();
        } else {
            searchText.innerText = "Great! Word found";
            searchText.style.color = 'green';
            showWord(searchBox.value);
        }
    } else {
        document.getElementById('searchText').innerText = "Insert a word!";
        document.getElementById('searchText').style.color = 'red';
    }
}


//function for showing the searched word(Not finished)
const wordFound = document.createElement('h4');
function showWord(element) {
    wordFound.innerText = searchBox.value;
    wordFound.innerText = wordFound.innerText + " = " + localStorage.getItem(searchBox.value);
    searchBoxLabel.appendChild(wordFound);
}

function nextPage() {
    searchButton.removeEventListener('click', firstEvent);
    wordFound.remove();
    wordListPlace.style.visibility = 'visible';
    //Moving the search box + search button on the right side
    searchBoxLabel.id = "newSearchLabel";
    searchBox.className = "form-control-sm";
    searchButton.className = 'btn btn-primary btn-sm';
    searchText.style.order = "1";
    searchText.style.paddingRight = "50%";
    searchText.style.margin = "0%";
    searchText.style.color = "red";
    searchText.style.fontSize = 'medium';
    searchText.innerText = "Sorry, we couldn't find your choosed word, maybe you can find it in the list below";
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
        newWord.className = 'list-group-item';
        if (addWordBox.value === "" || addWordBoxDetail.value === "") {
            addWordBox.placeholder = "Insert a word!";
            addWordBoxDetail.placeholder = "Insert an detail for the word please!";
        } else {
            addWordBox.value = addWordBox.value[0].toUpperCase() + addWordBox.value.substring(1);
            addWordBoxDetail.value = addWordBoxDetail.value[0].toUpperCase() + addWordBoxDetail.value.substring(1);
            if (localStorage.getItem(addWordBox.value) === null) {
                newWord.innerText = addWordBox.value + " = " + addWordBoxDetail.value;
                newWord.style.fontSize = 'large';
                wordList.appendChild(newWord);
                localStorage.setItem(addWordBox.value, addWordBoxDetail.value);
                totalWords.innerHTML = "Total number of Words: " + localStorage.length;
                settingButtons(newWord, addWordBox.value);
            } else {
                searchText.innerText = "The word is already defined!";
                searchText.style.color = 'red';
            }
        }
    });
    searchButton.addEventListener('click', secondEvent);
}

//Function for searching again(Not finished)
function secondEvent() {
    if (searchBox.value === "") {
        searchBox.placeholder = "Insert a word first!";
    }
    else {
        searchBox.value = searchBox.value[0].toUpperCase() + searchBox.value.substring(1);
        if (localStorage.getItem(searchBox.value) !== null) {
            searchText.innerText = searchBox.value + " = " + localStorage.getItem(searchBox.value);
            searchText.style.color = "black";
            searchText.style.paddingRight = "35%";
            searchText.style.fontSize = "large";

        }
    }

}

function settingButtons(appender, wordSetting) {
    let editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.value = "edit";
    editButton.className = 'btn btn-outline-secondary';
    editButton.id = "editButton";
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = "delete";
    deleteButton.className = 'btn btn-outline-secondary';
    deleteButton.id = "deleteButton";
    appender.appendChild(editButton);
    appender.appendChild(deleteButton);
    editButton.addEventListener('click', () => {
        searchText.innerText = "You can now edit the selected word definition!";
        searchText.style.color = 'black';
        searchText.style.fontSize = 'large';
        wordListPlace.style.display = 'none';
        document.getElementById('addLabel').style.display = 'none';
        let editBox = document.createElement('input');
        editBox.type = "text";
        editBox.placeholder = 'New Definition';
        editBox.className = 'form-control';
        let editBoxSubmit = document.createElement('button');
        editBoxSubmit.innerText = "Submit Edit";
        editBoxSubmit.className = "btn btn-outline-secondary";
        editBoxSubmit.style.backgroundColor = 'white';
        let editedWord = document.createElement('span');
        editedWord.innerText = wordSetting;
        editedWord.className = 'input-group-text';
        document.getElementById('editPlace').appendChild(editedWord);
        document.getElementById("editPlace").appendChild(editBox);
        document.getElementById('editPlace').appendChild(editBoxSubmit);
        editBoxSubmit.addEventListener('click', () => {
            freshWord(editBox.value, wordSetting);
        });
    });
    deleteButton.addEventListener('click', () => {
        appender.remove();
        localStorage.removeItem(wordSetting);
    })
}

function freshWord(valoareNoua, Cuvant) {
    if (valoareNoua === "") {
        searchText.innerText = "Please insert a new definition!";
        searchText.style.color = 'red';
        searchText.style.fontSize = 'large';
    } else {
        valoareNoua = valoareNoua[0].toUpperCase() + valoareNoua.substring(1);
        localStorage.setItem(Cuvant, valoareNoua);
        returnToTheList();
    };
}


//TO DO:
     
    //Sa fac partea de return la pagina cu lista de cuvinte
/* function returnToTheList() {
    
} */

    //Sa mai scap de functii interioare si sa le fac externe
    //Sa il retusez
    //Sa il incarc si sa ma filmez
    
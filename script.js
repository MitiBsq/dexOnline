//Declaring the global variables
const totalWords = document.getElementById('totalWords');
const searchBoxLabel = document.getElementById('searchBoxLabel');
const searchBox = document.getElementById('searchBox');
searchBox.focus();
const searchButton = document.getElementById('searchButton');
const wordListPlace = document.getElementById('wordListPlace');
wordListPlace.style.visibility = 'hidden';
const wordList = document.getElementById('wordList');
const searchText = document.getElementById('searchText');
//Showing the total number of words that are currently registered on the page
if (localStorage.length === 0) {
    totalWords.innerHTML = "There are no current registered words on this dictionary"
} else {
    totalWords.innerHTML = "Total number of Words: " + localStorage.length;
}

// Adding an event to the searchButton + fixing the error of not typing something
searchButton.addEventListener('click', firstEvent);
function firstEvent() {
    if (searchBox.value !== "") {
        //Makes the first letter of the word an uppercase
        searchBox.value = searchBox.value[0].toUpperCase() + searchBox.value.substring(1);
        if (localStorage.getItem(searchBox.value) === null) {
            generateList();
            nextPage();
        } else {
            searchText.innerText = "Great! Word found";
            searchText.style.color = 'green';
            showWord();
        }
    } else {
        document.getElementById('searchText').innerText = "Insert a word!";
        document.getElementById('searchText').style.color = 'red';
    }
}

//function for showing the searched word
const wordFound = document.createElement('h4');
function showWord() {
    wordFound.innerText = searchBox.value;
    wordFound.innerText = wordFound.innerText + " = " + localStorage.getItem(searchBox.value);
    searchBoxLabel.appendChild(wordFound);
}

//Generating the list and it's registered words
function generateList() {
    for (let i = 0; i < localStorage.length; i++) {
        let words = document.createElement('li');
        words.className = 'list-group-item ';
        words.innerText = localStorage.key(i);
        words.id = words.innerText;
        words.innerText = words.innerText + " = " + localStorage.getItem(words.innerText);
        words.style.fontSize = 'large';
        wordList.appendChild(words);
        settingsButtons(localStorage.key(i));
    }
}

//Function for showing the next interface of the page
function nextPage() {
    wordListPlace.style.visibility = 'visible';
    //Removing some features from the latest action
    wordFound.remove();
    searchButton.removeEventListener('click', firstEvent);
    //Moving the search box + search button on the right side + Adding a new event for the search button
    searchBoxLabel.id = "newSearchLabel";
    searchBox.className = "form-control-sm";
    searchButton.className = 'btn btn-primary btn-sm';
    searchButton.addEventListener('click', secondSearch);
    //New text on the screen
    searchText.style.order = "1";
    searchText.style.paddingRight = "50%";
    searchText.style.margin = "0%";
    searchText.style.color = "red";
    searchText.style.fontSize = 'medium';
    searchText.innerText = "Sorry, we couldn't find your choosed word, maybe you can find it in the list below";
    //Creating a new add panel for adding new words
    const addWordButton = document.createElement('button');
    addWordButton.innerText = "Add";
    addWordButton.className = "btn btn-outline-dark";
    document.getElementById('addLabel').appendChild(addWordButton);
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
    addWordButton.addEventListener('click', () => {
        addWordFunction(addWordBox.value, addWordBoxDetail.value, addWordBox, addWordBoxDetail);
    });
}

//Function for adding new words + their definition to the dictionary
function addWordFunction(theWord, theDetail, wordPlaceholder, detailPlaceholder) {
    if (theWord === "" || theDetail === "") {
        wordPlaceholder.placeholder = "Insert a word!";
        detailPlaceholder.placeholder = "Insert an detail for the word please!";
    } else {
        theWord = theWord[0].toUpperCase() + theWord.substring(1);
        theDetail = theDetail[0].toUpperCase() + theDetail.substring(1);
        if (localStorage.getItem(theWord) === null) {
            let newWord = document.createElement('li');
            newWord.className = 'list-group-item';
            newWord.innerText = theWord + " = " + theDetail;
            newWord.id = theWord;
            newWord.style.fontSize = 'large';
            wordList.appendChild(newWord);
            localStorage.setItem(theWord, theDetail);
            totalWords.innerHTML = "Total number of Words: " + localStorage.length;
            settingsButtons(theWord);
            searchText.innerText = "A new word have been added!";
            searchText.style.color = 'green';
        } else {
            searchText.innerText = "The word is already defined!";
            searchText.style.color = 'red';
        }
    }
}

//Function for searching again
function secondSearch() {
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
        } else {
            searchText.style.color = "red";
            searchText.style.fontSize = 'medium';
            searchText.innerText = "Sorry, we couldn't find your choosed word, maybe you can find it in the list below";
        }
    }
}

//Function for creating the edit and delete buttons
function settingsButtons(theWordID) {
    let editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.value = "edit";
    editButton.className = 'btn btn-outline-dark';
    editButton.id = "editButton";
    let deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.value = "delete";
    deleteButton.className = 'btn btn-outline-dark';
    deleteButton.id = "deleteButton";
    document.getElementById(theWordID).appendChild(editButton);
    document.getElementById(theWordID).appendChild(deleteButton);
    editButton.addEventListener('click', () => { editWord(theWordID) });
    deleteButton.addEventListener('click', () => { deleteWord(theWordID) });
}

//Edit Button function
function editWord(theWord) {
    searchText.innerText = "You can now edit the selected word definition!";
    searchText.style.color = 'black';
    searchText.style.fontSize = 'large';
    wordListPlace.style.display = 'none';
    document.getElementById('addLabel').style.visibility = 'hidden';
    let editBox = document.createElement('input');
    editBox.type = "text";
    editBox.placeholder = 'New Definition';
    editBox.className = 'form-control';
    let editBoxSubmit = document.createElement('button');
    editBoxSubmit.innerText = "Submit Edit";
    editBoxSubmit.className = "btn btn-outline-dark";
    editBoxSubmit.style.backgroundColor = 'white';
    let editedWord = document.createElement('span');
    editedWord.innerText = theWord;
    editedWord.className = 'input-group-text';
    document.getElementById('editLabel').appendChild(editedWord);
    document.getElementById("editLabel").appendChild(editBox);
    document.getElementById('editLabel').appendChild(editBoxSubmit);
    editBox.focus();
    editBoxSubmit.addEventListener('click', () => {
        if (editBox.value === "") {
            searchText.innerText = "Please insert a new definition!";
            searchText.style.color = 'red';
            searchText.style.fontSize = 'large';
        } else {
            document.getElementById(theWord).remove();
            freshWord(editBox.value, theWord);
            editBox.remove();
            editBoxSubmit.remove();
            editedWord.remove();
            document.getElementById('addLabel').style.visibility = 'visible';
        }
    });
}

//Function for replacing the editet word with the new one
function freshWord(newDetail, theWord) {
    searchText.innerText = "The list have been updated!";
    searchText.style.color = 'green';
    searchText.style.fontSize = 'large';
    newDetail = newDetail[0].toUpperCase() + newDetail.substring(1);
    /* localStorage.removeItem(theWord); */
    localStorage.setItem(theWord, newDetail);
    let words = document.createElement('li');
    words.id = theWord;
    words.className = 'list-group-item ';
    words.innerText = theWord + " = " + newDetail;
    words.style.fontSize = 'large';
    wordList.appendChild(words);
    settingsButtons(theWord);
    wordListPlace.style.display = 'initial';
}

//Delete button function
function deleteWord(theWord) {
    searchText.innerText = 'The word "' + theWord + '" have been deleted!';
    searchText.style.color = 'black';
    document.getElementById(theWord).remove();
    localStorage.removeItem(theWord);
    totalWords.innerHTML = "Total number of Words: " + localStorage.length;
}
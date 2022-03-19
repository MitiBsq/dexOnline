//Declaring the global variables
const searchBox = document.getElementById('searchBox');
let nextPageCount = 0;
document.getElementById('wordListPlace').style.visibility = 'hidden';
searchBox.focus();

//Showing the total number of words that are currently registered on the page
function totalWordCount() {
    if (localStorage.length === 0) {
        document.getElementById('totalWords').innerHTML = "There are no current registered words on this dictionary"
    } else {
        document.getElementById('totalWords').innerHTML = "Total number of Words: " + localStorage.length;
    }
}
totalWordCount();

//Function for editing the info text
function searchTextFunction(textValue, textColor, fontSize) {
    document.getElementById('infoText').innerText = textValue;
    document.getElementById('infoText').style.color = textColor;
}

// Adding an event to the searchButton + fixing the error of not typing something
document.getElementById('searchButton').addEventListener('click', searchEvent);
function searchEvent() {
    //Double "==" , not triple "===" for fixing the error of pressing "space"; 
    if (searchBox.value == 0 || searchBox.value > 0) {
        searchBox.placeholder = "Insert a word first!";
        if (nextPageCount === 0) {
            searchTextFunction("Insert a word!", 'red');
        }
    } else {
        searchBox.value = searchBox.value[0].toUpperCase() + searchBox.value.substring(1);
        if (localStorage.getItem(searchBox.value) === null) {
            searchTextFunction("Sorry, we couldn't find your choosed word, maybe you can find it in the list below", 'red');
            document.getElementById('infoText').style.fontSize = 'large';
            if (nextPageCount === 0) {
                generateList();
                nextPage();
            }
        } else {
            if (nextPageCount === 0) {
                searchTextFunction("Great! Word found", 'green');
                showWord();
            } else {
                searchTextFunction(searchBox.value + " = " + localStorage.getItem(searchBox.value), 'black');
            }
        }
    }
}

//function for showing the searched word
const wordFound = document.createElement('h4');
function showWord() {
    wordFound.innerText = searchBox.value;
    wordFound.innerText = wordFound.innerText + " = " + localStorage.getItem(searchBox.value);
    document.getElementById('searchBoxLabel').appendChild(wordFound);
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
        document.getElementById('wordList').appendChild(words);
        settingsButtons(localStorage.key(i));
    }
}

//Function for showing the next interface of the page
function nextPage() {
    nextPageCount = 1;
    document.getElementById('wordListPlace').style.visibility = 'visible';
    wordFound.remove();
    //Moving the search box + search button on the right side 
    document.getElementById('screenBox').id = "screenBoxNew";
    document.getElementById('searchBoxLabel').style.flexDirection = 'row-reverse';
    searchBox.className = "form-control-sm";
    document.getElementById('searchButton').className = 'btn btn-primary btn-sm';
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
        addWordFunction(addWordBox, addWordBoxDetail);
    });
}

//Function for adding new words + their definition to the dictionary
function addWordFunction(elementWord, elementDetail) {
    if (elementWord.value === "" || elementDetail.value === "") {
        elementWord.placeholder = "Insert a word!";
        elementDetail.placeholder = "Insert an detail for the word please!";
    } else {
        elementWord.value = elementWord.value[0].toUpperCase() + elementWord.value.substring(1);
        elementDetail.value = elementDetail.value[0].toUpperCase() + elementDetail.value.substring(1);
        if (localStorage.getItem(elementWord.value) === null) {
            let newWord = document.createElement('li');
            newWord.className = 'list-group-item';
            newWord.innerText = elementWord.value + " = " + elementDetail.value;
            newWord.id = elementWord.value;
            newWord.style.fontSize = 'large';
            document.getElementById('wordList').appendChild(newWord);
            localStorage.setItem(elementWord.value, elementDetail.value);
            totalWordCount();
            settingsButtons(elementWord.value);
            searchTextFunction("A new word have been added!", 'green');
        } else {
            searchTextFunction("The word is already defined!", 'red');
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
    searchTextFunction("You can now edit the selected word definition!", 'black');
    document.getElementById('wordListPlace').style.display = 'none';
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
            searchTextFunction('Please insert a new definition!', 'red');
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
    searchTextFunction("The list have been updated!", 'green');
    newDetail = newDetail[0].toUpperCase() + newDetail.substring(1);
    localStorage.setItem(theWord, newDetail);
    let words = document.createElement('li');
    words.id = theWord;
    words.className = 'list-group-item ';
    words.innerText = theWord + " = " + newDetail;
    words.style.fontSize = 'large';
    document.getElementById('wordList').appendChild(words);
    settingsButtons(theWord);
    document.getElementById('wordListPlace').style.display = 'initial';
}

//Delete button function
function deleteWord(theWord) {
    searchTextFunction('The word "' + theWord + '" have been deleted!', 'black');
    document.getElementById(theWord).remove();
    localStorage.removeItem(theWord);
    totalWordCount();
}
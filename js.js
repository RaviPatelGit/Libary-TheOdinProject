let divNewBookButton = document.querySelector('.divNewBookButton');
let submitButton = document.querySelector('#submitButton');

submitButton.addEventListener('click', ()=>{
    let titleHtml = document.getElementById('title');
    let authorHtml = document.getElementById('author');
    let pagesHtml = document.getElementById('pages');
    let read = document.getElementById('read').checked;

    // titleHtml.addEventListener('input',()=>{
        
        
    // })

    if (titleHtml.validity.valid &
        authorHtml.validity.valid &
        pagesHtml.validity.valid) {
            
            let title = titleHtml.value;
            let author = authorHtml.value;
            let pages = pagesHtml.value; 
            
            book = new Book(title, author, pages, read)
            myLibrary.push(book);
            storeLocalStorage();
            displayLibrary();
        }

   
} );

let myLibrary =[];

const storeLocalStorage = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

const getLocalStorage = () => {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}


function Book(title, author, pages, readYet) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readYet = readYet; 
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    storeLocalStorage();
}



function displayLibrary() {

    cards = document.querySelectorAll ('.bookCard')
    getLocalStorage();
    for (let card of cards) {
        card.remove();
    }
    
    myLibrary.forEach((book, index)=>{
        createBookCard(book, index);
    })
}

const booksGrid = document.querySelector('.booksGrid');

function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');

    const title = document.createElement('h5');
    const author = document.createElement('h5');
    const pages = document.createElement('h5');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    title.textContent = 'Title: '+ book.title;
    author.textContent = 'Auther: '+ book.author;
    pages.textContent = 'No. of pages: '+ book.pages;
    readButton.textContent = (book.readYet ? 'I have read' : 'yet to read.');
   
    removeButton.textContent =  'remove from library';
    removeButton.id = 'removeButton';
    removeButton.addEventListener('click',() => {
        myLibrary.splice(index,1);
        storeLocalStorage();
        displayLibrary();
    })

    readButton.addEventListener('click', ()=>{
        myLibrary[index].readYet = (myLibrary[index].readYet === true) ? false : true ;
        storeLocalStorage();
        displayLibrary();
    } )

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);

    booksGrid.appendChild(bookCard);
}

if (!localStorage.getItem('library')){
    storeLocalStorage();
} else {
    getLocalStorage();
}


displayLibrary();



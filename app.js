const d = document,
  $container = d.querySelector(".booksContainer"),
  $form = d.querySelector("#formBooks"),
  $template = d.querySelector("#card-books").content;

let fragment = d.createDocumentFragment();

function Books(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

let library = [
  { title: "Satanas", author: "Mario mendoza", pages: 300, read: "read", id: "1a" },
];

const showingBooks = (l) => {
  $container.innerHTML = "";

  l.forEach((element) => {
    let card = $template.querySelector(".card");
    card.setAttribute("data-book-id", element.id);

    $template.querySelector("h5").textContent = element.title;
    $template.querySelector(".card-subtitle").textContent = element.author;
    $template.querySelector(".pages").textContent = element.pages;
    let read = $template.querySelector(".readed");
    read.textContent= element.read
    read.setAttribute("data-book-id", element.id)

    let deleteBtn = $template.querySelector(".deleteCard");
    deleteBtn.setAttribute("data-book-id", element.id);
    let $clone = document.importNode($template, true);
    fragment.appendChild($clone);
  });

  $container.appendChild(fragment);
};

function randomId() {
  let id = "";
  let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
  let upperLetters = [];

  for (let i = 0; i < letters.length; i++) {
    upperLetters.push(letters[i].toUpperCase());
  }

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  for (let i = 0; i < 2; i++) {
    id = id.concat(letters[Math.floor(Math.random() * letters.length)]);
    id = id.concat(
      upperLetters[Math.floor(Math.random() * upperLetters.length)]
    );
    id = id.concat(randomNumber);
  }

  return id;
}

const deleteCard = (id) => {
  let cardFound = library.findIndex((item) => item.id === id);
  library.splice(cardFound, 1);
  showingBooks(library);
};

const changeReadState=(id)=>{
  let cardFound = library.findIndex((item) => item.id === id);

  if(cardFound!== -1 && library[cardFound].hasOwnProperty("read")){
    let readProp=library[cardFound].read
  
    library[cardFound].read= readProp === "Read"? (readProp= "No read"): (readProp="Read");
    showingBooks(library)
  }
  else{
    console.log("El elemento que estás intentando cambiar no tiene Id o read property")
  }
 
}

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = d.querySelector("#title").value;
  let author = d.querySelector("#author").value;
  let pages = d.querySelector("#pages").value;
  let read = d.querySelector("#read").value;

  let id = randomId();

  let newBook = new Books(title, author, pages, read, id);
  library.push(newBook);
  console.log(library);

  showingBooks(library);

  $form.reset();
});

d.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteCard")) {
    let bookId = e.target.getAttribute("data-book-id");
    deleteCard(bookId);
  }

  if(e.target.classList.contains("readed")){
    let readState= e.target.getAttribute("data-book-id");
    changeReadState(readState)
}})

d.addEventListener("DOMContentLoaded", () => {
  showingBooks(library);
});

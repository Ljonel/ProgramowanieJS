class Note {
  constructor(title, text, date, time, id, color, pinned = false) {
    this.title = title;
    this.text = text;
    this.pinned = pinned;
    this.id = id;
    this.color = color;
    this.date = date;
    this.time = time;
  }
  addToHtml() {
    const unpinnedNotes = document.querySelector('.unpinnedNotes');
    const pinnedNotes = document.querySelector('.pinnedNotes');

    const newNote = document.createElement('div');
    newNote.classList.add("note");
    newNote.innerHTML = `
                    <h2>${this.title}</h2>
                    <p>${this.text}</p>
                    <div class="icons">
                        <i class="gg-trash" data-idd="${this.id}"></i>
                        <i class="gg-pin-alt" data-id="${this.id}"></i>
                        <i class="gg-edit-markup" data-id="${this.id}"></i>
                        <div class="colors">
                            <div id="ff7b2e" class="color" data-color="${this.id}"></div>
                            <div id="ccca42" class="color" data-color="${this.id}"></div>
                            <div id="a579b6" class="color" data-color="${this.id}"></div>
                            <div id="defaultColor" class="color" data-color="${this.id}"></div>

                        </div>
                    </div>
                    ${this.date} /
                    ${this.time}
        `;
    newNote.setAttribute("id", this.color);

    this.pinned ? pinnedNotes.appendChild(newNote) : unpinnedNotes.appendChild(newNote);

  }
}

class Notes {
  notes;

  constructor() {
    this.getFromLocalStorage();
    this.createNote()
    this.renderNotes();
  }
  createNote() {
    const addBtn = document.querySelector('.addBtn');
    addBtn.addEventListener('click', () => {
      this.addNote();
    })

  }
  addNote() {
    const title = document.querySelector('.title').value;
    const text = document.querySelector('.txt').value;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString()
    const defaultColor = "defaultColor";
    if (!title) {
      alert("Set title!");
      return;
    }
    if (!text) {
      alert("Set content!");
      return;
    }
    const note = new Note(title, text, date, time, new Date().getTime(), defaultColor);
    this.notes.push(note);
    this.saveInLocalStorage();
    this.renderNotes();
  }
  renderNotes() {
    //console.log(this.notes)
    document.querySelector(".unpinnedNotes").innerHTML = "";
    document.querySelector(".pinnedNotes").innerHTML = "";
    this.notes.forEach((note) => {
      note.addToHtml();
    });
    this.changeColor()
    this.initPinToggleNote();         // PRZEPINA JESLI KLIKNIETE
    this.removeNote(); 
   
  }

  saveInLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  getFromLocalStorage() {
    this.notes = [];
    if (localStorage.getItem("notes")) {
      const allNotes = JSON.parse(localStorage.getItem("notes"));
      allNotes.forEach((noteItem) => {
        const note = new Note(
          noteItem.title,
          noteItem.text,
          noteItem.date,
          noteItem.time,
          noteItem.id,
          noteItem.color,
          noteItem.pinned
        );
        this.notes.push(note);
      });
    }
  }
  initPinToggleNote() {
    document.querySelectorAll(".gg-pin-alt").forEach((pinButton) => {
      pinButton.addEventListener("click", () => {
          //console.log(pinButton.getAttribute("data-id"))                                //const array1 = [5, 12, 8, 130, 44];
          //const found = array1.find(element => element > 10);
        const n = this.notes.find((item) => item.id == pinButton.getAttribute("data-id"));
        if (n.pinned == false) {
          n.pinned = true;
        } else {
          n.pinned = false;
        }

        this.saveInLocalStorage();
        this.renderNotes();
      });
    });
  }
  removeNote() {
    document.querySelectorAll(".gg-trash").forEach((binButton) => {
      binButton.addEventListener("click", () => {
        const n = this.notes.find((item) => item.id == binButton.getAttribute("data-idd"));
        const zmienna = this.notes.indexOf(n);
        console.log(zmienna)
        this.notes.splice(zmienna, 1);
        this.saveInLocalStorage();
        this.renderNotes();
      })
    })
  }

  changeColor(){
    document.querySelectorAll(".color").forEach((markButton) => {
      markButton.addEventListener("click", () => {
        const n = this.notes.find((item) => item.id == markButton.getAttribute("data-color"));
        const name = markButton.getAttribute('id');
        n.color = name;
        console.log(n)
        this.saveInLocalStorage();
        this.renderNotes();
      })
    })
  }
}


const notka = new Notes();


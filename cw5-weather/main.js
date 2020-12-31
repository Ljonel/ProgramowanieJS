const btn = document.querySelector(".btn");
const inputValue = document.querySelector(".inputValue");
const name = document.querySelector(".name");
const desc = document.querySelector(".description");
const temp = document.querySelector(".temp");



let nameValue;
let descValue;
let tempValue;

let notes = [];

btn.addEventListener("click", function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=28c8b9104f413d31d48447e91346713d')
    .then(response => response.json())
    .then(data => {
        _name = data['name'];
        _temp = data['main']['temp'];
        _desc = data['weather'][0]['main'];
       // console.log(data);
       const note = {
        name: 'default',
        temperature: 0,
        description: 'default'
    }

      note.name = _name;
      note.temp = _temp;
      note.desc = _desc;
      notes.push(note);
      console.log(notes)
      
      const template = document.querySelector("#template");
      template.content.querySelector('.name').textContent = note.name;
      template.content.querySelector('.description').textContent = note.desc;
      template.content.querySelector('.temp').textContent = note.temp;
      const main = document.querySelector('main');
      let clone = document.importNode(template.content, true); // where true means deep copy
      main.appendChild(clone);

      
    

    })
   

    


//.catch(err => alert("Wrong city name!"))
})
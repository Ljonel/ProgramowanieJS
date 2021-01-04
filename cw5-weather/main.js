const btn = document.querySelector(".btn");
const inputValue = document.querySelector(".inputValue");
const name = document.querySelector(".name");
const desc = document.querySelector(".description");
const temp = document.querySelector(".temp");
myStorage = localStorage;
let nameValue;
let descValue;
let tempValue;

let notes = [];

inputValue.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        btn.click();
    }
})


btn.addEventListener("click", function () {
    if (inputValue.value == '') {
        alert('Insert city')
    } else {

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=metric&appid=28c8b9104f413d31d48447e91346713d')
            .then(response => response.json())
            .then(data => {
                _name = data['name'];
                _temp = data['main']['temp'];
                _desc = data['weather'][0]['main'];
                console.log(data);
                const note = {
                    name: 'default',
                    temperature: 0,
                    description: 'default'
                }

                note.name = _name;
                note.temp = Math.round(_temp);
                note.desc = _desc;
                notes.push(note);
                //   console.log(notes)
                console.log(note.desc)

                const template = document.querySelector("#template");
                // switch(note.desc){
                //     case "Clear":
                //         template.content.getElementById("bg").className = "sunny";
                //     break;
                //     case "Clouds":
                //         template.content.getElementById("bg").className = "clouds";
                //     break;
                // }
                if(note.desc == "Clear"){
                    template.content.getElementById("bg").className = "sunny";
                }
                else if(note.desc == "Clouds"){
                    template.content.getElementById("bg").className = "clouds"
                }else if(note.desc == "Snow"){
                    template.content.getElementById("bg").className = "snow"
                }if(note.desc == "Rain"){
                    template.content.getElementById("bg").className = "rain"
                }
                template.content.querySelector('.name').textContent = note.name;
                template.content.querySelector('.description').textContent = note.desc;
                template.content.querySelector('.temp').textContent = note.temp + '°C';
                const main = document.querySelector('main');
                let clone = document.importNode(template.content, true); // where true means deep copy
                main.appendChild(clone);
            })
    }
})


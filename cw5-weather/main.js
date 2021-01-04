const btn = document.querySelector(".btn");
const inputValue = document.querySelector(".inputValue");
const name = document.querySelector(".name");
const desc = document.querySelector(".description");
const temp = document.querySelector(".temp");

let notes = [];


inputValue.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        btn.click();
    }
})

btn.addEventListener("click", function () {
    if (inputValue.value === '') {
        alert('Insert city')
    } else {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=metric&appid=28c8b9104f413d31d48447e91346713d')
            .then(response => response.json())
            .then(data => {
                const note = {
                    name: data['name'],
                    temperature: data['main']['temp'],
                    description: data['weather'][0]['main']
                }
               
               const items = JSON.parse(localStorage.getItem("weather-el")) || [];
               const newNotes = [...items,note];
               localStorage.setItem("weather-el", JSON.stringify(newNotes))
               showNotes();
                //console.log(JSON.parse(localStorage.getItem("weather-el")))

            })
    }
})


function showNotes(el){
        const template = document.querySelector("#template");
        if(el.desc == "Clear"){
            template.content.getElementById("bg").className = "sunny";
        }
        else if(el.desc  == "Clouds"){
            template.content.getElementById("bg").className = "clouds"
        }else if(el.desc  == "Snow"){
            template.content.getElementById("bg").className = "snow"
        }if(el.desc  == "Rain"){
            template.content.getElementById("bg").className = "rain"
        }
        template.content.querySelector('.name').textContent = el.name;
        template.content.querySelector('.description').textContent = el.desc;
        template.content.querySelector('.temp').textContent = el.temp + '°C';
        const main = document.querySelector('main');
        let clone = document.importNode(template.content, true); // where true means deep copy
        main.appendChild(clone);
}



// const template = document.querySelector("#template");
// if(note.desc == "Clear"){
//     template.content.getElementById("bg").className = "sunny";
// }
// else if(note.desc == "Clouds"){
//     template.content.getElementById("bg").className = "clouds"
// }else if(note.desc == "Snow"){
//     template.content.getElementById("bg").className = "snow"
// }if(note.desc == "Rain"){
//     template.content.getElementById("bg").className = "rain"
// }
// template.content.querySelector('.name').textContent = note.name;
// template.content.querySelector('.description').textContent = note.desc;
// template.content.querySelector('.temp').textContent = note.temp + '°C';
// const main = document.querySelector('main');
// let clone = document.importNode(template.content, true); // where true means deep copy
// main.appendChild(clone);
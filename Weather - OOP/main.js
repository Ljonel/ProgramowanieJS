class Card {
    constructor(city, description, temperature, barometr, photo, id, color, time = new Date().toLocaleTimeString()) {
        this.city = city;
        this.description = description;
        this.temperature = temperature;
        this.barometr = barometr
        this.photo = photo;
        this.id = id;
        this.color = color;
        this.time = time;
    }

    addCard() {
        const container = document.querySelector(".card-wrapper");
        const card = document.createElement("div");

        card.classList.add("card");
        card.classList.add(this.color);
        card.innerHTML = `
            <div class="card-content-wrapper">
                <button data-id="${this.id}" class="removeBtn">X</button>
                <h1>${this.city}</h1>
                <p><i class="wi wi-day-sunny"></i>${this.description}</p>
                <p><i class="wi wi-thermometer-exterior"></i>${this.temperature}°</p>
                <p><i class="wi wi-barometer"></i>${this.barometr} hPa</p>
                ${this.time}
            </div>
            <img src="img/${this.photo}.png" alt="weather-photo">
        
        `;
        container.appendChild(card);
    }
}

class Cards {
    cards = [];

    constructor() {
        this.getFromLocalStorage();
        this.createCards();
        this.renderCards();
    }

    createCards() {
        const btn = document.querySelector(".addButton");
        const input = document.querySelector(".inputValue");

        input.addEventListener("keyup", (e) => {
            if (e.keyCode == 13) {
                btn.click();
                input.value = "";
            }
        });
        btn.addEventListener("click", () => {
            const o = this.cards.find((item) => item.city.toLowerCase() == input.value.toLowerCase());
            if (o) {
                console.log("Miasto istnieje")
            } else {
                this.addCards();
            }
        })

    }

    addCards() {
        const inputValue = document.querySelector(".inputValue");

        fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=28c8b9104f413d31d48447e91346713d`
            )
            .then((response) => response.json())
            .then((data) => {
                const city = data.name;
                const temperature = data.main.temp;
                const description = data.weather[0].main;
                const barometr = data.main.pressure;
                const photo = data.weather[0].main;
                const color = photo.toLowerCase();

                const newCard = new Card(city, description, temperature, barometr, photo, new Date().getTime(), color)
                this.cards.push(newCard);
                this.saveInLocalStorage();
                this.renderCards();
            });

    }

    renderCards() {
        document.querySelector(".card-wrapper").innerHTML = "";
        const inputValue = document.querySelector(".inputValue").value;

        this.cards.forEach((card) => {
            card.addCard();
        });
        this.removeCard();
    }

    saveInLocalStorage() {
        localStorage.setItem("cards", JSON.stringify(this.cards));
    }
    getFromLocalStorage() {
        const allCards = JSON.parse(localStorage.getItem("cards"));
        if (localStorage.getItem("cards")) {

            allCards.forEach((cardItem) => {
                const card = new Card(
                    cardItem.city,
                    cardItem.description,
                    cardItem.temperature,
                    cardItem.barometr,
                    cardItem.photo,
                    cardItem.id,
                    cardItem.color
                );
                this.cards.push(card);
            })

        }
    }
    removeCard() {
        document.querySelectorAll(".removeBtn").forEach((removeBtn) => {
            removeBtn.addEventListener("click", () => {
                const r = this.cards.find((item) => item.id == removeBtn.getAttribute("data-id"));
                const index = this.cards.indexOf(r);

                console.log(index);

                this.cards.splice(index, 1);
                this.saveInLocalStorage();
                this.renderCards();
            })
        })
    }

}
const card = new Cards();

setInterval(() => {
    location.reload()
}, 60 * 1000)
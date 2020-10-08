let gallery = document.querySelectorAll(".gallery img");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

const lightbox = document.querySelector('.lightbox');

const galleryCount = gallery.length;

for(let i=0; i<gallery.length; i++){
    const img = gallery[i];
    img.addEventListener('click', showLightbox);
}

function showLightbox(e){
    console.log(e.target)
    const img = document.querySelector(".lightbox img");
    const imgUrl = e.target.src;
    img.src = imgUrl;
    lightbox.classList.add("visible");
}

lightbox.addEventListener("click", function(){
    this.classList.remove("visible");
})

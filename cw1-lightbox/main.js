let gallery = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

gallery.forEach(element => {
    element.addEventListener('click', function(){
        lightboxImg.src = element.src;
        lightbox.classList.add('visible');

        next.addEventListener('click', () =>{
            if(element.nextElementSibling != null){
                lightboxImg.src = element.nextElementSibling.src;
                element = element.nextElementSibling;
            }
        })

        prev.addEventListener('click', () =>{
            if(element.previousElementSibling != null){
                lightboxImg.src = element.previousElementSibling.src;
                element = element.previousElementSibling;
            }
        })
    })
});


function hideLightbox(e){
    if(e.target !== e.currentTarget) return;
    lightbox.classList.remove('visible');
}

lightbox.addEventListener('click', hideLightbox)

let gallery = document.querySelectorAll('.gallery img');


gallery.forEach((element) => {
    element.addEventListener('click', function () {
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox img');
        const prev = document.querySelector('.prev')
        const next = document.querySelector('.next')
        lightboxImg.src = element.src;
        lightbox.classList.add('visible');

        next.addEventListener('click', () => {
            if (element.nextElementSibling != null) {
                lightboxImg.src = element.nextElementSibling.src;
                element = element.nextElementSibling;
            } else {
                console.log("koniec zdjec")
            }
        })
        prev.addEventListener('click', () => {
            if (element.previousElementSibling != null) {
                lightboxImg.src = element.previousElementSibling.src;
                element = element.previousElementSibling;
            } else {
                console.log("koniec zdjec")
            }
        })


        lightbox.addEventListener('click', function (e) {
            if (e.target !== e.currentTarget) {
                return
            }
            lightbox.classList.remove('visible');
        })
    })




});
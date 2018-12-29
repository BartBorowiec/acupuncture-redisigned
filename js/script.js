function Gallery() {
    this.buttons = document.querySelectorAll('.gallery-scroll button');
    this.items = document.querySelectorAll('.gallery-scroll__item');
    this.activeItem = 0;
    this.isSliding = false;
    this.mainImage = document.querySelector('.gallery-main__image');
    this.images = document.querySelectorAll('.gallery-scroll__image');

    this.addListeners = function () {
        this.buttons.forEach(el => el.addEventListener("click", this.slide));
        this.images.forEach(el => el.addEventListener("click", this.setMain));
    }

    this.setMain = event => {
        this.mainImage.setAttribute('src', event.target.getAttribute('src'));
    }

    this.slide = event => {
        if (!this.isSliding) {
            this.isSliding = true;
            const currentItem = this.activeItem;
            if(event.target === this.buttons[1] || event.target.parentElement === this.buttons[1]) {
                this.activeItem === this.items.length - 1 ? this.activeItem = 0 : this.activeItem++;
                //active slide out left
                this.items[currentItem].classList.add('active-left');
                //next slide in left
                this.items[this.activeItem].classList.add('item-next', 'item-left');
                //remove classes
                setTimeout(() => {
                    this.items[currentItem].classList.remove('active-left', 'active');
                    this.items[this.activeItem].classList.remove('item-next', 'item-left');
                    //set new active item
                    this.items[this.activeItem].classList.add('active');
                    this.isSliding = false;
                }, 1000)
            } else {
                this.activeItem === 0 ? this.activeItem = this.items.length - 1 : this.activeItem--;
                //active slide out right
                this.items[currentItem].classList.add('active-right');
                //prev slide in right
                this.items[this.activeItem].classList.add('item-prev', 'item-right');
                //remove classes
                setTimeout(() => {
                    this.items[currentItem].classList.remove('active-right', 'active');
                    this.items[this.activeItem].classList.remove('item-prev', 'item-right');
                    //set new active item
                    this.items[this.activeItem].classList.add('active');
                    this.isSliding = false;
                }, 1000)
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    updateNavbar();
    const toggler = document.getElementById('toggler');
    const links = document.querySelector('.navbar-links');
    toggler.addEventListener("click", function () {
        links.classList.toggle('visible');
    });

    const gallery = new Gallery();
    gallery.addListeners();

    document.addEventListener("scroll", function(){
        updateNavbar();
    });
});

function updateNavbar() {
    if (window.scrollY >= 50) {
        document.querySelector(".navbar").classList.add('scrolled');
    } else {
        document.querySelector(".navbar").classList.remove('scrolled');
    }
}
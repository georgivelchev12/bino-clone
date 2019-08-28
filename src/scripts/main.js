let controller = {
    init: () => {
        controller.scrollSpy();
        controller.headerSlider();
        controller.navbarToggler();
    },
    scrollSpy: () => {
        let sections = {};

        document.querySelectorAll(".section").forEach((e) => {
            sections[e.id] = e.offsetTop;
        });

        window.onscroll = () => {
            let scrollPosition = document.documentElement.scrollTop
                || document.body.scrollTop;

            for (let elem in sections) {
                if (sections[elem] <= scrollPosition) {
                    document.querySelector('.active').classList.remove('active');
                    document.querySelector('a[href*=' + elem + ']').classList.add('active');
                }

                let anchorBtnOffset = document.getElementsByClassName('anchorBtn')[0].offsetTop - 150;

                if (anchorBtnOffset > scrollPosition) {

                    document.getElementById("navbar").style.background = '';
                }
                else {

                    document.getElementById("navbar").style.background = 'rgba(0, 0, 0, 0.3)'
                }
            }
        }
    },
    headerSlider: () => {
        let carouselSlide = document.querySelector('.slider');
        let sliderItems = document.querySelectorAll('.testimonial-item');

        let prevBtn = document.querySelector('#prevBtn')
        let nextBtn = document.querySelector('#nextBtn')

        let counter = 1;
        let size;

        let transformCarousel = () => {
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        let sizeOfCarousel = () => {
            size = carouselSlide.clientWidth;
            transformCarousel()
        }

        sizeOfCarousel();
        transformCarousel();
        let automaticallySlide = () => {
            if (counter >= sliderItems.length - 1) {
                return;
            }
            carouselSlide.style.transition = 'transform 0.4s ease-in-out';
            counter++;
            transformCarousel();
        }

        nextBtn.addEventListener('click', () => {
            if (counter >= sliderItems.length - 1) {
                return;
            }
            carouselSlide.style.transition = 'transform 0.4s ease-in-out';
            counter++;
            transformCarousel();
        })
        prevBtn.addEventListener('click', () => {
            if (counter <= 0) {
                return;
            }
            carouselSlide.style.transition = 'transform 0.4s ease-in-out';
            counter--;
            transformCarousel()
        })
        carouselSlide.addEventListener('transitionend', () => {
            if (sliderItems[counter].id == 'lastClone') {
                carouselSlide.style.transition = 'none';
                counter = sliderItems.length - 2;
                transformCarousel()
            }
            if (sliderItems[counter].id == 'firstClone') {
                carouselSlide.style.transition = 'none';
                counter = sliderItems.length - counter;
                transformCarousel()
            }
        })
        window.addEventListener("resize", sizeOfCarousel);
        window.addEventListener("load", sizeOfCarousel);
        setInterval(automaticallySlide, 9000);

    },
    navbarToggler: () => {
        if(window.innerWidth <= 945){
            let navbarAttrChanging = document.querySelectorAll(".nav-a");
            let toggleNav = (percantage) => {
                document.getElementById("mySidebar").style.width = percantage;
            }
            document.getElementsByClassName('openbtn')[0].addEventListener('click', () => {
                document.body.style.overflowY = "hidden";
                toggleNav("40%")
            })
            document.getElementsByClassName('closebtn')[0].addEventListener('click', () => {
                document.body.style.overflowY = "visible";
                toggleNav("0")
            })
            navbarAttrChanging.forEach(e => {
                e.addEventListener('click', () => {
                    document.body.style.overflowY = "visible";
                    toggleNav("0")
                });
            })
    
        }

        window.addEventListener("resize", controller.navbarToggler);
        window.addEventListener("scroll", controller.navbarToggler);
        window.addEventListener("load", controller.navbarToggler);
    }

}
window.onload = () => {
    controller.init();
}



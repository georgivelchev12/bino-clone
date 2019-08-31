
let controller = {
    init: () => {
        controller.scrollSpy();
        controller.headerSlider();
        controller.navbarToggler();
        controller.filterImg();

    },
    scrollSpy: () => {
        let sections = {};

        document.querySelectorAll(".section").forEach((e) => {
            sections[e.id] = e.offsetTop;
        });
        let changeNavBackground = () => {
            let scrollPosition = document.documentElement.scrollTop
                || document.body.scrollTop;

            for (let elem in sections) {
                if (sections[elem] <= scrollPosition) {
                    document.querySelector('.active').classList.remove('active');
                    document.querySelector('a[href*=' + elem + ']').classList.add('active');
                }

                let anchorBtnOffset = document.getElementsByClassName('anchorBtn')[0].offsetTop;

                if (anchorBtnOffset > scrollPosition) {

                    document.getElementById("navbar").style.background = '';
                }
                else {

                    document.getElementById("navbar").style.background = 'rgba(0, 0, 0, 0.3)'
                }
            }
        }
        changeNavBackground();
        window.addEventListener('scroll', changeNavBackground)
        window.addEventListener('load', controller.scrollSpy)
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


    },
    navbarToggler: () => {
        if (window.innerWidth <= 945) {
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
    },
    filterImg: () => {
        let $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });

        let filterFns = {};

        // bind filter button click
        $('#filters').on('click', '.button',(e) => {
            let filterValue = $(e.currentTarget).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({ filter: filterValue });
        });

        // change is-checked class on buttons
        $('.button-group').each((i, buttonGroup)  => {
            let $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', '.button', (e) => {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(e.currentTarget).addClass('is-checked');
            });
        });

    }

}
window.onload = () => {
    controller.init();
}



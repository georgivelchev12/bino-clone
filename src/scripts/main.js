
let controller = {
    init: () => {
        controller.scrollSpy();
        controller.slider();
        controller.navbarToggler();
        controller.filterImg();
        controller.wowAnimations();
        controller.statCounter();

    },
    scrollSpy: () => {
        let sections = {};

        document.querySelectorAll(".section").forEach((e) => {
            sections[e.id] = e.offsetTop - 50;
        });

        let changeNavBackground = () => {
            let scrollPosition = document.documentElement.scrollTop
                || document.body.scrollTop;

            for (let elem in sections) {
                if (sections[elem] <= scrollPosition) {
                    document.querySelector('.active1').classList.remove('active1');
                    document.querySelector('a[href*=' + elem + ']').classList.add('active1');
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
        window.addEventListener('resize', controller.scrollSpy)
        window.addEventListener('scroll', controller.scrollSpy)
    },
    slider: () => {
        let swiper1 = new Swiper(".slider-1", {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
        let swiper2 = new Swiper(".slider-2", {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            initialSlide: 1
        })
        let updateFunct = () => {
            swiper1.update();
            swiper2.update();
        }
        window.addEventListener('resize', updateFunct)
        window.addEventListener('load', updateFunct)
        window.addEventListener('orientationchange', updateFunct)
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
        $('#filters').on('click', '.button', (e) => {
            let filterValue = $(e.currentTarget).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({ filter: filterValue });
        });

        // change is-checked class on buttons
        $('.button-group').each((i, buttonGroup) => {
            let $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', '.button', (e) => {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(e.currentTarget).addClass('is-checked');
            });
        });

    },

    statCounter: () => {
        jQuery(document).ready(function($) {
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        });
    },
    wowAnimations: () => {
        // new WOW().init();
    }

}


window.onload = () => {

    controller.init();
}



$(document).ready(function () {
    // плавный скролл
    // const lenis = new Lenis({

    // });
    // function raf(time) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // открытие меню
    $('.menu_btn').on('click', function () {
        $('html').toggleClass('locked')
        $('.menu_btn').toggleClass('active')
        $('.big_menu').toggleClass('show')

    })


    // swiperPopups
    let sliderPopups = $('.slider_popups');
    if (sliderPopups.length) {
        const swiperPopups = new Swiper('.slider_popups', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            watchSlidesProgress: true,
            mousewheelControl: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            effect: 'slide',
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            // on: {
            //     init() {
            //         this.el.addEventListener('mouseenter', () => {
            //             this.autoplay.stop();

            //         });

            //         this.el.addEventListener('mouseleave', () => {
            //             this.autoplay.start();

            //         });
            //     }
            // },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,

            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                1201: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },

        });

        // Функция для управления автоплеем в зависимости от видимости
        function handleVisibility(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    swiperPopups.autoplay.start();
                } else {
                    swiperPopups.autoplay.stop();
                }
            });
        }

        const observer = new IntersectionObserver(handleVisibility, {
            root: null,
            threshold: 0.2
        });
        observer.observe(document.querySelector('.slider_popups'));
    }
    // swiperTeam
    const swiperTeam = new Swiper(".slider_team", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: 'slide',
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1201: {
                slidesPerView: 3,
                spaceBetween: 20,
            },

        },
    });

    //фиксировать шапку
    let prevScroll = $(window).scrollTop();

    const header = document.querySelector('.header_block_fix');
    window.addEventListener('scroll', e => {
        if (window.scrollY > 300) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }

        let currentScroll;
        currentScroll = $(window).scrollTop()
        if (currentScroll < prevScroll && header.classList.contains('fixed')) {
            header.classList.add('fix-on-scroll');
        }
        if (currentScroll > prevScroll && header.classList.contains('fixed') || window.scrollY < 300) {
            header.classList.remove('fix-on-scroll');
        }
        prevScroll = currentScroll
    })

    // function headerFixed(e) {
    //     let header = $('.header_block_fix');

    //     if ($(this).scrollTop() > 300) {
    //         header.addClass('fixed');
    //     } else {
    //         header.removeClass('fixed');
    //     }

    // }
    // headerFixed();

    // $(window).scroll(function (e) {
    //     headerFixed();
    // });

    // высота секции не менше чем высота ее контента
    let staticMap = $('.map_section');
    if (staticMap) {
        let staticMapHeight = staticMap.outerHeight();
        staticMap.css('min-height', staticMapHeight)
        staticMap.css('height', '100dvh')
    }

    // высота svg равна ширине картинки под ней
    let chooseImg = $('.choose_block_img');
    if (chooseImg.length) {
        function setElementWidth(targetSelector) {
            let chooseImg = document.querySelector('.choose_block_img');
            let targetElement = document.querySelector(targetSelector);

            if (chooseImg && targetElement) {
                let updateWidth = () => {
                    targetElement.style.width = chooseImg.offsetWidth + 'px';
                };

                // Устанавливаем ширину при загрузке
                chooseImg.addEventListener('load', updateWidth);

                // Если изображение уже загружено
                if (chooseImg.complete) {
                    updateWidth();
                }
            }
        }

        setElementWidth('.choose_block_svg');
        setElementWidth('.imgs_list');

        window.addEventListener('resize', () => {
            setElementWidth('.choose_block_svg');
            setElementWidth('.imgs_list');
        });

    }

    //галерея
    $('[data-fancybox]').fancybox({
        arrows: false,
        infobar: false,
        buttons: false,
        loop: true,
        animationEffect: "fade",
        // animationDuration: 1000,
        transitionDuration: 1000,
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-stage"><button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999998 22.631L22.1306 1.5M0.999998 1.50061L22.1306 22.6313" stroke="#63483F"/></svg></button><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-navigation">{{arrows}}</div></div></div></div>',
        btnTpl: {
            arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg><use xlink:href="imgs/sprite.symbol.svg#arrow_right"></use></svg></button>',
            arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg><use xlink:href="imgs/sprite.symbol.svg#arrow_left"></use></svg></button>',
        },
    });

    // 
    $('.choose_courtyard').on('click', function () {
        $('.choose_courtyard_modal').toggleClass('show');
        $(this).parent().toggleClass('active');
        $('html').toggleClass('locked');

    })

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.choose_courtyard, .choose_courtyard_modal').length) {
            $('.choose_courtyard_modal').removeClass('show')
            $('.choose_courtyard_wrapper').removeClass('active');
            $('html').removeClass('locked');

        }
    });
    $('.choose_courtyard_modal .close').on('click', function (e) {
        $('.choose_courtyard_modal').removeClass('show')
        $('.choose_courtyard_wrapper').removeClass('active');
        $('html').removeClass('locked');



    });


    $('.map_filters_title').on('click', function (e) {
        $(this).next().toggleClass('show');
        $(this).toggleClass('active');
    });


    let offset
    if ($(window).width() > 576) {
        offset = 100;
    } else {
        offset = 0;
    }
    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 700,
        offset: offset,
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const swipers = {};

    document.querySelectorAll(".slider_gallery").forEach((el, index) => {
        swipers[index] = new Swiper(el, {
            slidesPerView: "auto",
            spaceBetween: 10,
            watchSlidesProgress: true,
            mousewheelControl: true,
            watchOverflow: true,
            watchSlidesVisibility: true,
            effect: "slide",
            speed: 1000,
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: el.closest(".tabs_content_item").querySelector(".swiper-pagination"),
            },
            navigation: {
                nextEl: el.closest(".tabs_content_item").querySelector(".swiper-button-next"),
                prevEl: el.closest(".tabs_content_item").querySelector(".swiper-button-prev"),
            },
            breakpoints: {
                1201: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    });

    // Табы
    document.querySelectorAll(".tabs_block").forEach((tabsBlock) => {
        const tabsNavItems = tabsBlock.querySelectorAll(".tabs_nav_item");
        const tabsContentItems = tabsBlock.querySelectorAll(".tabs_content .tabs_content_item");

        tabsNavItems.forEach((tab) => {
            tab.addEventListener("click", function (e) {
                e.preventDefault();

                // Скрываем все табы внутри текущего блока
                tabsContentItems.forEach((item) => (item.style.display = "none"));

                // Показываем нужный таб
                const targetId = this.getAttribute("href");
                const targetTab = document.querySelector(targetId);
                if (targetTab) {
                    targetTab.style.display = "block";
                }

                // Удаляем и добавляем класс активности внутри текущего блока
                tabsNavItems.forEach((nav) => nav.classList.remove("active"));
                this.classList.add("active");

                // Обновляем Swiper в текущем активном табе
                const swiperInstance = targetTab.querySelector(".slider_gallery");
                if (swiperInstance && swiperInstance.swiper) {
                    swiperInstance.swiper.update();
                }
            });
        });

        // Активируем первый таб внутри текущего блока
        if (tabsNavItems.length > 0) {
            tabsNavItems[0].click();
        }
    });
    document.querySelectorAll('.menu .item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imgSrc = item.dataset.img;
            const bigMenuImg = document.querySelector('.big_menu_img img');
            if (imgSrc) {
                bigMenuImg.src = imgSrc;
            }
        });
    });

    // const images = new Set();
    // document.querySelectorAll('.menu .item').forEach(item => {
    //     if (item.dataset.img) {
    //         const img = new Image();
    //         img.src = item.dataset.img;
    //         images.add(img);
    //     }
    // });

    // const bigMenuImg = document.querySelector('.big_menu_img img');

    // document.querySelectorAll('.menu .item').forEach(item => {
    //     item.addEventListener('mouseenter', () => {
    //         const imgSrc = item.dataset.img;
    //         if (imgSrc && bigMenuImg.src !== imgSrc) {
    //             const newImg = new Image();
    //             newImg.src = imgSrc;
    //             newImg.classList.add('active');

    //             newImg.onload = () => {
    //                 bigMenuImg.classList.remove('active'); // Скрываем старую
    //                 bigMenuImg.src = imgSrc; // Меняем источник
    //                 setTimeout(() => bigMenuImg.classList.add('active'), 10); // Показываем новую
    //             };
    //         }
    //     });
    // });



    // document.querySelectorAll('.menu .item').forEach(item => {
    //     item.addEventListener('mouseenter', () => {
    //         const imgSrc = item.dataset.img;
    //         const bigMenuImg = document.querySelector('.big_menu_img img');
    //         if (imgSrc) {
    //             bigMenuImg.src = imgSrc;
    //         }
    //     });
    // });

    // открытие модаки 
    // нужно только поменять значени в data-modal и data-open-modal
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    let getScrollWidth = () => window.innerWidth - document.documentElement.offsetWidth;
    let browserScrollWidth = getScrollWidth();

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('[data-open-modal]')) {
            e.preventDefault();
            const targetId = target.closest('[data-open-modal]').dataset.openModal;
            const selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
            selectedModal.classList.add('show');
            html.classList.add('locked');
            if (getScrollWidth() == 0) {
                body.style.paddingRight = `${browserScrollWidth}px`;
            }
        }
        if (target.closest('[data-modal-close]')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            document.querySelector('.modal.show').classList.remove('show');
            html.classList.remove('locked');
            body.style.paddingRight = ``;
        }
        if (target.closest('.modal') && !target.closest('.modal-content')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            document.querySelector('.modal.show').classList.remove('show');
            html.classList.remove('locked');
            body.style.paddingRight = ``;
        }
    });


    // табы в модалке
    document.addEventListener("click", function (e) {
        const target = e.target.closest('[data-open-modal]');

        if (target) {
            const modalId = target.dataset.openModal;
            const tabId = target.dataset.tab;
            const selectedModal = document.querySelector(`[data-modal="${modalId}"]`);

            if (selectedModal && tabId) {
                setTimeout(() => activateTab(selectedModal, tabId), 0);
            }
        }
    });

    function activateTab(modal, tabId) {
        const tabsBlock = modal.querySelector('.tabs_block');
        if (!tabsBlock) return;

        const tabsNavItems = tabsBlock.querySelectorAll('.tabs_nav_item');
        const tabsContentItems = tabsBlock.querySelectorAll('.tabs_content .tabs_content_item');


        tabsContentItems.forEach(item => item.style.display = "none");


        const targetTab = modal.querySelector(`#${tabId}`);
        if (targetTab) {
            targetTab.style.display = "block";
        }


        tabsNavItems.forEach(tab => tab.classList.remove("active"));
        const activeNavItem = modal.querySelector(`.tabs_nav_item[href="#${tabId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add("active");
        }
    }

    // Затемняем img
    const chooseSvg = document.querySelector(".choose_block_svg");
    if (chooseSvg) {
        const choosePaths = chooseSvg.querySelectorAll("path");
        const choosePathsImgList = document.querySelector(".imgs_list");

        choosePaths.forEach((path) => {
            path.addEventListener("mouseenter", () => {
                // Затемняем список картинок
                choosePathsImgList.classList.add("dimmed");


                const pathId = path.id;
                const img = document.querySelector(`.imgs_list img[data-id='${pathId}']`);

                // Затемняем все картинки, кроме найденной
                document.querySelectorAll(".imgs_list img").forEach((p) => {
                    if (p !== img) p.classList.add("dimmed");
                });
            });

            path.addEventListener("mouseleave", () => {
                // Убираем затемнение со всех картинок
                choosePathsImgList.classList.remove("dimmed");
                document.querySelectorAll(".imgs_list img").forEach((p) => p.classList.remove("dimmed"));
            });
        });
    }

    // всплывающие подсказки
    let placement
    if ($(window).width() > 992) {
        placement = 'right-start';
    } else {
        placement = 'bottom';
    }
    tippy('.tippy_btn', {
        // trigger: 'click',
        content(reference) {
            const id = reference.getAttribute('data-template');
            const template = document.getElementById(id);
            return template.innerHTML;
        },
        allowHTML: true,
        arrow: false,
        theme: 'creame',
        animation: 'scale',
        placement: placement,
        followCursor: true,
        maxWidth: '462px',
    });

    // tippy('.choose_courtyard', {
    //     trigger: 'click',
    //     content(reference) {
    //         const id = reference.getAttribute('data-template');
    //         const template = document.getElementById(id);
    //         return template.innerHTML;
    //     },
    //     allowHTML: true,
    //     arrow: false,
    //     theme: 'choose_courtyard_modal',
    //     animation: 'scale',
    //     placement: placement,
    //     maxWidth: '642px',
    // });


    gsap.to(".photo_section .bg", {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
            trigger: ".photo_section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });
    gsap.to(".text_img_section .text", {
        y: "-10%",
        ease: "none",
        scrollTrigger: {
            trigger: ".text_img_section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });
    gsap.to(".text_img_section .img", {
        y: "10%",
        ease: "none",
        scrollTrigger: {
            trigger: ".text_img_section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
        }
    });
    gsap.registerPlugin(ScrollTrigger);


});
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

        // Проверяем, открыт ли .big_menu
        if ($('.big_menu').hasClass('show')) {
            swiperMenu.params.autoplay = { delay: 500, disableOnInteraction: false };
            swiperMenu.autoplay.start();
        } else {
            swiperMenu.autoplay.stop();
            swiperMenu.params.autoplay = false;
        }
    })

    // swiperMenu
    const swiperMenu = new Swiper(".slider_menu", {
        slidesPerView: 1,
        spaceBetween: 10,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: 'fade',
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
    });
    swiperMenu.autoplay.stop();

    document.querySelectorAll(".menu .item").forEach(item => {
        item.addEventListener("mouseenter", () => {
            const imgSrc = item.dataset.img;
            if (!imgSrc) return; // Пропускаем пункты без data-img

            swiperMenu.autoplay.stop(); // Останавливаем автоплей

            const slides = document.querySelectorAll(".slider_menu .swiper-slide img");
            slides.forEach((img, index) => {
                if (img.getAttribute("src") === imgSrc) {
                    swiperMenu.slideTo(index); // Переключаем слайд
                }
            });
        });

        item.addEventListener("mouseleave", () => {
            swiperMenu.autoplay.start(); // Возвращаем автоплей
        });
    });

    // 
    const swiperSmallCard = new Swiper(".slider_small_card", {
        slidesPerView: 'auto',
        spaceBetween: 14,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: 'slide',
        speed: 1000,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,

        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            993: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

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

    // swiperBigImg
    const swiperBigImg = new Swiper(".slider_big_img", {
        slidesPerView: 1,
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
        pagination: {
            el: ".swiper-pagination",
            clickable: true,

        },
    });

    // swiperTeam
    const swiperTeam = new Swiper(".slider_team", {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 8,
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
                slidesPerGroup: 4,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 13,
                slidesPerGroup: 4,
            },
            1201: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 3,
            },
            577: {
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                spaceBetween: 20,
            },

        },
    });


    //фиксировать шапку
    let prevScroll = window.scrollY;
    const header = document.querySelector('.header_block_fix');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

        if (currentScroll > 300) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
            header.classList.remove('fix-on-scroll');
        }

        if ((currentScroll < prevScroll && header.classList.contains('fixed')) || isAtBottom) {
            header.classList.add('fix-on-scroll');
        }

        if (currentScroll > prevScroll && header.classList.contains('fixed') && !isAtBottom) {
            header.classList.remove('fix-on-scroll');
        }

        prevScroll = currentScroll;
    });


    // высота секции не меньше чем высота ее контента
    let staticMap = $('.static_map');
    let staticMapMap = $('#map');
    // let staticMapContent = $('.map_section .static_map_block_wrapper');
    let staticMapTitle = $('.map_section_title');

    if (staticMap.length) {
        function adjustMapHeight() {
            if ($(window).width() > 992) {
                // let staticMapHeight = staticMapContent.outerHeight();
                let staticMaptitleHeight = staticMapTitle.outerHeight();
                // staticMap.css('min-height', staticMapHeight);
                // staticMap.css('height', `calc(100svh - ${staticMaptitleHeight}px)`);
                // staticMapMap.css('min-height', staticMapHeight);
                staticMapMap.css('height', `calc(100svh - ${staticMaptitleHeight}px)`);
            }
            // else {
            //     staticMap.css('max-height', 'initial');
            //     staticMap.css('min-height', 'initial');
            //     staticMapMap.css('max-height', 'initial');
            //     staticMapMap.css('min-height', 'initial');
            // }

        }

        adjustMapHeight();

        $(window).on('resize', function () {
            adjustMapHeight();
        });
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
        setElementWidth('.choose_courtyard_wrapper');

        window.addEventListener('resize', () => {
            setElementWidth('.choose_block_svg');
            setElementWidth('.imgs_list');
            setElementWidth('.choose_courtyard_wrapper');

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


    $('.choose_courtyard').on('click', function () {
        let modalClass = $(this).data('template');
        $('.choose_courtyard_modal').removeClass('show');
        $('.' + modalClass).addClass('show');
        $('.choose_courtyard_wrapper').addClass('active');
        if ($(window).width() < 993) {
            $('html').addClass('locked');
        } else {
            $('html').removeClass('locked');
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.choose_courtyard, .choose_courtyard_modal_content').length) {
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
        offset = 200;
    } else {
        offset = 0;
    }
    AOS.init({
        easing: 'ease-in-out',
        delay: 100,
        once: true,
        duration: 400,
        offset: offset,
    });


    // let staticMapImg = $('.static_map_img');
    // if (staticMapImg.length) {
    //     function setMapImgWidth(targetSelector) {
    //         let staticMapImg = document.querySelector('.static_map .left');
    //         let targetElement = document.querySelector(targetSelector);

    //         if (staticMapImg && targetElement) {
    //             let updateWidth = () => {
    //                 targetElement.style.width = staticMapImg.offsetWidth + 'px';
    //             };

    //             // Устанавливаем ширину при загрузке
    //             staticMapImg.addEventListener('load', updateWidth);

    //             // Если изображение уже загружено
    //             if (staticMapImg.complete) {
    //                 updateWidth();
    //             }
    //         }
    //     }

    //     setMapImgWidth('.static_map_logo');

    //     window.addEventListener('resize', () => {
    //         setMapImgWidth('.static_map_logo');
    //     });

    // }

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

                if (this.classList.contains("static_map_svg_g")) {
                    console.log(this);
                    const mapTabBtn = document.querySelector('[href="#tab_map-2"]');
                    mapTabBtn && mapTabBtn.classList.add('active');

                } else {
                    this.classList.add("active");
                }

                // Обновляем Swiper в текущем активном табе
                if (targetTab) {
                    const swiperInstance = targetTab.querySelector(".slider_gallery");
                    if (swiperInstance && swiperInstance.swiper) {
                        swiperInstance.swiper.update();
                    }
                }

            });
        });

        // Активируем первый таб внутри текущего блока
        if (tabsNavItems.length > 0) {
            tabsNavItems[0].click();
        }
    });
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
        duration: [400, 200]
    });

    // document.querySelectorAll(".photo_section_anim").forEach(block => {
    //     gsap.to(block.querySelector(".bg"), {
    //         y: "-20%",
    //         ease: "none",
    //         scrollTrigger: {
    //             trigger: block,
    //             start: "top bottom",
    //             end: "bottom top",
    //             scrub: 1,
    //         }
    //     });
    // });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 993px)", () => {
        document.querySelectorAll(".text_img_big_section").forEach(block => {
            gsap.to(block.querySelector(".text"), {
                y: "-10%",
                ease: "none",
                scrollTrigger: {
                    trigger: block,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
            // gsap.to(block.querySelector(".img"), {
            //     y: "5%",
            //     ease: "none",
            //     scrollTrigger: {
            //         trigger: block,
            //         start: "top bottom",
            //         end: "bottom top",
            //         scrub: 1,
            //     }
            // });
        });

        document.querySelectorAll(".text_img").forEach(block => {
            gsap.to(block.querySelector(".text"), {
                y: "15%",
                ease: "none",
                scrollTrigger: {
                    trigger: block,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        });
        gsap.set(".static_map_svg_desktop .static_map_svg_circle", { opacity: 0 });

        gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .to(".static_map_svg_desktop .static_map_svg_circle_1", { opacity: 1, duration: 0.5 })
            .to(".static_map_svg_desktop .static_map_svg_circle_2", { opacity: 1, duration: 0.5 })
            .to(".static_map_svg_desktop .static_map_svg_circle_3", { opacity: 1, duration: 0.5 })
            .to(".static_map_svg_desktop .static_map_svg_circle", { opacity: 0, duration: 0.5 }, "+=1");

    });
    mm.add("(max-width: 992px)", () => {
        gsap.set(".static_map_svg_mobile .static_map_svg_circle", { opacity: 0 });

        gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .to(".static_map_svg_mobile .static_map_svg_circle_1", { opacity: 1, duration: 0.5 })
            .to(".static_map_svg_mobile .static_map_svg_circle_2", { opacity: 1, duration: 0.5 })
            .to(".static_map_svg_mobile .static_map_svg_circle_3", { opacity: 1, duration: 0.5 })
            .to(".static_map_svg_mobile .static_map_svg_circle", { opacity: 0, duration: 0.5 }, "+=1");
    });

    gsap.registerPlugin(ScrollTrigger);


    // маска для Телефона
    const phoneInputs = document.querySelectorAll('.form_input[name="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '+{7}(000)000-00-00'
        })
    });


});



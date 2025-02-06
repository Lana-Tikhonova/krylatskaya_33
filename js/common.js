$(document).ready(function () {

    // swiperPopups
    const swiperPopups = new Swiper(".slider_popups", {
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
    // открытие меню
    $('.menu_btn').on('click', function () {
        $('body').toggleClass('locked')
        $('.menu_btn').toggleClass('active')
        $('.big_menu').toggleClass('show')

    })
    //фиксировать шапку
    function headerFixed(e) {
        let header = $('.header_block_fix');

        if ($(this).scrollTop() > 300) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }

    }
    headerFixed();

    $(window).scroll(function (e) {
        headerFixed();
    });

    // высота секции не менше чем высота ее контента
    let staticMap = $('.map_section');
    if (staticMap) {
        let staticMapHeight = staticMap.outerHeight();
        staticMap.css('min-height', staticMapHeight)
        staticMap.css('height', '100dvh')
    }

    // высота svg равна ширине картинки под ней
    function chooseSvgWidth() {
        let chooseImg = $('.choose_block_img');
        let chooseSvg = $('.choose_block_svg');
        if (chooseImg.length) {
            chooseImg.on('load', function () {
                let chooseImgWidth = chooseImg.outerWidth();
                chooseSvg.css('width', chooseImgWidth);
            });

            // Для случая, если изображение уже было загружено
            if (chooseImg[0].complete) {
                let chooseImgWidth = chooseImg.outerWidth();
                chooseSvg.css('width', chooseImgWidth);
            }
        }
    }

    function chooseBuildWidth() {
        let chooseImg = $('.choose_block_img');
        let chooseBuild = $('.imgs_list');
        if (chooseImg.length) {
            chooseImg.on('load', function () {
                let chooseImgWidth = chooseImg.outerWidth();
                chooseBuild.css('width', chooseImgWidth);
            });

            // Для случая, если изображение уже было загружено
            if (chooseImg[0].complete) {
                let chooseImgWidth = chooseImg.outerWidth();
                chooseBuild.css('width', chooseImgWidth);
            }
        }
    }
    chooseBuildWidth()
    chooseSvgWidth()


    $(window).resize(function (e) {
        chooseBuildWidth()
        chooseSvgWidth()
    });

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
        $('.choose_courtyard_modal').toggleClass('show')
    })

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.choose_courtyard, .choose_courtyard_modal').length) {
            $('.choose_courtyard_modal').removeClass('show')
        }
    });
    $('.choose_courtyard_modal .close').on('click', function (e) {
        $('.choose_courtyard_modal').removeClass('show')
    });


    $('.map_filters_title').on('click', function (e) {
        $(this).next().toggleClass('show');
        $(this).toggleClass('active');
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
    let getScrollWidth = () => window.innerWidth - document.documentElement.offsetWidth;
    let browserScrollWidth = getScrollWidth();

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('[data-open-modal]')) {
            e.preventDefault();
            const targetId = target.closest('[data-open-modal]').dataset.openModal;
            const selectedModal = document.querySelector(`[data-modal="${targetId}"]`);
            selectedModal.classList.add('show');
            body.classList.add('locked');
            if (getScrollWidth() == 0) {
                body.style.paddingRight = `${browserScrollWidth}px`;
            }
        }
        if (target.closest('[data-modal-close]')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            document.querySelector('.modal.show').classList.remove('show');
            body.classList.remove('locked');
            body.style.paddingRight = ``;
        }
        if (target.closest('.modal') && !target.closest('.modal-content')) {
            e.preventDefault();
            let modalOpen = document.querySelector('.modal.show');
            document.querySelector('.modal.show').classList.remove('show');
            body.classList.remove('locked');
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

});
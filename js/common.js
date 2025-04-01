document.addEventListener("DOMContentLoaded", function () {
    let prevScroll = window.scrollY;


    const header = document.querySelector('.header_block_fix');
    const mobileBtnFix = document.querySelector('.mobile_btn_fix');
    const footer = document.querySelector('.footer');
    const filter = document.querySelector('.filter_wrapper');

    //фиксировать шапку
    function fixHeader() {
        if (header) {
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
        }
    }
    fixHeader()

    // фиксировать кнопки на мобилке и убирать когда долистали до футера
    function fixMobileBtn() {
        if (mobileBtnFix) {
            const currentScroll = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const isAtBottom = currentScroll + windowHeight >= docHeight;
            const isAtTarget = footer ? footer.getBoundingClientRect().top <= windowHeight : isAtBottom;

            if (currentScroll > 300 && !isAtTarget) {
                mobileBtnFix.classList.add('visible');
            } else {
                mobileBtnFix.classList.remove('visible');
            }
        }
    };
    fixMobileBtn()

    // задать фильтру top в зависимости от - фиксированна шапки или нет
    function updateFilterPosition() {
        if (!header || !filter) return;

        if (header.classList.contains('fix-on-scroll')) {
            filter.style.top = `${header.offsetHeight + 20}px`;
        } else {
            filter.style.top = '20px';
        }
    }

    window.addEventListener('scroll', () => {
        fixHeader();
        fixMobileBtn();
        updateFilterPosition();
    });

    // scroll up
    $('.scrollup').on('click', function () {
        $('html, body').animate({ scrollTop: 0, }, 1000);
        return false;
    });

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

    // открытие фильтра на мобилке
    $('.filter_btn_drop').on('click', function () {
        $(this).toggleClass('active')
        $(this).prev().slideToggle()
        $(this).prev().toggleClass('show')
    })

    // 
    function toggleTableInfo(state) {
        $('.catalog_table_row').off('click'); // Убираем старые обработчики

        if (state) {
            $('.catalog_table_row').on('click', function () {
                $(this).next().slideToggle();
            });
        }
    }

    function checkViewport() {
        toggleTableInfo($(window).width() <= 700);
    }

    $(window).on('resize', checkViewport);
    checkViewport();

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
        spaceBetween: 10,
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
            577: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },
            1101: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });

    // swiperPopups
    let sliderPopups = document.querySelectorAll(".slider_popups");
    if (sliderPopups.length) {
        sliderPopups.forEach(slider => {
            const swiperPopups = new Swiper(slider, {
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
            observer.observe(slider);
        })
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
            1230: {
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

    // swiperBigImg
    const swiperHeight_block = new Swiper(".height_block_slider", {
        slidesPerView: 'auto',
        spaceBetween: 10,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        effect: 'slide',
        speed: 1000,
        breakpoints: {
            577: {
                slidesPerView: 'auto',
                spaceBetween: 24,
            },

        },
    });

    // высота секции не меньше чем высота ее контента
    let staticMap = $('.static_map');
    let staticMapMap = $('#map');
    let staticMapTitle = $('.map_section_title');

    if (staticMap.length) {
        function adjustMapHeight() {
            if ($(window).width() > 992) {
                let staticMaptitleHeight = staticMapTitle.outerHeight();
                staticMapMap.css('height', `calc(100svh - ${staticMaptitleHeight}px)`);
            }
        }

        adjustMapHeight();

        $(window).on('resize', function () {
            adjustMapHeight();
        });
    }
    // высота секции - высота хедера
    function adjustChooseSectionHeight(chooseSelector, breakpoint) {
        let chooseSection = $(chooseSelector);

        if (chooseSection.length) {
            function updateHeight() {
                if ($(window).width() > breakpoint) {
                    let headerHeight = $('.header').outerHeight();
                    chooseSection.css('height', `calc(100svh - ${headerHeight}px)`);
                } else {
                    chooseSection.css('height', '');
                }
            }

            updateHeight();

            $(window).on('resize', updateHeight);
        }
    }

    // Используем для разных секций с разными брейкпоинтами
    adjustChooseSectionHeight('.choose_section_one .choose_wrapper', 721);

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
        // autoStart: false,
        animationEffect: "zoom", // Анимация при открытии
        animationDuration: 600,
        transitionDuration: 600,
        beforeClose: function (instance, current) {
            instance.current.opts.animationEffect = "none"; // Убираем анимацию закрытия
            instance.current.opts.animationDuration = 0;
        },
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-stage"><button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999998 22.631L22.1306 1.5M0.999998 1.50061L22.1306 22.6313" stroke="#63483F"/></svg></button><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-navigation">{{arrows}}</div></div></div></div>',
        btnTpl: {
            arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg><use xlink:href="imgs/sprite.symbol.svg#arrow_right"></use></svg></button>',
            arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg><use xlink:href="imgs/sprite.symbol.svg#arrow_left"></use></svg></button>',
        },
    });

    // для одного видео
    $('[data-video-fancybox]').fancybox({
        arrows: false,
        infobar: false,
        buttons: false,
        loop: false,
        animationEffect: "zoom",
        animationDuration: 600,
        transitionDuration: 600,
        beforeClose: function (instance, current) {
            instance.current.opts.animationEffect = "none";
            instance.current.opts.animationDuration = 0;
        },
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-stage"><button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999998 22.631L22.1306 1.5M0.999998 1.50061L22.1306 22.6313" stroke="#63483F"/></svg></button></div></div></div>',
    });


    $('.choose_courtyard').on('click', function () {
        let modalClass = $(this).data('template');
        $('.choose_courtyard_modal').removeClass('show');
        $('.' + modalClass).addClass('show');
        $('.choose_courtyard_wrapper').addClass('active');
        if ($(window).width() < 721) {
            $('html').addClass('locked');
        } else {
            $('html').removeClass('locked');
        }
    });

    $('.choose_courtyard_modal').on('click', function (e) {
        if (!$(e.target).closest('.choose_courtyard_modal_content').length || $(e.target).closest('.close').length) {
            $('html').removeClass('locked');
            $('.choose_courtyard_modal').removeClass('show');
            $('.choose_courtyard_wrapper').removeClass('active');
        }
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

    // медиа
    let currentCategory = "all"; // По умолчанию показываем все
    $(".media_wrapper .tag").on("click", function (e) {
        e.preventDefault();

        const $wrapper = $(this).closest(".media_wrapper");
        const $tags = $wrapper.find(".tag");
        const $mediaCols = $wrapper.find(".media_col");

        $tags.removeClass("active");
        $(this).addClass("active");

        const currentCategory = $(this).data("category");

        $mediaCols.each(function () {
            $(this).toggle(currentCategory === "all" || $(this).data("category") === currentCategory);
        });

        // Пересчитываем позиции элементов для AOS.js
        AOS.refresh();
    });

    // Обработчик клика по .media_col для открытия Fancybox
    $(".media_col").on("click", function (e) {
        e.preventDefault();

        let clickedElement = $(this); // Элемент, по которому кликнули

        // Получаем все элементы, которые должны быть в галерее
        let filteredItems = $(".media_col").filter(function () {
            return currentCategory === "all" || $(this).data("category") === currentCategory;
        });

        // Формируем массив для Fancybox
        let galleryItems = filteredItems.map(function () {
            let $el = $(this);
            let type = $el.data("type") === "video" ? "video" : "image"; // Проверяем, видео или изображение

            return {
                src: $el.data("src"),
                type: type,
                opts: { caption: $el.find("img").attr("alt") || "" }
                // opts: {
                //     caption: $el.find("img").attr("alt") || "",
                //     video: {
                //         autoStart: false, 
                //     },
                // },
            };
        }).get();

        // Определяем индекс кликнутого элемента в массиве
        let startIndex = $.inArray(clickedElement[0], filteredItems);

        // Открываем Fancybox с нужного элемента
        $.fancybox.open(galleryItems, {
            arrows: false,
            infobar: false,
            buttons: false,
            loop: true,
            animationEffect: "zoom",
            animationDuration: 600,
            transitionDuration: 600,
            beforeClose: function (instance, current) {
                instance.current.opts.animationEffect = "none";
                instance.current.opts.animationDuration = 0;
            },
            index: startIndex, // <-- Указываем, с какого элемента начать просмотр
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-inner">' +
                '<div class="fancybox-stage">' +
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M0.999998 22.631L22.1306 1.5M0.999998 1.50061L22.1306 22.6313" stroke="#63483F"/>' +
                '</svg></button>' +
                '<div class="fancybox-infobar">' +
                '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
                '</div><div class="fancybox-navigation">{{arrows}}</div></div></div></div>',
            btnTpl: {
                arrowLeft:
                    '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                    '<svg><use xlink:href="imgs/sprite.symbol.svg#arrow_right"></use></svg></button>',
                arrowRight:
                    '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                    '<svg><use xlink:href="imgs/sprite.symbol.svg#arrow_left"></use></svg></button>',
            },
        });
    });


    const sliderText = new Swiper(".slider_text", {
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

        tabsNavItems.forEach((tab, index) => {
            tab.addEventListener("click", function (e) {
                e.preventDefault();

                // Скрываем все табы внутри текущего блока
                tabsContentItems.forEach((item) => (item.style.display = "none"));

                // Показываем нужный таб
                const targetId = this.getAttribute("href");
                const targetTab = tabsBlock.querySelector(targetId);
                if (targetTab) {
                    targetTab.style.display = "block";
                }

                // Обновляем активный класс
                tabsNavItems.forEach((nav) => nav.classList.remove("active"));
                this.classList.add("active");

                if (this.classList.contains("static_map_svg_g")) {
                    const mapTabBtn = document.querySelector('[href="#tab_map-2"]');
                    mapTabBtn && mapTabBtn.classList.add('active');
                } else {
                    this.classList.add("active");
                }

                if (targetTab) {
                    // Обновляем Swiper в текущем активном табе
                    const swiperInstance = targetTab.querySelector(".slider_gallery");
                    if (swiperInstance && swiperInstance.swiper) {
                        swiperInstance.swiper.update();
                    }
                    // Пересчитываем позиции элементов для AOS.js
                    AOS.refresh();

                    // Загружаем камеру только если в табе есть .camera_block_img
                    const cameraBlock = targetTab.querySelector(".camera_block_img");
                    if (cameraBlock) {
                        const img = cameraBlock.querySelector("img");
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src; // Включаем поток
                        }
                    }
                }


                // Очищаем потоки в других табах
                tabsContentItems.forEach((item, itemIndex) => {
                    if (itemIndex !== index) {
                        const otherCameraBlock = item.querySelector(".camera_block_img");
                        if (otherCameraBlock) {
                            const otherImg = otherCameraBlock.querySelector("img");
                            if (otherImg) {
                                otherImg.src = ""; // Очищаем поток
                            }
                        }
                    }
                });

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
        console.log(2423424);

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

            path.addEventListener("click", (event) => {
                const link = event.target.getAttribute("data-link");
                if (link) window.open(link, "_blank");
            });
        });
    }

    // всплывающие подсказки
    // let placement
    // if ($(window).width() > 992) {
    //     placement = 'right-start';
    // } else {
    //     placement = 'bottom';
    // }
    // tippy('.tippy_btn', {
    //     trigger: 'click',
    //     content(reference) {
    //         const id = reference.getAttribute('data-template');
    //         const template = document.getElementById(id);
    //         return template.innerHTML;
    //     },
    //     allowHTML: true,
    //     arrow: false,
    //     theme: 'creame',
    //     animation: 'scale',
    //     placement: placement,
    //     followCursor: true,
    //     maxWidth: '462px',
    //     duration: [400, 200]
    // });
    tippy('[data-tippy-content]', {
        // trigger: 'click',
        arrow: false,
        theme: 'small_tooltip',
        animation: 'scale',
        placement: 'bottom-start',
        maxWidth: '200px',
        duration: [400, 200]
    });

    let tippyInstances = [];
    let isTouchDevice = detectTouchDevice();

    // Функция определения сенсорного устройства
    function detectTouchDevice() {
        return ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            window.matchMedia('(pointer: coarse)').matches;
    }

    // Функция инициализации Tippy
    function initTippy() {
        // Удаляем старые инстансы перед пересозданием
        tippyInstances.forEach(instance => instance.destroy());
        tippyInstances = [];

        if (!isTouchDevice) {
            tippyInstances = tippy('.tippy_btn', {
                // trigger: 'click',
                content(reference) {
                    const id = reference.getAttribute('data-template');
                    const template = document.getElementById(id);
                    return template ? template.innerHTML : '';
                },
                allowHTML: true,
                arrow: false,
                theme: 'creame',
                animation: 'scale',
                placement: 'right-start',
                followCursor: true,
                maxWidth: '462px',
                duration: [400, 200]
            });
        }
    }

    // Запускаем при загрузке
    initTippy();

    // Отслеживаем изменения ввода (тач/мышь) и ресайз
    window.matchMedia('(pointer: coarse)').addEventListener('change', (e) => {
        isTouchDevice = detectTouchDevice();
        initTippy();
    });

    window.addEventListener('resize', () => {
        isTouchDevice = detectTouchDevice();
        initTippy();
    });



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
    // 
    let swiperInstancesNews = new Map();
    const swiperNewsListSliders = document.querySelectorAll(".news_list_slider");

    function initSwipersNews() {
        swiperNewsListSliders.forEach((slider) => {
            if (window.innerWidth > 576 && window.innerWidth <= 992) {
                if (!swiperInstancesNews.has(slider)) {
                    swiperInstancesNews.set(slider, new Swiper(slider, {
                        slidesPerView: 'auto',
                        spaceBetween: 27,
                        watchSlidesProgress: true,
                        mousewheelControl: true,
                        watchOverflow: true,
                        watchSlidesVisibility: true,
                    }));
                }
            } else {
                if (swiperInstancesNews.has(slider)) {
                    swiperInstancesNews.get(slider).destroy(true, true);
                    swiperInstancesNews.delete(slider);
                }
            }
        });
    }
    initSwipersNews();
    window.addEventListener("resize", initSwipersNews);

    // Диапазон цен
    const sliders = document.querySelectorAll('.sliderMinMax');

    if (sliders.length) {
        const priceFormat = wNumb({
            decimals: 0,
            thousand: ' ',
            // suffix: ' ₽'
        });

        function formatInputValue(input) {
            let val = input.value.replace(/[^-\d]/g, '');
            if (val) {
                const formattedVal = priceFormat.to(Number(val));
                input.value = formattedVal;
            }
        }

        function numberFormat(value) {
            return isNaN(value) ? '' : new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
        }
        let needUseJsFormFilterChange = 0;

        sliders.forEach((element, index) => {
            const fromToBlock = element.closest('.from_to_block');
            const isFormatted = fromToBlock.classList.contains('from_to_block_price');
            const step = Number(fromToBlock.dataset.step) || 1;;
            const fromTo = fromToBlock.querySelector('.from-to');
            const inputFrom = fromTo.querySelector('.price_from');
            const inputTo = fromTo.querySelector('.price_to');
            const formInput2 = fromTo.querySelector('.form_input2');
            const min = Number(inputFrom.dataset.min) || 0;
            const max = Number(inputTo.dataset.max) || 100;
            const startFrom = Number(inputFrom.dataset.value) || min;
            const startTo = Number(inputTo.dataset.value) || max;

            inputFrom.classList.add(`js_from_${index}`);
            inputTo.classList.add(`js_to_${index}`);

            noUiSlider.create(element, {
                start: [startFrom, startTo],
                connect: true,
                range: {
                    min: min,
                    max: max
                },
                // step: step,
                format: isFormatted ? wNumb({
                    decimals: 0,
                    thousand: ' ',
                    suffix: ' ₽'
                }) : wNumb({
                    decimals: 0
                })
            });

            element.noUiSlider.on('update', (values) => {
                let valMin = parseInt(values[0].replace(/[^-\d]/g, ''), 10);
                let valMax = parseInt(values[1].replace(/[^-\d]/g, ''), 10);
                if (isFormatted) { // Только для блока с классом from_to_block_price
                    inputFrom.value = numberFormat(valMin);
                    inputTo.value = numberFormat(valMax);
                } else {
                    inputFrom.value = valMin;
                    inputTo.value = valMax;
                }
                formInput2.value = `${valMin}-${valMax}`;
            });

            const inputs = document.querySelectorAll(`.js_from_${index}, .js_to_${index}`);
            inputs.forEach(inp => {
                inp.addEventListener('blur', (event) => {
                    inp.dispatchEvent(new Event('change', { bubbles: true }));
                });
                inp.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        inp.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
                inp.addEventListener('change', (event) => {
                    console.log('change event');
                    let fromRaw = inputFrom.value.replace(/[^\d]/g, ''); // Убираем всё кроме цифр
                    let toRaw = inputTo.value.replace(/[^\d]/g, '');

                    let from = fromRaw !== '' ? Number(fromRaw) : Number(element.noUiSlider.get()[0]);
                    let to = toRaw !== '' ? Number(toRaw) : Number(element.noUiSlider.get()[1]);

                    element.noUiSlider.set([from, to]);
                });
            })
            // Форматирование ввода при ручном вводе
            if (isFormatted) {
                inputFrom.addEventListener('input', (e) => {
                    formatInputValue(inputFrom);
                });
                inputTo.addEventListener('input', (e) => {
                    formatInputValue(inputTo);
                });

            }
        });

        needUseJsFormFilterChange = 1;
    }


});
// выбор этажа
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".floors_selection_section .quantity_rooms_list div");
    const floors = document.querySelectorAll(".building_img svg .floor");

    //фильтр по этажам, показываем те, где есть нужные квартиры
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const roomsQuantity = this.getAttribute("data-rooms-quantity");

            floors.forEach(floor => {
                const floorRooms = floor.getAttribute("data-rooms-quantity") || "all";
                const isVisible = roomsQuantity === "all" || floorRooms === roomsQuantity;
                floor.style.opacity = isVisible ? "1" : "0";
                floor.style.pointerEvents = isVisible ? "auto" : "none";
            });
        });
    });

    // при клике на активный этаж (path у которого есть data-link) делаем переход на сраницу
    // floors.forEach((floor) => {
    //     floor.addEventListener("click", (event) => {
    //         const link = event.target.getAttribute("data-link");
    //         if (link) window.open(link, "_blank");
    //     });
    // })

    const floorsSelectionSlider = new Swiper(".floors_selection_slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        watchOverflow: true,
        watchSlidesVisibility: true,
        direction: "vertical",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            // slideChangeTransitionEnd(slider) {
            //     const currentSlide = slider.slides[slider.activeIndex];
            //     const floorId = currentSlide.getAttribute('data-floor-id');

            //     // Удаляем класс active у всех элементов с data-floor
            //     document.querySelectorAll('[data-floor].active').forEach(el => {
            //         el.classList.remove('active');
            //     });

            //     // Добавляем класс active к текущему и прокручиваем к нему
            //     const currentPath = document.querySelector(`[data-floor="${floorId}"]`);
            //     if (currentPath) {
            //         currentPath.classList.add('active')
            //         currentPath.scrollIntoView({ block: "center", behavior: "smooth" })
            //     }
            // }
            slideChangeTransitionEnd(slider) {
                const currentSlide = slider.slides[slider.activeIndex];
                const floorId = currentSlide.getAttribute('data-floor-id');

                // Удаляем класс active у всех элементов с data-floor
                $('[data-floor].active').removeClass('active');

                // Добавляем класс active к текущему и плавно скроллим
                const $currentPath = $(`[data-floor="${floorId}"]`);
                if ($currentPath.length) {
                    $currentPath.addClass('active');

                    // Плавный скролл
                    $('.building_wrapper').animate({
                        scrollTop: $currentPath.offset().top - $(window).height() / 2
                    }, 800);
                }
            }
        }
    });

});

// ход строительства
document.addEventListener("DOMContentLoaded", function () {
    // 
    let swiperInstancesMedia = new Map();
    const swiperMediaSliders = document.querySelectorAll(".media_slider");

    function initSwipersMedia() {
        swiperMediaSliders.forEach((slider) => {
            if (window.innerWidth <= 992) {
                if (!swiperInstancesMedia.has(slider)) {
                    const swiper = new Swiper(slider, {
                        slidesPerView: 'auto',
                        spaceBetween: 8,
                        watchSlidesProgress: true,
                        watchOverflow: true,
                        init: false,
                        breakpoints: {
                            577: {
                                slidesPerView: 'auto',
                                spaceBetween: 19,
                            },
                        },
                    });

                    swiperInstancesMedia.set(slider, swiper);
                    swiper.init();
                }
            } else {
                if (swiperInstancesMedia.has(slider)) {
                    swiperInstancesMedia.get(slider).destroy(true, true);
                    swiperInstancesMedia.delete(slider);
                }
            }
        });
    }

    initSwipersMedia();
    window.addEventListener("resize", initSwipersMedia);

    // прокрутка к активному месяцу
    function scrollToActiveMonth() {
        const activeMonth = document.querySelector('.month_btn.active');
        const container = document.querySelector('.media_progress_control_wrapper');
        if (activeMonth) {
            container.scrollTo({
                left: activeMonth.offsetLeft - container.offsetWidth / 2 + activeMonth.offsetWidth / 2,
                behavior: 'smooth'
            });
        }
    }


    const mediaProgress = document.querySelector('.media_progress_control');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (mediaProgress) {
        // Найти последний год
        const lastYear = mediaProgress.querySelector('.year:last-of-type');
        lastYear.classList.add('active');

        // Найти последний месяц в этом году
        const lastMonthButton = lastYear.querySelector('.month_btn:last-of-type');
        if (lastMonthButton) {
            lastMonthButton.classList.add('active');
            const lastYearLabel = lastYear.querySelector('.year_btn').getAttribute('aria-label');
            const lastMonthLabel = lastMonthButton.getAttribute('aria-label');

            // Установить активный контент по умолчанию
            updateContent(lastYearLabel, lastMonthLabel);
        }
        mediaProgress.querySelectorAll('.year_btn').forEach(button => {
            button.addEventListener('click', function () {
                // Определяем выбранный год
                const selectedYear = this.getAttribute('aria-label');

                // Убираем класс active у всех годов
                mediaProgress.querySelectorAll('.year').forEach(year => year.classList.remove('active'));

                // Добавляем класс active выбранному году
                const yearElement = this.closest('.year');
                yearElement.classList.add('active');

                // Убираем класс active у всех кнопок месяцев
                mediaProgress.querySelectorAll('.month_btn').forEach(btn => btn.classList.remove('active'));

                // Получаем первый месяц внутри активного года
                const firstMonthButton = yearElement.querySelector('.month_btn');
                if (!firstMonthButton) return; // Если месяца нет, выходим
                firstMonthButton.classList.add('active'); // Добавляем класс active первому месяцу
                const firstMonth = firstMonthButton.getAttribute('aria-label');

                // Обновляем отображение контента
                updateContent(selectedYear, firstMonth);
            });
        });

        mediaProgress.querySelectorAll('.month_btn').forEach(button => {
            button.addEventListener('click', function () {
                const selectedMonth = this.getAttribute('aria-label');
                const selectedYear = this.closest('.year').querySelector('.year_btn').getAttribute('aria-label');

                // Убираем класс active у всех кнопок месяцев
                mediaProgress.querySelectorAll('.month_btn').forEach(btn => btn.classList.remove('active'));

                // Добавляем класс active выбранному месяцу
                this.classList.add('active');

                // Обновляем отображение контента
                updateContent(selectedYear, selectedMonth);
            });
        });

        function updateContent(year, month) {
            // Скрываем все блоки media_progress_list_wrapper
            document.querySelectorAll('.media_progress_list_wrapper').forEach(wrapper => {
                wrapper.style.display = 'none';
            });

            // Показываем нужный блок
            const targetWrapper = document.querySelector(`.media_progress_list_wrapper[data-year="${year}"][data-month="${month}"]`);
            if (targetWrapper) {
                targetWrapper.style.display = 'block';

                swiperInstancesMedia.forEach((swiper) => { swiper.update(); });
            }

            // Вызываем прокрутку после установки активного месяца
            scrollToActiveMonth();

            // Пересчитываем позиции элементов для AOS.js
            AOS.refresh();
        }

        // эффект "перетаскивания"
        mediaProgress.addEventListener('mousedown', (e) => {
            isDown = true;
            // mediaProgress.classList.add('active');
            startX = e.pageX - mediaProgress.offsetLeft;
            scrollLeft = mediaProgress.scrollLeft;
        });

        mediaProgress.addEventListener('mouseleave', () => {
            isDown = false;
            // mediaProgress.classList.remove('active');
        });

        mediaProgress.addEventListener('mouseup', () => {
            isDown = false;
            // mediaProgress.classList.remove('active');
        });

        mediaProgress.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - mediaProgress.offsetLeft;
            const walk = (x - startX) * 1.5;
            mediaProgress.scrollLeft = scrollLeft - walk;
        });
    }

});

// план этажа
let flatsData = {}; // Должен загружаться динамически

document.addEventListener("DOMContentLoaded", function () {
    const floorsPlanSection = document.querySelector(".floors_plan_section");
    const floorsPlanImg = document.querySelector(".floors_plan_img");
    const floorsPlanTitle = document.querySelector(".floors_plan_title span");
    const preloader = document.querySelector(".preloader");
    const swiperContainer = document.querySelector(".floors_plan_slider");
    const floorsPlanWrapper = document.querySelector(".floors_plan_flat_wrapper");
    let lastLoadedFloor = null;

    const swiperFloorsPlan = new Swiper(swiperContainer, {
        spaceBetween: 4,
        slidesPerView: 1,
        direction: "vertical",
        watchOverflow: true,
        // watchSlidesVisibility: true,
        // watchSlidesProgress: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            993: {
                spaceBetween: 4,
                slidesPerView: 3,
            },
        },
    });

    if (floorsPlanSection) {
        // Обработчик клика по стрелкам (вызов AJAX)
        floorsPlanSection.querySelectorAll(".swiper-button-next, .swiper-button-prev").forEach(button => {
            button.addEventListener("click", function () {
                triggerAjaxForActiveSlide();
            });
        });

    }


    // Обработчик клика по слайдам (вызов AJAX)
    Array.from(swiperFloorsPlan.slides).forEach(slide => {
        slide.addEventListener("click", function () {
            const index = [...swiperFloorsPlan.slides].indexOf(slide);
            swiperFloorsPlan.slideTo(index);
            triggerAjaxForActiveSlide();
        });
    });

    function triggerAjaxForActiveSlide() {
        const activeSlide = swiperFloorsPlan.slides[swiperFloorsPlan.activeIndex];
        const floorNumber = activeSlide.getAttribute("data-floor");
        console.log(lastLoadedFloor, floorNumber);

        // Если этаж уже загружен, не выполняем повторный запрос
        if (lastLoadedFloor === floorNumber) return;

        // Удаляем класс у всех слайдов перед добавлением новому
        swiperFloorsPlan.slides.forEach(slide => slide.classList.remove("active"));

        if (!activeSlide.classList.contains("active")) {
            loadFloorData(floorNumber);
            activeSlide.classList.add("active"); // Добавляем класс загруженного слайда
            lastLoadedFloor = floorNumber; // Обновляем последний загруженный этаж

            // Переключаем активный таб на #floors
            const floorsTabBtn = document.querySelector('.tabs_nav_item[href="#floors"]');
            if (floorsTabBtn) {
                floorsTabBtn.click();
            }
        }
    }
    // Загружаем первый этаж и добавляем слайду класс active по умолчанию
    function initFirstFloor() {
        if (!swiperFloorsPlan.slides.length) return; // Проверяем, есть ли слайды
        const firstSlideIndex = swiperFloorsPlan.slides.findIndex(el => el.classList.contains('current-slide'));
        // console.log(firstSlideIndex);

        const firstSlide = swiperFloorsPlan.slides[firstSlideIndex >= 0 ? firstSlideIndex : 0];
        if (!firstSlide) return;

        firstSlide.classList.add("active");
        const firstFloor = firstSlide.getAttribute("data-floor");
        swiperFloorsPlan.slideTo(firstSlideIndex, 0);
        loadFloorData(firstFloor);
    }

    initFirstFloor();

    async function loadFloorData(floorNumber) {
        // if (floorsPlanSection.classList.contains("sending")) return;
        try {
            // floorsPlanSection.classList.add("sending");
            preloader.style.opacity = "1";
            preloader.style.display = "block"; // Показываем прелоадер

            // const response = await fetch(`http://127.0.0.1:5504/json/floor_${floorNumber}.json`);
            const response = await fetch(`https://крылатская33.рф/new.site/json/floor_${floorNumber}.json`);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();


            // floorsPlanImg.innerHTML = "";

            filterModule.removeEventListeners();

            // Создаем новое изображение
            const newImg = new Image();
            newImg.src = data.image;
            newImg.classList.add("img");
            newImg.alt = `План ${floorNumber}`;

            newImg.onload = function () {
                console.log("Картинка загружена", newImg.src);

                // Очищаем контейнер и вставляем новое изображение
                floorsPlanImg.innerHTML = "";
                floorsPlanImg.appendChild(newImg);

                // Создаём и добавляем новый SVG-контейнер
                const newSvg = document.createElement("div");
                newSvg.classList.add("svg-container");
                newSvg.innerHTML = data.svg;
                floorsPlanImg.appendChild(newSvg);

                // Обновляем тултипы и фильтры
                updateTooltips(data.tooltips);
                applyFilters();
                filterModule.init(); // Заново вешаем обработчики событий

                // Прелоадер скрываем после полной загрузки
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 300);
            };
            flatsData = data; // Сохраняем данные для клика по flats

            // **Выбираем первый шаблон по умолчанию**
            const firstFlatKey = Object.keys(flatsData.flats)[0]; // Берём первый ключ
            if (firstFlatKey) {
                floorsPlanWrapper.innerHTML = flatsData.flats[firstFlatKey];
            }
        } catch (error) {
            console.error("Ошибка загрузки JSON:", error);
        }

    }

    function updateTooltips(tooltipsData) {
        let tooltipContainer = document.getElementById("tooltipContainer");

        if (!tooltipContainer) {
            tooltipContainer = document.createElement("div");
            tooltipContainer.id = "tooltipContainer";
            tooltipContainer.style.display = "none";
            document.body.appendChild(tooltipContainer);
        } else {
            tooltipContainer.innerHTML = "";
        }

        Object.entries(tooltipsData).forEach(([id, content]) => {
            const div = document.createElement("div");
            div.id = id;
            div.classList.add("tooltip_block", "tooltip_block_flat");
            div.innerHTML = content;
            tooltipContainer.appendChild(div);
        });

        setTimeout(() => { // Даем время DOM обновиться
            let tippyInstances = [];

            function initTippy() {
                destroyTippy(); // Уничтожаем старые инстансы перед созданием новых
                tippyInstances = tippy(".floor_tippy_btn", {
                    content(reference) {
                        const id = reference.getAttribute("data-template");
                        const template = document.getElementById(id);
                        return template ? template.innerHTML : "Нет данных";
                    },
                    allowHTML: true,
                    theme: "creame",
                    arrow: false,
                    animation: "scale",
                    placement: "left-start",
                    followCursor: true,
                    maxWidth: "412px",
                    duration: [400, 200],
                });
            }

            function destroyTippy() {
                tippyInstances.forEach(instance => instance.destroy());
                tippyInstances = [];
            }

            function checkTippy() {
                if (window.innerWidth > 992) {
                    initTippy();
                } else {
                    destroyTippy();
                }
            }

            checkTippy();
            window.addEventListener("resize", checkTippy);

        }, 50);
    }


    function applyFilters() {
        const activeBtn = document.querySelector("[data-rooms-quantity].active");
        const roomsQuantity = activeBtn?.getAttribute("data-rooms-quantity") || "all";

        document.querySelectorAll(".floors_plan_img polygon").forEach(polygon => {
            const polygonRooms = polygon.getAttribute("data-rooms-quantity") || "all";
            const isVisible = roomsQuantity === "all" || polygonRooms === roomsQuantity;
            polygon.style.opacity = isVisible ? "1" : "0";
            polygon.style.pointerEvents = isVisible ? "auto" : "none";
        });
    }


    const filterModule = (() => {
        let filterButtons, polygons;

        function init() {
            filterButtons = document.querySelectorAll(".quantity_rooms_list div");
            polygons = document.querySelectorAll(".floors_plan_img polygon");

            filterButtons.forEach(btn => btn.addEventListener("click", handleFilterClick));
            polygons.forEach(poly => poly.addEventListener("click", handlePolygonClick));
        }

        function handleFilterClick(event) {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");
            applyFilters();
        }

        function handlePolygonClick(event) {
            if (window.innerWidth > 992) {
                const link = event.target.getAttribute("data-link");
                if (link) window.open(link, "_blank");
            } else {
                const template = event.target.getAttribute("data-template");
                if (template && flatsData?.flats?.[template]) {
                    floorsPlanWrapper.innerHTML = flatsData.flats[template];
                } else {
                    console.warn("Шаблон квартиры не найден:", template);
                }
            }

        }

        function removeEventListeners() {
            filterButtons?.forEach(btn => btn.removeEventListener("click", handleFilterClick));
            polygons?.forEach(poly => poly.removeEventListener("click", handlePolygonClick));
        }

        return { init, removeEventListeners };
    })();

});

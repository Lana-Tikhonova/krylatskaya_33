ymaps.ready(initMap);

function initMap() {
  var map = new ymaps.Map("map", {
    center: [55.770846, 37.406369],
    zoom: 13.5,
    controls: ["zoomControl"],
    options: {
      yandexMapDisablePoiInteractivity: true,
    }
  });
  map.behaviors.disable('scrollZoom');

  var categories = {
    parks: "Парки и скверы",
    cafes: "Кафе и рестораны",
    education: "Образование",
    kindergartens: "Детские сады",
    shopping: "Торговые центры",
    hospitals: "Больницы и поликлиники",
    sports: "Спорт"
  };

  var filters = [
    { text: "Все объекты", color: "white", group: "all" },
    { text: categories.parks, color: "#133a4e", group: "park" },
    { text: categories.cafes, color: "#ba804c", group: "cafe" },
    { text: categories.education, color: "#3e81d5", group: "school" },
    { text: categories.kindergartens, color: "#2c6a5a", group: "kinder" },
    { text: categories.shopping, color: "#e27844", group: "shopping" },
    { text: categories.hospitals, color: "#787bc9", group: "hospital" },
    { text: categories.sports, color: "#eac451", group: "sport" }
  ];

  var locations = [
    { category: categories.parks, coords: [55.76915205321779, 37.40717349999999], comment: 'Крылатский парк' },
    { category: categories.parks, coords: [55.77338303193808, 37.42201799999998], comment: 'Парк Звёзд' },
    { category: categories.parks, coords: [55.780559727867555, 37.433507500000005], comment: 'Природно-исторический парк Москворецкий' },
    { category: categories.parks, coords: [55.758926506317295, 37.41319249999993], comment: 'Сквер 75-летия Победы' },
    { category: categories.parks, coords: [55.74229320490224, 37.43895149999997], comment: 'Суворовский парк' },
    { category: categories.parks, coords: [55.820210, 37.546458], comment: 'Тимирязевский парк' },
    { category: categories.parks, coords: [55.822114, 37.476375], comment: 'Парк Покровское-Стрешнево' },
    { category: categories.parks, coords: [55.806539, 37.527018], comment: 'Сквер у Амбулаторного пруда' },
    { category: categories.parks, coords: [55.799645, 37.512293], comment: 'Мемориально-парковый комплекс героев Первой мировой войны' },
    { category: categories.parks, coords: [55.801148, 37.521673], comment: 'Чапаевский парк' },
    { category: categories.parks, coords: [55.796242, 37.508921], comment: 'Старый сиреневый сад Л. А. Колесникова' },
    { category: categories.parks, coords: [55.795707, 37.516417], comment: 'Сквер Дивизии Московского Народного Ополчения' },
    { category: categories.parks, coords: [55.810936, 37.482340], comment: 'Всехсвятская роща' },
    { category: categories.parks, coords: [55.806337, 37.472722], comment: 'Щукинский парк' },
    { category: categories.parks, coords: [55.819830, 37.501618], comment: 'Парк имени Воровского' },
    { category: categories.parks, coords: [55.815835, 37.502397], comment: 'Сквер Космонавта Волкова' },
    { category: categories.parks, coords: [55.793470, 37.556803], comment: 'Петровский парк' },
    { category: categories.parks, coords: [55.787036, 37.515317], comment: 'Парк Березовая Роща' },
    { category: categories.parks, coords: [55.786741, 37.530308], comment: 'Ходынское Поле' },
    { category: categories.cafes, coords: [55.810418, 37.518824], comment: 'Хуан Хэ' },
    { category: categories.cafes, coords: [55.804213, 37.520215], comment: 'Eat Market Алкон' },
    { category: categories.cafes, coords: [55.806804, 37.517735], comment: 'АндерСон' },
    { category: categories.cafes, coords: [55.804877, 37.525480], comment: 'ГастроПаб ЧилиЧукиня' },
    { category: categories.cafes, coords: [55.790899, 37.542776], comment: 'Кофемания' },
    { category: categories.cafes, coords: [55.788799, 37.539016], comment: 'Brasserie Lambic' },
    { category: categories.cafes, coords: [55.808539, 37.512517], comment: 'Osteria Mario' },
    { category: categories.cafes, coords: [55.801960, 37.531062], comment: 'Корчма Тарас Бульба' },
    { category: categories.cafes, coords: [55.802882, 37.525313], comment: 'Черчилль паб' },
    { category: categories.cafes, coords: [55.801683, 37.531222], comment: 'Джонджоли' },
    { category: categories.education, coords: [55.807880, 37.515961], comment: 'Инженерно-техническая школа дважды Героя Советского Союза П. Р. Поповича' },
    { category: categories.education, coords: [55.809988, 37.526872], comment: 'Российская открытая академия транспорта Рут МИИТ' },
    { category: categories.education, coords: [55.811628, 37.532888], comment: 'Колледж автомобильного транспорта № 9' },
    { category: categories.education, coords: [55.804837, 37.531778], comment: 'Школа № 1575' },
    { category: categories.education, coords: [55.807245, 37.517611], comment: 'Колледж архитектуры и строительства № 7' },
    { category: categories.education, coords: [55.802453, 37.515629], comment: 'Школа № 1384 имени Леманского' },
    { category: categories.education, coords: [55.799612, 37.508395], comment: 'Школа с углубленным изучением французского языка № 1251' },
    { category: categories.education, coords: [55.801220, 37.518467], comment: 'Школа с углубленным изучением немецкого языка № 1249' },
    { category: categories.education, coords: [55.816796, 37.519912], comment: 'Школа № 213' },
    { category: categories.education, coords: [55.784440, 37.531589], comment: 'Школа № 1409' },
    { category: categories.education, coords: [55.809914, 37.496431], comment: 'Школа с углубленным изучением испанского языка имени Сервантеса № 1252' },
    { category: categories.education, coords: [55.805871, 37.500200], comment: 'Школа № 149 имени Героя Советского Союза Ю. Н. Зыкова' },
    { category: categories.education, coords: [55.802192, 37.529087], comment: 'Московский автомобильно-дорожный государственный технический университет' },
    { category: categories.education, coords: [55.800905, 37.528317], comment: 'Финансовый университет при Правительстве РФ' },
    { category: categories.education, coords: [55.809884, 37.506253], comment: 'Московский технологический институт' },
    { category: categories.education, coords: [55.807408, 37.497853], comment: 'Московская художественно-промышленная академия имени С. Г. Строганова' },
    { category: categories.sports, coords: [55.808992, 37.541590], comment: 'Discovery English Preschool' },
    { category: categories.sports, coords: [55.809119, 37.523239], comment: 'Детский сад при школе № 152' },
    { category: categories.sports, coords: [55.806101, 37.529830], comment: 'Slamikids' },
    { category: categories.sports, coords: [55.807214, 37.520018], comment: 'Детский сад при Инженерно-технической школе' },
    { category: categories.sports, coords: [55.803424, 37.515739], comment: 'Детский сад при школе № 1384' },
    { category: categories.sports, coords: [55.800594, 37.508591], comment: 'Детский сад при школе № 1251' },
    { category: categories.shopping, coords: [55.805812, 37.515043], comment: 'Метромаркет' },
    { category: categories.shopping, coords: [55.801765, 37.531894], comment: 'Галерея Аэропорт' },
    { category: categories.shopping, coords: [55.790491, 37.531373], comment: 'Авиапарк' },
    { category: categories.shopping, coords: [55.823493, 37.497698], comment: 'Метрополис' },
    { category: categories.hospitals, coords: [55.801541, 37.535945], comment: 'Центральная поликлиника Литфонда' },
    { category: categories.hospitals, coords: [55.806971, 37.515678], comment: 'Ист Клини' },
    { category: categories.hospitals, coords: [55.808513, 37.524660], comment: 'Ion Clinic' },
    { category: categories.hospitals, coords: [55.811312, 37.529622], comment: 'Детская клиника РЖД-Медицина' },
    { category: categories.hospitals, coords: [55.797280, 37.540668], comment: 'Медси' },
    { category: categories.sport, coords: [55.798430, 37.520760], comment: 'World Class' },
    { category: categories.sport, coords: [55.810123, 37.506501], comment: 'Национальный Хоккейный центр' },
    { category: categories.sport, coords: [55.807499, 37.511603], comment: 'Undefeated Boxing Gym' },
    { category: categories.sport, coords: [55.792898, 37.520384], comment: 'Tennisteam' },
    { category: categories.sport, coords: [55.792329, 37.522047], comment: 'Плавательный бассейн ЦСКА' },
    { category: categories.sport, coords: [55.785522, 37.541559], comment: 'Encore Fitness' },
    { category: categories.sport, coords: [55.786450, 37.539727], comment: 'Дворец спорта «Мегаспорт», спортивные школы' },
    { category: categories.sport, coords: [55.792155, 37.515917], comment: 'Детская футбольная школа' },
    { category: categories.sport, coords: [55.795193, 37.537724], comment: 'Спортивная школа ЦСКА' },
    { category: categories.sport, coords: [55.791048, 37.560737], comment: 'Школа Бокса' },
    { category: categories.sport, coords: [55.808161, 37.539645], comment: 'Crocus Fitness' }
  ];


  // Функция для создания цветных маркеров
  function getIconLayout(color) {
    return ymaps.templateLayoutFactory.createClass(
      `<div style="width: 17px; height: 17px; background-color: ${color}; border-radius: 50%;"></div>`
    );
  }

  // Создаем кластеризатор (группировка точек)
  var clusterer = new ymaps.Clusterer({
    preset: "islands#brownClusterIcons", // Цвет кластеров
    groupByCoordinates: false, // Группировать ли точки с одинаковыми координатами
    clusterDisableClickZoom: false, // Разрешить зум при клике на кластер
    clusterHideIconOnBalloonOpen: false, // Показывать значки кластеров
    geoObjectHideIconOnBalloonOpen: false // Показывать значки отдельных точек
  });

  var placemarks = [];
  locations.forEach(location => {
    let color = filters.find(f => f.text === location.category)?.color || "white";

    var placemark = new ymaps.Placemark(location.coords, {
      balloonContent: location.comment
    }, {
      iconLayout: "default#imageWithContent",
      iconContentLayout: getIconLayout(color),
      iconImageSize: [30, 30],
      iconImageOffset: [-15, -15]
    });

    placemarks.push({ category: location.category, placemark });
    clusterer.add(placemark); // Добавляем точку в кластеризатор
  });

  map.geoObjects.add(clusterer); // Добавляем кластеризатор на карту

  // Фильтрация маркеров
  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", function () {
      var category = this.getAttribute("data-category");
      clusterer.removeAll(); // Очищаем кластеризатор
      placemarks.forEach(({ category: cat, placemark }) => {
        if (category === "all" || category === cat) {
          clusterer.add(placemark); // Добавляем отфильтрованные точки обратно
        }
      });
    });
  });

  // Кнопки для управления зумом
  document.getElementById("zoom-in").addEventListener("click", function () {
    var currentZoom = map.getZoom();
    if (currentZoom < 19) { // Проверяем максимальный зум
      map.setZoom(currentZoom + 1);
    }
  });

  document.getElementById("zoom-out").addEventListener("click", function () {
    var currentZoom = map.getZoom();
    if (currentZoom > 1) { // Проверяем минимальный зум
      map.setZoom(currentZoom - 1);
    }
  });

  // Добавляем новый маркер с картинкой
  var newMarker = new ymaps.Placemark([55.770846, 37.406369], {
    balloonContent: ''
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'imgs/marker.svg',  // Путь к вашей картинке
    iconImageSize: [70, 100],  // Размер изображения
    iconImageOffset: [-35, -100]  // Смещение, если нужно подправить положение
  });

  // Центрирование карты на новом маркере при его клике
  newMarker.events.add('click', function () {
    map.setCenter([55.770846, 37.406369], 16, { checkZoomRange: true });
  });

  // Добавляем новый маркер на карту
  map.geoObjects.add(newMarker);
}

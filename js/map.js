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
    { category: categories.parks, coords: [55.753352, 37.419802], comment: 'Крылатские холмы' },
    { category: categories.parks, coords: [55.781767, 37.425647], comment: 'Серебряный Бор' },
    { category: categories.parks, coords: [55.775543, 37.405379], comment: 'Набережная Москвы-реки в Крылатском' },
    { category: categories.parks, coords: [55.761789, 37.417785], comment: 'Природно-исторический парк «Москворецкий»' },
    { category: categories.parks, coords: [55.773586, 37.417221], comment: 'Парк Звезд' },
    { category: categories.parks, coords: [55.771471, 37.434683], comment: ' Парк развлечений «Сказка» Крылатская ул., д. 18' },

    { category: categories.cafes, coords: [55.762266, 37.404404], comment: 'Ресторан «Кофемания», Осенняя улица, 11' },
    { category: categories.cafes, coords: [55.752088, 37.435341], comment: 'Ресторан «Кофемания», Крылатская улица, 2, стр. 2' },
    { category: categories.cafes, coords: [55.756094, 37.409262], comment: 'Ресторан «Pro.Хинкали», Осенний бул., 8А ' },
    { category: categories.cafes, coords: [55.751170, 37.412290], comment: 'ESHAK , Рублёвское ш., 42к1' },

    { category: categories.education, coords: [55.757077, 37.317022], comment: 'Областная гимназия им. Е. М. Примакова г. Одинцово, д. Раздоры, ул. Утренняя, 1.' },
    {
      category: categories.education, coords: [55.762366, 37.413161], comment: 'ГБОУ Школа No1371 с углубленным изучением английского языка, Крылатские Холмы ул., 45, корп. 2 '
    },
    { category: categories.education, coords: [55.764828, 37.414256], comment: 'ГБОУ Школа № 1593, Крылатские Холмы ул., 28к1, Крылатская ул., 25 ' },
    { category: categories.education, coords: [55.757523, 37.412674], comment: 'ГБОУ Школа № 1440, Осенний бул., 10к3' },
    {
      category: categories.education, coords: [55.765252, 37.432926], comment: 'Международный лицей THE INTERNATIONAL SCHOOL OF MOSCOWКрылатская ул., 12'
    },
    { category: categories.education, coords: [55.749662, 37.399624], comment: 'ЦГМА УДП РФ (ЦЕНТРАЛЬНАЯ ГОСУДАРСТВЕННАЯ МЕДИЦИНСКАЯ АКАДЕМИЯ УПРАВЛЕНИЯ ДЕЛАМИ ПРЕЗИДЕНТА РФ), Маршала Тимошенко ул., 19 ст1а' },
    { category: categories.education, coords: [55.757040, 37.434638], comment: 'Официальная футбольная академия PARIS SAINT-GERMAIN, Крылатская ул. 2, стр. 22' },

    { category: categories.kindergartens, coords: [55.758590, 37.403952], comment: 'ФГБДОУ Детский сад № 1599 (Федеральное Государственное Бюджетное Дошкольное Образовательное центр развития ребёнка - детский сад № 1599) управление делами Президента РФ, Осенний бул., 7, корп. 4 ' },
    { category: categories.kindergartens, coords: [55.771958, 37.391680], comment: 'ЧОУ «Начальная школа-детский сад», Новое развитие, Крылатская ул., 40, стр. 74' },
    { category: categories.kindergartens, coords: [55.760338, 37.412200], comment: 'ГБОУ Школа № 1371 Крылатское, дошкольное образование, Осенний бул., 16к3' },
    { category: categories.kindergartens, coords: [55.757780, 37.403842], comment: 'ГБОУ Школа № 1371 Крылатское, дошкольное отделение № 5, Осенний бул., 9, корп. 2 ' },
    { category: categories.kindergartens, coords: [55.752132, 37.415167], comment: 'ГБОУ Школа № 1440, корпус № 7 Мир гармонии, Крылатские Холмы ул., 17' },
    { category: categories.kindergartens, coords: [55.765688, 37.414358], comment: 'ГБОУ Школа № 1593, дошкольные группы № 1, Крылатские Холмы ул., 28, корп. 2' },
    { category: categories.kindergartens, coords: [55.765477, 37.409052], comment: 'Вин-Вин Кидс: сеть билингвальных Монтессори детских садов, Крылатские Холмы ул., 36 к2' },

    { category: categories.shopping, coords: [55.766417, 37.381215], comment: 'МТК Европарк, Рублёвское ш., 62 ' },
    { category: categories.shopping, coords: [55.755363, 37.409134], comment: 'Супермаркет «Азбука вкуса», Осенний бул., 8, корп. 1' },
    { category: categories.shopping, coords: [55.759246, 37.409248], comment: 'ТЦ «Крылатский», Осенний бул., 12' },
    { category: categories.shopping, coords: [55.756092, 37.409271], comment: 'Винотека SimpleWine, Осенний бул., 8А' },

    { category: categories.hospitals, coords: [55.749814, 37.389894], comment: 'ФГБУ «Центральная клиническая больница с поликлиникой» Управления делами Президента РФ, Маршала Тимошенко ул., 15' },
    { category: categories.hospitals, coords: [55.715956, 37.889883], comment: 'Городская поликлиника №66, филиал №1: Рублевское шоссе, д. 81' },
    { category: categories.hospitals, coords: [55.725837, 37.806954], comment: 'Городская поликлиника №66, филиал №2: Осенний бул., д. 12, корп. 10' },
    { category: categories.hospitals, coords: [55.762305, 37.405978], comment: 'Детская городская поликлиника №130, филиал №2: Осенний бул., д. 8, корп. 1' },
    { category: categories.hospitals, coords: [55.754026, 37.405923], comment: 'Клиника «Семейная», Рублевское шоссе, д. 48/1.' },
    { category: categories.hospitals, coords: [55.763596, 37.405894], comment: 'Медицинский центр «Медквадрат», Осенний бул., д. 23' },
    { category: categories.hospitals, coords: [55.738438, 37.440091], comment: 'МЕДСИ, Рублевское шоссе, д. 10' },

    { category: categories.sports, coords: [55.754956, 37.435608], comment: 'Гребной канал, Крылатская ул., 2' },
    { category: categories.sports, coords: [55.751752, 37.436331], comment: 'Гольф-клуб «Гребной канал», Крылатская ул., 2, стр. 2 ' },
    { category: categories.sports, coords: [55.763162, 37.433119], comment: 'Велотрек «Крылатское», Крылатская ул., 10' },
    { category: categories.sports, coords: [55.752622, 37.429241], comment: 'Лата Трэк, Крылатская ул., 1.' },
    { category: categories.sports, coords: [55.766571, 37.435366], comment: 'Ледовый дворец «Крылатское», Крылатская ул., дом 16 ' },
    { category: categories.sports, coords: [55.744079, 37.453903], comment: 'Ледовый дворец «Навка Арена», Нижние Мнёвники ул., 10А' },
    { category: categories.sports, coords: [55.764099, 37.433281], comment: 'Триатлон-центр в Крылатском, Крылатская ул., д. 10 стр. 1.' },
    { category: categories.sports, coords: [55.739171, 37.411242], comment: 'WORLD CLASS , Ярцевская ул., 19, Москва, 121552' },
    { category: categories.sports, coords: [55.728317, 37.438629], comment: 'WORLD CLASS, ул. Ивана Франко, 16, Москва, 121467' },
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
      balloonContent: `<div class="balloon_content">${location.comment}</div>`

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

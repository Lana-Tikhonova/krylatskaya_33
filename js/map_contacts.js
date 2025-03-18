ymaps.ready(initMap);

function initMap() {
  var map = new ymaps.Map("map_contacts", {
    center: [55.790, 37.510],
    zoom: 12.5,
    controls: ["zoomControl"],
    options: {
      yandexMapDisablePoiInteractivity: true,
    }
  });
  map.behaviors.disable('scrollZoom');

  // Функция для обновления зума
  function updateZoomAndMarkers() {
    // if (window.matchMedia("(max-width: 576px)").matches) {
    //   map.setZoom(10);
    // } else if (window.matchMedia("(max-width: 992px)").matches) {
    //   map.setZoom(11.5);
    // } else {
    //   map.setZoom(12.5);
    // }
    let zoomLevel;
    let iconOffset;

    if (window.matchMedia("(max-width: 576px)").matches) {
      zoomLevel = 10.5;
      iconOffset = [-21, -58];
      iconSize = [42, 58];
    } else if (window.matchMedia("(max-width: 992px)").matches) {
      zoomLevel = 11.5;
      iconOffset = [-39, -109];
      iconSize = [78, 109];
    } else {
      zoomLevel = 12.5;
      iconOffset = [-42, -117];
      iconSize = [84, 117];
    }

    map.setZoom(zoomLevel);
    newMarker.options.set("iconImageOffset", iconOffset);
    newMarkerTwo.options.set("iconImageOffset", iconOffset);
    newMarker.options.set("iconImageSize", iconSize);
    newMarkerTwo.options.set("iconImageSize", iconSize);
  }

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
    iconImageHref: 'imgs/marker_2.svg',  // Путь к вашей картинке
    iconImageSize: [84, 117],  // Размер изображения
    iconImageOffset: [-42, -117]  // Смещение, если нужно подправить положение
  });
  // Добавляем новый маркер с картинкой
  var newMarkerTwo = new ymaps.Placemark([55.761958, 37.613692], {
    balloonContent: ''
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'imgs/marker_4.png',  // Путь к вашей картинке
    iconImageSize: [84, 117],  // Размер изображения
    iconImageOffset: [-42, -117]  // Смещение, если нужно подправить положение
  });

  // Центрирование карты на новом маркере при его клике
  newMarker.events.add('click', function () {
    map.setCenter([55.770846, 37.406369], 16, { checkZoomRange: true });
  });
  newMarkerTwo.events.add('click', function () {
    map.setCenter([55.761958, 37.613692], 16, { checkZoomRange: true });
  });

  // Добавляем новый маркер на карту
  map.geoObjects.add(newMarker);
  map.geoObjects.add(newMarkerTwo);

  updateZoomAndMarkers();
  window.addEventListener("resize", updateZoomAndMarkers);
}

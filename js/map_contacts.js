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
}

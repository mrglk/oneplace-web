import { Loader } from "@googlemaps/js-api-loader"
import { isWindowSizeSmallerThen } from './utils/helpers';

const mapInfo = document.getElementById('map-info');
const markers = [];

const mapInfoTitle = mapInfo?.querySelector('.js-map-info-title');
const mapInfoPrice = mapInfo?.querySelector('.js-map-info-price');
const mapInfoArea = mapInfo?.querySelector('.js-map-info-area');
const mapInfoDeveloper = mapInfo?.querySelector('.js-map-info-developer');
const mapInfoType = mapInfo?.querySelector('.js-map-info-type');

const mapZoomIn = document.querySelector('.js-map-zoom-in');
const mapZoomOut = document.querySelector('.js-map-zoom-out');

const mapElement = document.getElementById('map');

const DUBAI_BOUNDS = {
  north: 24.1,
  south: 25.9,
  west: 54.1,
  east: 55.9,
};

export async function initMap() {
  const center = isWindowSizeSmallerThen() ? { lat: 25.05, lng: 55.2212638 } : { lat: 25.12, lng: 55.2226371 };

  // window.mapPointsData = [{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/bluewaters-island-1-400x200.jpeg","title":"Bluewaters","price":"$ 780 000","square":"180 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"MERAAS","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.079880, 55.121824","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/1660537919_11-kartinkin-net-p-ostrov-palma-v-dubae-krasivo-foto-11-400x200.jpeg","title":"Palm Jumeirah","price":"$ 183\u2006000","square":"180 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Nakheel","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b \u0438 \u0432\u0438\u043b\u043b\u044b","coordinates":"25.129, 55.11662","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/dubai-creek-golf-club-400x200.webp","title":"Creek Harbour","price":"$ 311 000","square":"78 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Emaar Properties","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.199595, 55.351889","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/1186936-400x200.jpeg","title":"Downtown & Business Bay","price":"$ 205 000","square":"91 \u043c\u0438\u043b\u043b\u0438\u043e\u043d \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Dubai Properties \u0438 Emaar Properties","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.189391, 55.275752","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/2f2c51cd7f2a043def9957a7508616a2-400x200.jpeg","title":"City Walk","price":"$ 191 000","square":"90 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Meraas ","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.204830, 55.263233","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/dubai-hills-golf-club-2_edited-400x200.jpeg","title":"Dubai Hills","price":"$ 182\u2006706","square":"118 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Emaar Properties","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.116778, 55.255032","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/24028-400x200.jpeg","title":"Damac Hills","price":"$ 135\u2006000","square":"42 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u0430 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Damac Properties","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.023374, 55.255526","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/8258336e24215d891f363f76ea3cc06a-400x200.jpeg","title":"Dubai Marina & JLT","price":"$ 309 000","square":"58 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Emaar Properties","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.075610, 55.137687","photo-2x":false},{"photo":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/emaar_beachfront_2-400x200.jpg","title":"Emaar Beachfront","price":"$ 532 000","square":"10 \u043c\u0438\u043b\u043b\u0438\u043e\u043d\u043e\u0432 \u043a\u0432.\u0444\u0443\u0442\u043e\u0432","developer":"Emaar Properties","type":"\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u044b","coordinates":"25.09664, 55.13969","photo-2x":false}];

  if (!mapInfo || !window.mapPointsData) {
    return;
  }

  window.mapPointsData.forEach(({ photo }) => {
    const imageEl = new Image();
    imageEl.src = photo;
  });

  const loader = new Loader( {
    apiKey: 'AIzaSyAwj9E2BjFtV8M0osQwIprJx3giY4vsEK0'
  });

  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const styledMapType = new google.maps.StyledMapType(styledData);

    const map = new Map(mapElement, {
      center,
      zoom: isWindowSizeSmallerThen(800) ? 10 : 12,
      disableDefaultUI: true,
      draggable: true,
      zoomControl: false,
      scrollwheel: false,
      mapId: "4504f8b37365c3d0",
      disableDoubleClickZoom: true,
      restriction: {
        latLngBounds: DUBAI_BOUNDS,
        strictBounds: false,
      },
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    window.mapPointsData.forEach((data, index) => {
      const { coordinates, photo } = data;

      const [lat, lng] = coordinates.split(',').map(e => Number(e.trim()))

      const markerElement = getMarker(index + 1, photo)

      const marker = new AdvancedMarkerElement({
        position: { lat, lng },
        map,
        content: markerElement,
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (e) => showContentInfo(e, data, marker));
    });

    mapZoomIn.addEventListener('click', function() {
      const currentZoom = map.getZoom();

      if (currentZoom > 15) {
        return;
      }

      map.setZoom(currentZoom + 1);
    });

    mapZoomOut.addEventListener('click', function() {
      const currentZoom = map.getZoom();

      if (currentZoom < 8) {
        return;
      }

      map.setZoom(currentZoom - 1);
    });
  })
}

function showContentInfo(e, data, marker) {
  document.querySelector('.map__marker--active')?.classList.remove('map__marker--active')
  e.domEvent.target.closest('.map__marker')?.classList.add('map__marker--active')

  const { title, price, developer, square, type, photo } = data;

  mapInfoTitle.innerText = title;
  mapInfoPrice.innerText = price;
  mapInfoDeveloper.innerText = developer;
  mapInfoType.innerText = type;
  mapInfoArea.innerText = square;

  const mapInfoImg = mapInfo.querySelector('.js-map-info-img');

  const newImage = document.createElement('img');

  newImage.src = photo;
  newImage.classList.add('js-map-info-img');

  mapInfoImg.parentNode.replaceChild(newImage, mapInfoImg);
}

function getMarker(id, image) {
  const content = `
      <div class="map__circle">
        <div class="map__circleImgWrapper">
            <img src="${image}" alt="${id}" />
        </div>
      </div>
      <span class="map__counter">${id}</span>
  `

  const markerElement = document.createElement('div');
  markerElement.innerHTML = content
  markerElement.classList.add('map__marker')

  return markerElement
}

const styledData = [
  {
    'featureType': 'administrative',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#444444',
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [
      {
        'color': '#f2f2f2',
      },
    ],
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [
      {
        'saturation': -100,
      },
      {
        'lightness': 45,
      },
    ],
  },
  {
    'featureType': 'road.highway',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified',
      },
    ],
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'water',
    'elementType': 'all',
    'stylers': [
      {
        'color': '#ddd5cb',
      },
      {
        'visibility': 'on',
      },
    ],
  },
  {
    'featureType': 'all',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off',
      },
      {
        'saturation': '-100',
      },
    ],
  },
];
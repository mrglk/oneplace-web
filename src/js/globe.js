import Globe from 'globe.gl';
import * as THREE from 'three';
import * as topojson from 'topojson-client';

const planetContainer = document.querySelector('.js-planet-container');

const globeCity = document.querySelector('.js-globe-city');
const globeImg = document.querySelector('.js-globe-img');
const globePrice = document.querySelector('.js-globe-price');
const globeNumber = document.querySelector('.js-globe-number');

const globeNext = document.querySelector('.js-globe-next');
const globePrev = document.querySelector('.js-globe-prev');

const planetButtons = document.querySelectorAll('.js-planet-button');



export function initGlobe() {

  // window.planetCityData = [{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/planet-item-250x224.jpg","name":"\u0414\u0443\u0431\u0430\u0439","price":"7 000 $","coordinates":"25.0657, 55.1713","image_2x":false,"id":0},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/12-250x167.jpeg","name":"\u041d\u044c\u044e-\u0419\u043e\u0440\u043a","price":"19 000 $","coordinates":"40.7143, -74.006","image_2x":false,"id":1},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/gonkong-kitay-250x167.jpeg","name":"\u0413\u043e\u043d\u043a\u043e\u043d\u0433","price":"44 000 $ ","coordinates":"22.17, 114.9","image_2x":false,"id":2},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/dq_cveivyaatxoj-250x159.jpeg","name":"\u041b\u043e\u043d\u0434\u043e\u043d","price":"20 000 $","coordinates":"51.5085, -0.12574","image_2x":false,"id":3},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/02521545585fdfc715d2cf4b52d1c9a44593cbfb-250x141.webp","name":"\u041c\u043e\u0441\u043a\u0432\u0430","price":"13 000 $","coordinates":"55.7522, 37.6156","image_2x":false,"id":4},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/e0f386a982dc5fd40eb7c4120bdf7ed9-250x167.jpeg","name":"\u0421\u0438\u043d\u0433\u0430\u043f\u0443\u0440","price":"11 000 $","coordinates":"1.28967, 103.85","image_2x":false,"id":5},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/2019_beautiful_eiffel_tower_in_paris_on_a_background_of_purple_sky_131779_-2-250x182.jpeg","name":"\u041f\u0430\u0440\u0438\u0436","price":"13 000 $","coordinates":"48.8534, 2.3488","image_2x":false,"id":6},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/25509950640_11b840b96c_b-250x188.jpeg","name":"\u0428\u0430\u043d\u0445\u0430\u0439","price":"16 000 $","coordinates":"31.2222, 121.458","image_2x":false,"id":7},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/1685318800_happylove-top-p-tokio-luchshie-mesta-instagram-65-250x167.jpeg","name":"\u0422\u043e\u043a\u0438\u043e","price":"32 000 $","coordinates":"35.6895, 139.692","image_2x":false,"id":8},{"image":"http:\/\/op-ru.finik.org\/wp-content\/uploads\/2023\/05\/adobestock_178772900-2-250x167.jpeg","name":"\u041c\u043e\u043d\u0430\u043a\u043e","price":"44 000 $","coordinates":"43.7333, 7.41667","image_2x":false,"id":9}];

  if (!planetContainer || !window.planetCityData) {
    return;
  }

  globeNext?.addEventListener('click', function() {
    const activeElement = document.querySelector('.planet__button--active')

    if (!activeElement) {
      return
    }

    const currentId = Number(activeElement.dataset.id)
    const nextId =  currentId >= window.planetCityData.length - 1 ? 0 : currentId + 1

    const current = gData.find((item) => +item.id === nextId)

    if (!current) {
      return
    }

    changePoint(current)
  });

  globePrev?.addEventListener('click', function() {
    const activeElement = document.querySelector('.planet__button--active')

    if (!activeElement) {
      return
    }

    const currentId = Number(activeElement.dataset.id)
    const nextId =  currentId < 1 ? window.planetCityData.length - 1 : currentId - 1

    const current = gData.find((item) => +item.id === nextId)

    if (!current) {
      return
    }

    changePoint(current)
  });

  const gData = window.planetCityData.map((item) => {
    const [lat, lng] = item.coordinates.split(',').map(e => e.trim());

    return {
      ...item,
      lat,
      lng,
      size: 8,
      color: 'white',
    };
  });

  const [lat, lng] = window.planetCityData[0].coordinates.split(',').map(e => Number(e.trim()));

  const markers = []

  const world = Globe()
  (planetContainer)
    .backgroundColor('rgba(0,0,0,0)')
    .showGlobe(true)
    .showAtmosphere(false)
    .width(planetContainer.clientWidth)
    .height(planetContainer.clientHeight)
    .pointOfView({ lat, lng, altitude: 1.4 })
    .htmlElementsData(gData)
    .htmlElement(d => {
      const marker = document.createElement('div');

      marker.id = `planet-marker-${d.id}`
      marker.classList.add('planet__marker');
      marker.addEventListener('click', function() {
        changePoint(d)
      });

      // if (+d.id === 0) {
      //   marker.classList.add('planet__marker--active');
      // }

      markers.push(marker)

      return marker;
    })
    .onZoom(() => {
      // if (markers?.[0]) {
      //   markers[0].parentElement.style.overflow = 'hidden';
      // }

      // markers.forEach((marker) => {
      //   marker.classList.remove('planet__marker--active')
      // })
    })

  const controls = world.controls();
  controls.enableZoom = false;

  fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
    .then(landTopo => {
      world
        .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
        .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: '#3D495C', side: THREE.DoubleSide }))
        .polygonSideColor(() => '#3D495C')
        .globeMaterial().color = new THREE.Color('#A5CEDA');

    });

  window.addEventListener('resize', function() {
    world.width(planetContainer.clientWidth);
    world.height(planetContainer.clientHeight);
  });

  planetButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const id = Number(button.dataset.id)
      const current = gData.find((item) => +item.id === id)

      button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

      if (!current) {
        return
      }

      changePoint(current)
    })
  })

  function changePoint(e) {
    const {name, price, image, id, lat, lng} = e

    world.pointOfView({ lat, lng, altitude: 1.4 } , 900)

    // setTimeout(() => {
    //   markers.forEach((marker) => {
    //     marker.classList.toggle('planet__marker--active', +marker.id.split('-').pop() === id)
    //   })
    // }, 1000)
    //
    // if (markers[0]) {
    //   markers[0].parentElement.style.overflow = 'visible';
    // }

    globeCity.innerText = name
    globePrice.innerText = price
    globeImg.src = image

    globeNumber.innerText = String(id + 1).padStart(2, '0')

    planetButtons.forEach((button, i) => {
      button.classList.toggle('planet__button--active', Number(button.dataset.id) === Number(id))

      if (Number(button.dataset.id) === Number(id)) {
        button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    })
  }
}

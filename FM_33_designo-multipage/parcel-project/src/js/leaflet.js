const map1 = L.map('canada').setView([43.643952224225934, -79.3945280750382], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map1);
const marker1 = L.marker([43.643952224225934, -79.3945280750382]).addTo(map1);

const map2 = L.map('australia').setView([-30.329316349345092, 149.78823871074349], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);
const marker2 = L.marker([-30.329316349345092, 149.78823871074349]).addTo(map2);

const map3 = L.map('uk').setView([51.7328868726512, -3.861760888158896], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map3);
const marker3 = L.marker([51.7328868726512, -3.861760888158896]).addTo(map3);

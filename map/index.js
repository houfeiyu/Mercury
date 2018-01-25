/**
 * Created by houfe on 2017/10/11.
 */

var host = "http://localhost:8090";
var map;
var vec, cva, img, cia;
var mapLayers;
var queryUrl = "http://localhost:8090/iserver/services/map-poi/rest/maps/poi";
var queryLayerName="poi@data";

function load() {
    map = L.map('map', {
        center: [29.460353851318363,109.42691802978516],
        zoom: 13,
        crs: L.CRS.TianDiTu_WGS84,
        zoomControl:false,
        logoControl:false,
        attributionControl:false
    });

    initSearch(queryUrl,queryLayerName);

    vec = L.tdtLayer({layer: "vec",iconURL: 'http://t1.tianditu.com/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=c&format=tiles&width=256&height=256&layer=vec&tilematrix=13&tilerow=1376&tilecol=6585'});
    cva = L.tdtLayer({layer: "vec", isLabel: true});
    img = L.tdtLayer({layer: "img",iconURL: 'http://t6.tianditu.com/img_c/wmts?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=c&format=tiles&width=256&height=256&layer=img&tilematrix=13&tilerow=1377&tilecol=6589'});
    cia = L.tdtLayer({layer: "img", isLabel: true});

    var basemaps = [[vec, cva], [img, cia]];
    map.addControl(L.control.basemaps({
        position: "topright",
        basemaps: basemaps
    }));

    L.control.mousePosition({
        position: "bottomright",
        separator: "，",
        lngFirst: true,
        numDigits: 2
    }).addTo(map);

    L.control.scale().addTo(map);
    L.control.zoomwithLevel({position:"bottomleft"}).addTo(map);

}







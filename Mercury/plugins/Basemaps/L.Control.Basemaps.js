L.Control.Basemaps = L.Control.extend({
    _map: null,
    includes: L.Evented ? L.Evented.prototype: L.Mixin.Event,
    options: {
        position: 'bottomright',
        tileX: 0,
        tileY: 0,
        tileZ: 0,
        layers: []  // list of basemap layer objects, first in list is default and added to map with this control
    },
    basemap: null,
    onAdd: function (map) {
        this._map = map;
        var container = L.DomUtil.create('div', 'basemaps leaflet-control closed');

        // disable events
        L.DomEvent.disableClickPropagation(container);
        if (!L.Browser.touch) {
            L.DomEvent.disableScrollPropagation(container);
        }

        this.options.basemaps.forEach(function(d, i){

            var basemapClass = 'basemap';

            if (i === 0) {
                this.basemap = d;
                this._map.addLayer(d[0]);
                this._map.addLayer(d[1]);
                basemapClass += ' active';
            }
            else if (i === 1) {
                basemapClass += ' alt'
            }

            if (d[0].options.iconURL) {
                url = d[0].options.iconURL;
                console.log('url is: ', url);
            }



            var basemapNode = L.DomUtil.create('div', basemapClass, container);
            var imgNode = L.DomUtil.create('img', null, basemapNode);
            var labelNode = L.DomUtil.create('div', null, basemapNode);
            if(i===0){ labelNode.innerText="地图"}else{ labelNode.innerText="影像"}

            imgNode.src = url;
            if (d[0].options && d[0].options.label) {
                imgNode.title = d[0].options.label;
            }

            L.DomEvent.on(basemapNode, 'click', function() {
                //if different, remove previous basemap, and add new one
                if (d != this.basemap) {
                    map.removeLayer(this.basemap[0]);
                    map.removeLayer(this.basemap[1]);
                    map.addLayer(d[0]);
                    map.addLayer(d[1]);
                    d[0].bringToBack();
                    map.fire('baselayerchange', d[0]);

                    this.basemap = d;

                    L.DomUtil.removeClass(document.getElementsByClassName('basemap active')[0], 'active');
                    L.DomUtil.addClass(basemapNode, 'active');

                    var altIdx = (i+1) % this.options.basemaps.length;
                    L.DomUtil.removeClass(document.getElementsByClassName('basemap alt')[0], 'alt');
                    L.DomUtil.addClass(document.getElementsByClassName('basemap')[altIdx], 'alt');
                }
            }, this);

        }, this);

        if (this.options.basemaps.length > 1) {
            L.DomEvent.on(container, 'mouseenter', function () {
                L.DomUtil.removeClass(container, 'closed');
            }, this);

            L.DomEvent.on(container, 'mouseleave', function () {
                L.DomUtil.addClass(container, 'closed');
            }, this);
        }

        this._container = container;
        return this._container;
    }
});

L.control.basemaps = function (options) {
  return new L.Control.Basemaps(options);
};

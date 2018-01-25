L.TDTLayer = L.GridLayer.extend({
    url: {
        "tdt_vec": "http://t0.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}",
        "tdt_cva": "http://t0.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}",
        "tdt_img": "http://t0.tianditu.com/DataServer?T=img_c&x={x}&y={y}&l={z}",
        "tdt_cia": "http://t0.tianditu.com/DataServer?T=cia_c&x={x}&y={y}&l={z}",

        "sheng0_vec":"http://222.247.40.204:8091/iserver/services/map-vec/wmts?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=Custom_vec&format=image%2Fpng&width=256&height=256&layer=vec&tilematrix={z}&tilerow={y}&tilecol={x}",
        "sheng0_cva":"http://222.247.40.204:8091/iserver/services/map-cva/wmts?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=Custom_cva&format=image%2Fpng&width=256&height=256&layer=cva&tilematrix={z}&tilerow={y}&tilecol={x}",
        "sheng_img":"http://222.247.40.204:8091/iserver/services/map-img/wmts?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=Custom_img&format=image%2Fpng&width=256&height=256&layer=img&tilematrix={z}&tilerow={y}&tilecol={x}",
        "sheng_cia":"http://222.247.40.204:8091/iserver/services/map-cia/wmts?service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=Custom_cia&format=image%2Fpng&width=256&height=256&layer=cia&tilematrix={z}&tilerow={y}&tilecol={x}",

        "sheng_vec": "http://www.dzmap.cn/OneMapServer/rest/services/vector_service/MapServer/tile/{z}/{y}/{x}",
        "sheng_cva": "http://www.dzmap.cn/OneMapServer/rest/services/vector_ant/MapServer/tile/{z}/{y}/{x}",
        "sheng0_img": "http://www.dzmap.cn/OneMapServer/rest/services/img_service/MapServer/tile/{z}/{y}/{x}",
        "sheng0_cia": "http://www.dzmap.cn/OneMapServer/rest/services/img_ant/MapServer/tile/{z}/{y}/{x}",

        "shi_vec": "http://www.csmap.gov.cn/arcgis/rest/services/vmap_pub/MapServer/tile/{z}/{y}/{x}",
        "shi_cva": "http://www.csmap.gov.cn/arcgis/rest/services/vmapzj_pub/MapServer/tile/{z}/{y}/{x}",
        "shi_img": "http://www.csmap.gov.cn/arcgis/rest/services/yingxiangditu/MapServer/tile/{z}/{y}/{x}",
        "shi_cia": "http://www.csmap.gov.cn/arcgis/rest/services/yingxiangdituzhuji/MapServer/tile/{z}/{y}/{x}"
    },

    zOffset: {


        "tdt_vec":  0,
        "tdt_cva":  0,
        "tdt_img":  0,
        "tdt_cia":  0,

        "sheng0_vec":0,
        "sheng0_cva":0,
        "sheng0_img":-1,
        "sheng0_cia":-1,

        "sheng_vec":-1,
        "sheng_cva":-1,
        "sheng_img":-1,
        "sheng_cia":-1,
        "shi_vec":  0,
        "shi_cva":  0,
        "shi_img":  0,
        "shi_cia":  0
    },

    options: {
        layer:"vec",
        isLabel:false,
        // @option minZoom: Number = 0
        // Minimum zoom number.
        minZoom: 0,

        // @option maxZoom: Number = 18
        // Maximum zoom number.
        maxZoom: 19,

        // @option maxNativeZoom: Number = null
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: null,

        // @option minNativeZoom: Number = null
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: null,

        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: 'abc',

        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: '',

        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,

        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: false,

        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: false,

        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: false,

        // @option crossOrigin: Boolean = false
        // If true, all tiles will have their crossOrigin attribute set to ''. This is needed if you want to access tile pixel data.
        crossOrigin: false,
    },

    initialize: function (options) {
        this._url = this.url.tdt_vec;

        options = L.setOptions(this, options);

        // detecting retina displays, adjusting tileSize and zoom levels
        if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

            options.tileSize = Math.floor(options.tileSize / 2);

            if (!options.zoomReverse) {
                options.zoomOffset++;
                options.maxZoom--;
            } else {
                options.zoomOffset--;
                options.minZoom++;
            }

            options.minZoom = Math.max(0, options.minZoom);
        }

        if (typeof options.subdomains === 'string') {
            options.subdomains = options.subdomains.split('');
        }

        // for https://github.com/Leaflet/Leaflet/issues/137
        if (!L.Browser.android) {
            this.on('tileunload', this._onTileRemove);
        }
    },

    // @method setUrl(url: String, noRedraw?: Boolean): this
    // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
    //setUrl: function (noRedraw) {
    //    this._url = this.url.tdt_vec;
    //
    //    if (!noRedraw) {
    //        this.redraw();
    //    }
    //    return this;
    //},

    // @method createTile(coords: Object, done?: Function): HTMLElement
    // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
    // to return an `<img>` HTML element with the appropiate image URL given `coords`. The `done`
    // callback is called when the tile has been loaded.
    createTile: function (coords, done) {
        var tile = document.createElement('img');

        L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
        L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

        if (this.options.crossOrigin) {
            tile.crossOrigin = '';
        }

        /*
         Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
         http://www.w3.org/TR/WCAG20-TECHS/H67
         */
        tile.alt = '';

        /*
         Set role="presentation" to force screen readers to ignore this
         https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
         */
        tile.setAttribute('role', 'presentation');

        tile.src = this.getTileUrl(coords);

        return tile;
    },

    // @section Extension methods
    // @uninheritable
    // Layers extending `TileLayer` might reimplement the following method.
    // @method getTileUrl(coords: Object): String
    // Called only internally, returns the URL for a tile given its coordinates.
    // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
    getTileUrl: function (coords) {
        var data = {
            r: L.Browser.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: coords.z
        };
        var tileUrl=this.url;
        if(this.options.isLabel){

            if(this.options.layer=="vec"){
                if(data.z < 14){
                    tileUrl = tileUrl.tdt_cva;
                    data.z = data.z+this.zOffset.tdt_cva;
                } else if( data.z < 19){
                    tileUrl = tileUrl.sheng0_cva;
                    data.z = data.z+this.zOffset.sheng0_cva;
                } else {
                    tileUrl = tileUrl.shi_cva;
                    data.z = data.z+this.zOffset.shi_cva;
                }
            } else if(this.options.layer=="img"){
                if(data.z < 14){
                    tileUrl = tileUrl.tdt_cia;
                    data.z = data.z+this.zOffset.tdt_cia;
                } else if( data.z < 19){
                    tileUrl = tileUrl.sheng0_cia;
                    data.z = data.z+this.zOffset.sheng0_cia;
                } else {
                    tileUrl = tileUrl.shi_cia;
                    data.z = data.z+this.zOffset.shi_cia;
                }
            }
        } else {
            if(this.options.layer=="vec"){
                if(data.z < 14){
                    tileUrl = tileUrl.tdt_vec;
                    data.z = data.z+this.zOffset.tdt_vec;
                } else if( data.z < 19){
                    tileUrl = tileUrl.sheng0_vec;
                    data.z = data.z+this.zOffset.sheng0_vec;
                }else {
                    tileUrl = tileUrl.shi_vec;
                    data.z = data.z+this.zOffset.shi_vec;
                }
            } else if(this.options.layer=="img"){
                if(data.z < 14){
                    tileUrl = tileUrl.tdt_img;
                    data.z = data.z+this.zOffset.tdt_img;
                } else if( data.z < 19){
                    tileUrl = tileUrl.sheng0_img;
                    data.z = data.z+this.zOffset.sheng0_img;
                } else {
                    tileUrl = tileUrl.shi_img;
                    data.z = data.z+this.zOffset.shi_img;
                }
            }
        }
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        return L.Util.template(tileUrl, L.extend(data, this.options));
    },

    _tileOnLoad: function (done, tile) {
        // For https://github.com/Leaflet/Leaflet/issues/3332
        if (L.Browser.ielt9) {
            setTimeout(L.bind(done, this, null, tile), 0);
        } else {
            done(null, tile);
        }
    },

    _tileOnError: function (done, tile, e) {
        var errorUrl = this.options.errorTileUrl;
        if (errorUrl && tile.src !== errorUrl) {
            tile.src = errorUrl;
        }
        done(e, tile);
    },

    getTileSize: function () {
        var map = this._map,
            tileSize = L.GridLayer.prototype.getTileSize.call(this),
            zoom = this._tileZoom + this.options.zoomOffset,
            minNativeZoom = this.options.minNativeZoom,
            maxNativeZoom = this.options.maxNativeZoom;

        // decrease tile size when scaling below minNativeZoom
        if (minNativeZoom !== null && zoom < minNativeZoom) {
            return tileSize.divideBy(map.getZoomScale(minNativeZoom, zoom)).round();
        }

        // increase tile size when scaling above maxNativeZoom
        if (maxNativeZoom !== null && zoom > maxNativeZoom) {
            return tileSize.divideBy(map.getZoomScale(maxNativeZoom, zoom)).round();
        }

        return tileSize;
    },

    _onTileRemove: function (e) {
        e.tile.onload = null;
    },

    _getZoomForUrl: function () {
        var zoom = this._tileZoom,
            maxZoom = this.options.maxZoom,
            zoomReverse = this.options.zoomReverse,
            zoomOffset = this.options.zoomOffset,
            minNativeZoom = this.options.minNativeZoom,
            maxNativeZoom = this.options.maxNativeZoom;

        if (zoomReverse) {
            zoom = maxZoom - zoom;
        }

        zoom += zoomOffset;

        if (minNativeZoom !== null && zoom < minNativeZoom) {
            return minNativeZoom;
        }

        if (maxNativeZoom !== null && zoom > maxNativeZoom) {
            return maxNativeZoom;
        }

        return zoom;
    },

    _getSubdomain: function (tilePoint) {
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    },

    // stops loading all tiles in the background layer
    _abortLoading: function () {
        var i, tile;
        for (i in this._tiles) {
            if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;

                tile.onload = L.Util.falseFn;
                tile.onerror = L.Util.falseFn;

                if (!tile.complete) {
                    tile.src = L.Util.emptyImageUrl;
                    L.DomUtil.remove(tile);
                }
            }
        }
    }
});

L.tdtLayer = function (options) {
    return new L.TDTLayer(options);
};
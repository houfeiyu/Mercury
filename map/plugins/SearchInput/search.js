var pageSize = 10;
var currentPage = 0;
var _queryUrl ;
var _queryLayerName;
var markersLayer;
var iconUrl;

function initSearch(url,layername) {
    _queryUrl=url;
    _queryLayerName=layername;
    markersLayer = new L.LayerGroup();
    map.addLayer(markersLayer);
    iconUrl = "";
    if(typeof(rootPath) == "undefined"){
        iconUrl = 'plugins/SearchInput/img/icons/';
    }else{
        iconUrl = rootPath + 'plugins/SearchInput/img/icons/';
    }
   // t();
}

function closeResult() {
    markersLayer.clearLayers();
    document.getElementById("searchValueDiv").value = "";
    document.getElementById("searchResultPanelDiv").style.display = "none";

}

function queryPoi() {
    //清除所有marker
    markersLayer.clearLayers();
    currentPage=0;

    var searchContent = document.getElementById("searchValueDiv").value;
    if (searchContent != "") {
        var param = new SuperMap.QueryBySQLParameters({
            expectCount: 1000,
            startRecord: 0,
            queryParams: {
                name: _queryLayerName,
                fields: ["SmID", "SmX", "SmY", "NAME", "ADDRESS", "TELEPHONE"],
                queryOption: SuperMap.QueryOption.ATTRIBUTE,
                attributeFilter: "NAME like '%" + searchContent + "%'"
            }
        });
        L.supermap
            .queryService(_queryUrl)
            .queryBySQL(param, function (serviceResult) {
                showResultOnList(serviceResult);
                document.getElementById("searchResultPanelDiv").style.display = "block";

                //var result = serviceResult.result;
                //resultLayer = L.geoJSON(result.recordsets[0].features).addTo(map);
            });

    }


}
var currentFeatures;
function showResultOnList(serviceResult) {
    var totalNumb = serviceResult.result.totalCount;
    document.getElementById("red").innerHTML = totalNumb;
    currentFeatures = serviceResult.result.recordsets[0].features.features;
    addContOnList(currentFeatures, currentPage);
    addPtsOnMap(currentFeatures, currentPage);

    $("#Pagination").pagination(totalNumb, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 1, //主体页数
        callback: pageselectCallback,
        prev_text: "&lt; 上一页",
        next_text: "下一页 &gt;",
        prev_show_always: false,
        next_show_always: false,
        items_per_page: pageSize, //每页显示10项
        current_page: currentPage
    });
}
function pageselectCallback(page_index) {
    markersLayer.clearLayers();
    addContOnList(currentFeatures, page_index);
    addPtsOnMap(currentFeatures, page_index);
}
function addContOnList(features, currentPage) {
    document.getElementById("poilist").innerHTML = "";
    var divcont = "";
    if (features.length > 0) {
        var index = 1;
        for (var i = currentPage * pageSize; i < currentPage * pageSize + pageSize && i < features.length; i++) {
            divcont += "<div class=\"seatext\" onclick=\"getpoi("
                + index + ")\">" +
                " <div class=\"id fl\">"
                + index + "</div> " +
                "<ul class=\"ad fl\"> " +
                "<li><em>" + features[i].properties["NAME"] + "</em></li> </ul>" +
                " <div class=\"b fl\"> <a href=\"javascript:;\"></a> </div> <div class=\"clear\"> </div> </div>";
            index++;
        }
        document.getElementById("poilist").innerHTML = divcont;
    }
}
function getpoi(index){
    map.setView(markersLayer.getLayers()[index-1].getLatLng());
    markersLayer.getLayers()[index-1].openPopup();


}
function addPtsOnMap(features, currentPage) {
    if (features.length > 0) {
        var index = 1;
        var Bounds=[];
        for (var i = currentPage * pageSize; i < currentPage * pageSize + pageSize && i < features.length; i++) {
               var Icon = L.icon({
                    iconUrl: iconUrl+index+'_r.png',
                    iconSize: [25, 32], // size of the icon

                    popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
                });
            marker = new L.Marker(new L.latLng(features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]), {title: features[i].properties.NAME, icon: Icon});//se property searched
            marker.bindPopup(features[i].properties.NAME);
            markersLayer.addLayer(marker);
            Bounds.push([features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]]);
            index++;
        }
        map.fitBounds(Bounds);
        //map.setView(markersLayer.getLayers()[0].getLatLng());
    }
}


/* 2018-1-8 08:17:07 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683】 */
L.widget.bindClass(L.widget.BaseWidget.extend({map:null,options:{resources:["view.css"],view:{type:"append",url:"view.html",parent:"body"}},winCreateOK:function(t,i){var e=this;$("#btn_mapCompare_sp").click(function(){$("#centerDiv").css({height:"100%",width:"50%"}),$("#centerDivEx").css({top:"0px",bottom:"0px",right:"0px",height:"100%",width:"50%"}),e.invalidateSize(),e.mapEx.invalidateSize(!1)}),$("#btn_mapCompare_cz").click(function(){$("#centerDiv").css({height:"50%",width:"100%"}),$("#centerDivEx").css({top:"50%",bottom:"0px",right:"0px",height:"50%",width:"100%"}),e.invalidateSize(),e.mapEx.invalidateSize(!1)}),$("#btn_mapCompare_close").click(function(){e.disableBase()})},mapEx:null,activate:function(){var t='<div id="centerDivEx" style="position:absolute;right:0px;top:0px;border:1px solid #ccc;top: 0px;bottom: 0px;width:50%;overflow: hidden;"><div id="mapEx" style="height:100%;width:100%;overflow: hidden;"></div></div>';$("body").append(t),$("#centerDiv").css({position:"absolute",height:"100%",width:"50%"}),this.invalidateSize();var i=this.map.gisdata.config;this.mapEx=L.mars.createMap({id:"mapEx",data:i});for(var e in this.mapEx.gisdata.baselayers){var a=this.mapEx.gisdata.baselayers[e];if(!a.config.visible&&(null==a.config.crs||a.config.crs==i.crs)){this.mapEx.addLayer(a);break}}this.mapEx.gisdata.controls.layer||L.control.layers(this.mapEx.gisdata.baselayers,this.mapEx.gisdata.overlayers,{position:"topleft"}).addTo(this.mapEx),this.map.on("drag",this._map_extentChangeHandler,this),this.map.on("zoomend",this._map_extentChangeHandler,this),this.mapEx.on("drag",this._mapEx_extentChangeHandler,this),this.mapEx.on("zoomend",this._mapEx_extentChangeHandler,this),this._map_extentChangeHandler()},disable:function(){this.map.off("drag",this._map_extentChangeHandler,this),this.map.off("zoomend",this.map_extentChangeDTDBHandler,this),this.mapEx.off("drag",this._mapEx_extentChangeHandler,this),this.mapEx.off("zoomend",this.map1_extentChangeDTDBHandler,this),$("#centerDivEx").remove(),$("#btnMapComType").remove(),$("#centerDiv").css({position:"",height:"100%",width:"100%"}),this.invalidateSize()},invalidateSize:function(){var t=this.map;setTimeout(function(){t.invalidateSize(!1)},100)},_map_extentChangeHandler:function(t){this.map.stop(),this.mapEx.stop(),this.mapEx.setView(this.map.getCenter(),this.map.getZoom())},_mapEx_extentChangeHandler:function(t){this.map.stop(),this.mapEx.stop(),this.map.setView(this.mapEx.getCenter(),this.mapEx.getZoom())}}));
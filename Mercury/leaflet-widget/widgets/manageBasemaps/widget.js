/* 2018-1-2 08:18:59 | 版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683】 */
L.widget.bindClass(L.widget.BaseWidget.extend({map:null,options:{view:{type:"window",url:"view.html",windowOptions:{width:190,height:160}}},create:function(){for(var e=0,i=this.getBasemaps(),t=0;t<i.length;t++){var a=i[t];null!=a.name&&""!=a.name&&null!=a._layer&&e++}e<7?this.options.view.windowOptions={width:190,height:100*Math.ceil(e/2)+60}:this.options.view.windowOptions={width:360,height:105*Math.ceil(e/4)+60}},viewWindow:null,winCreateOK:function(e,i){this.viewWindow=i},activate:function(){},disable:function(){},getBasemaps:function(){return this.map.gisdata.config.basemaps},getLayerVisible:function(e){return this.map.hasLayer(e)},updateLayerVisible:function(e,i){if(null!=e.config.crs&&this.map.gisdata.config.crs!=e.config.crs){var t=this.map.convert2wgs(this.map.getCenter()),a=t[0]+","+t[1]+","+this.map.getZoom(),n=window.location.href;n.lastIndexOf("#")!=-1&&(n=n.replace(window.location.hash,"").replace("#",""));var s=n.lastIndexOf("?");s!=-1&&(n=n.substring(0,s)),this.map.remove();var o=n+"?center="+a+"&baselayer="+e.config.name,r=haoutil.system.getRequest();for(var h in r)"center"!=h&&"baselayer"!=h&&(o+="&"+h+"="+r[h]);return void(window.location.href=o)}i?this.map.addLayer(e):this.map.removeLayer(e)}}));
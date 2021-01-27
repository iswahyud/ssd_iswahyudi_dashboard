let idxPosisi=1;
App = {
    buttonCount: 1,
    // bottom of state
    // initiate menu
	init: async function(){
        // Login.setchecksession();
        markers = [];
        webix.codebase = "./";

       await this.createLayout();
       Highcharts.setOptions({
            // time:{
            //     timezone: 'Europe/London'
            // },
            // global: { 
            //             useUTC: false // true by default
            //         },
            lang: {
                decimalPoint: '.',
                thousandsSep: ','
            }
        });

         this.faskesmenu.init();
        //  this.graphmenu.init();
    },

    // ------------- Faskes Menu -------------
    faskesmenu:{
        init:async function (){
            // init app
            this.state = {};
            // init element
            this.map = await $$("map-mapfaskes").getMap(true);             
            this.mapelement = $$("map-mapfaskes");

            // webix.extend(this.map, webix.ProgressBar); //komponen loading untuk label temperature dan noise
            webix.extend(this.mapelement, webix.ProgressBar);

            this.markers = [];

            // init data
            this.loaddata();
            
        },
        loaddata: async function(){

            this.loadmarkerfaskes();
            this.loadpolygonfaskes();
            this.loadsearchfaskes();

            if(webix.fullscreen._view!=undefined){
                if(webix.fullscreen._view.config.view=="datatable"){
                    var tempEvent = $$(webix.fullscreen._view.config.id).attachEvent("onAfterLoad",function(){
                        $$(webix.fullscreen._view.config.id).data.each(function(row){
                            row.$height = 30;
                        })
                        $$(webix.fullscreen._view.config.id).refresh();
                        $$(webix.fullscreen._view.config.id).detachEvent(tempEvent);
                    })
                }
            }
        },
        loadmarkerfaskes: async function(){
            webix.extend($$("map-mapfaskes"), webix.ProgressBar);
            $$("map-mapfaskes").disable();
            $$("map-mapfaskes").showProgress({type:"icon"});

            var map = await $$("map-mapfaskes").getMap(true);

            webix.ajax("api/php/getmap.php", function(text, data, XmlHttpRequest){
                var datas =  JSON.parse(text);
                // console.log(datas);
                
                App.faskesmenu.markers = [];

                for (var i = 0; i < App.faskesmenu.markers.length; i++) {
                    if(App.faskesmenu.markers[i].getMap()!=null)
                        App.faskesmenu.markers[i].setMap(null);
                };

                var iconBase = 'images/';
                var icons = {
                        url:iconBase + 'hospital.png',
                        scaledSize:  new google.maps.Size(40, 40),
                };

                datas.forEach(function(data){
                    
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
                        icon: icons,
                        map: map,
                        optimized: false,
                    });

                    // console.log(marker);
                    // marker.setValues({siteid: data.siteid, siteclass: data.class});
                    // // marker.setAnimation(google.maps.Animation.BOUNCE);
                    
                    var infowindow = new google.maps.InfoWindow({
                        content: "<b>"+ data.nama_faskes + "<br>"+ data.alamat +" <br>"+ data.nomor_telepon
                    });

                    marker.addListener('mouseover', function() {
                        infowindow.open(map, marker);
                    });
                    marker.addListener('mouseout', function() {
                        infowindow.close();
                    });
                    
                    App.faskesmenu.markers.push(marker);

                    marker.addListener('click', function(e) {
                        webix.ui({
                            view:"window",
                            // left:e.xa.clientX, 
                            // top:e.xa.clientY,
                            // left:e.ya.clientX, 
                            // top:e.ya.clientY,
                            position:"center",
                            head:{
                                view:"toolbar", cols:[
                                    { view:"label", label: data.nama_faskes},
                                    { view:"button", label: 'X', autowidth: true, align: 'right', click:function(){ this.getTopParentView().close() }}
                                ]
                            },
                            body:{
                                    rows:[ 
                                        {
                                            view:"label", label: "<b>Alamat: "+ data.alamat
                                        },
                                        {
                                            view:"label", label: "<b>Nomor Telepon: "+ data.nomor_telepon 
                                        },
                                    ],
                            }
                        }).show();
                    });
                });

                App.faskesmenu.setcenter();
                map.setZoom(12);
                $$("map-mapfaskes").hideProgress();
                $$("map-mapfaskes").enable();       
            });
        },
        loadsearchfaskes: async function(){
            webix.extend($$("map-mapfaskes"), webix.ProgressBar);
            $$("map-mapfaskes").disable();
            $$("map-mapfaskes").showProgress({type:"icon"});

            var faskes = $$("getFaskes").getValue();
            
            if(!$$("mapfaskes_btnhidesearch").isVisible()){
                $$("mapfaskes_btnhidesearch").show();
            }
            
            var map = await $$("map-mapfaskes").getMap(true);

            webix.ajax("api/php/getmapsearch.php",{faskes:faskes}, function(text, data, XmlHttpRequest){
                var datas =  JSON.parse(text);
                // console.log(datas);
                
                App.faskesmenu.markers = [];

                for (var i = 0; i < App.faskesmenu.markers.length; i++) {
                    if(App.faskesmenu.markers[i].getMap()!=null)
                        App.faskesmenu.markers[i].setMap(null);
                };

                var iconBase = 'images/';
                var icons = {
                        url:iconBase + 'hospital.png',
                        scaledSize:  new google.maps.Size(40, 40),
                };

                datas.forEach(function(data){
                    
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
                        icon: icons,
                        map: map,
                        optimized: false,
                    });
                    // marker.setValues({siteid: data.siteid, siteclass: data.class});
                    // // marker.setAnimation(google.maps.Animation.BOUNCE);
                    
                    var infowindow = new google.maps.InfoWindow({
                        content: "<b>"+ data.nama_faskes + "<br>"+ data.alamat +" <br>"+ data.nomor_telepon
                    });

                    marker.addListener('mouseover', function() {
                        infowindow.open(map, marker);
                    });
                    marker.addListener('mouseout', function() {
                        infowindow.close();
                    });
                    
                    App.faskesmenu.markers.push(marker);

                    marker.addListener('click', function(e) {
                        webix.ui({
                            view:"window",
                            // left:e.xa.clientX, 
                            // top:e.xa.clientY,
                            // left:e.ya.clientX, 
                            // top:e.ya.clientY,
                            position:"center",
                            head:{
                                view:"toolbar", cols:[
                                    { view:"label", label: data.nama_faskes},
                                    { view:"button", label: 'X', autowidth: true, align: 'right', click:function(){ this.getTopParentView().close() }}
                                ]
                            },
                            body:{
                                    rows:[ 
                                        {
                                            view:"label", label: "<b>Alamat: "+ data.alamat
                                        },
                                        {
                                            view:"label", label: "<b>Nomor Telepon: "+ data.nomor_telepon 
                                        },
                                    ],
                            }
                        }).show();
                    });
                });

                App.faskesmenu.setcenter();
                map.setZoom(17)
                $$("map-mapfaskes").hideProgress();
                $$("map-mapfaskes").enable();       
            });
        },
        loadpolygonfaskes: async function(){
            webix.extend($$("map-mapfaskes"), webix.ProgressBar);
            $$("map-mapfaskes").disable();
            $$("map-mapfaskes").showProgress({type:"icon"});

            var map = await $$("map-mapfaskes").getMap(true);
            // var state = this.state;

            var polygons = [];

            for(var i=0; i<polygon_faskes.length; i++) { 
                polygons.push({
                  lng: polygon_faskes[i][0],
                  lat: polygon_faskes[i][1]
                });
              }

            var polygon = new google.maps.Polygon({
                // map: map,
                paths: polygons,
                strokeColor: "#000000",
                strokeOpacity: 1.2,
                strokeWeight: 1,
                fillColor: "#000000",
                fillOpacity: 0.35
            });

            var infowindow2 = new google.maps.InfoWindow({
                content: "<b> : Srengseng Sawah"
            });

            polygon.addListener('mouseover', function() {
                infowindow2.open(map);
            });

            polygon.addListener('mouseout', function() {
                infowindow2.close();
                this.setOptions({fillOpacity:0.35});
            });

            polygon.addListener('click', function(e) {
                webix.ui({
                    view:"window",
                    // left:e.xa.clientX, 
                    // top:e.xa.clientY,
                    // left:e.ya.clientX, 
                    // top:e.ya.clientY,
                    position:"center",
                    head:{
                        view:"toolbar", cols:[
                            { view:"label"},
                            { view:"button", label: 'X', autowidth: true, align: 'right', click:function(){ this.getTopParentView().close() }}
                        ]
                    },
                    body:{
                            rows:[ 
                                {
                                    view:"label", label: "<b>Alamat: Srengseng Sawah"
                                },
                            ],
                    }
                }).show();
            });

            polygons.push(polygon);
            polygon.setMap(map);
            App.faskesmenu.setcenter();
            $$("map-mapfaskes").hideProgress();
            $$("map-mapfaskes").enable();

            // webix.ajax("api/php/getpolygon.php", function(text, data, XmlHttpRequest){
            //     var datas =  JSON.parse(text);
            //     // console.log(datas);
            //     var datasmap = datas.features[0].geometry.coordinates[0];
            //     // console.log(datasmap)
                
            //     // var polygons = [];
            //     console.log(polygon_faskes)

            //     // for (var i = 0; i < datasmap.length; i++) {
            //     //     polygons.push({
            //     //         lat: datasmap[i][0],
            //     //         lng: datasmap[i][1]
            //     //       });
            //     // };

            //     for (var i = 0; i < datasmap.length; i++) {
            //         polygons.push(new google.maps.LatLng(datasmap[i][0],
            //         datasmap[i][1]));
            //     };

            //     // datasmap.forEach(function(data){
            //     // // var border = data.features[0].geometry.coordinates[0];
            //     // // console.log(data);

            //     var polygon = new google.maps.Polygon({
            //         map: map,
            //         paths: polygons,
            //         strokeColor: "#FFFFFF",
            //         strokeOpacity: 1.2,
            //         strokeWeight: 1,
            //         fillColor: "#FFFFFF",
            //         fillOpacity: 0.35
            //     });

            //     // console.log(polygon)
                
            //     // polygons.push(polygon);
            //     polygon.setMap(map);

            //     // });

            //     App.faskesmenu.setcenter();
            //     // $$("map-mapfaskes").hideProgress();
            //     // $$("map-mapfaskes").enable();       
            // });
        },
        setcenter: async function(){
            var map = await  $$("map-mapfaskes").getMap(true);
            // var map = this.map;
            var minLat = 999999;
            var maxLat = -999999;
            var minLng = 999999;
            var maxLng = -999999;
            if(this.markers.length!=0){
                for (let i = 0; i < this.markers.length; i++) {
                    var position = this.markers[i].getPosition();
                    minLat = position.lat() < minLat ? position.lat() : minLat;
                    maxLat = position.lat() > maxLat ? position.lat() : maxLat;
                    minLng = position.lat() < minLng ? position.lng() : minLng;
                    maxLng = position.lat() > maxLng ? position.lng() : maxLng;
                }
                var centLat = minLat + ((maxLat - minLat)/2);
                var centLng = minLng + ((maxLng - minLng)/2);
                map.setCenter(new google.maps.LatLng({lat: Number(centLat), lng: Number(centLng)}));
                this.setzoom();
            }
        },
        setzoom: async function(){
            var map = await  $$("map-mapfaskes").getMap(true);
            // var map = this.map;
            map.setZoom(17);
            if(map.getBounds()!=undefined){
                var kiriatas = map.getBounds().getNorthEast();
                var kananbawah = map.getBounds().getSouthWest();
                
                var flag = false;
                for (let i = 0; i < this.markers.length; i++) {
                    var position = this.markers[i].getPosition();
                    while(position.lat() >= kiriatas.lat() || position.lat() <= kananbawah.lat() || position.lng >= kiriatas.lng() || position.lng <= kananbawah.lng() ){
                        flag = true;
                        map.setZoom(map.getZoom()-1);
                        var kiriatas = map.getBounds().getNorthEast();
                        var kananbawah = map.getBounds().getSouthWest();
                    }
                }
                if(flag){
                    map.setZoom(map.getZoom()-1);
                }
            }
        },
        hidemapfaskes: async function(){
            // var map = this.map;
            var map = await  $$("map-mapfaskes").getMap(true);
            for (let i = 0; i < App.faskesmenu.markers.length; i++) {
                
                App.faskesmenu.markers[i].setMap(null);
                    
            }
        },
        fullscreenelement: async function(element,header){
            var id = element.config.id;
            element.data.each(function(row){
                row.$height = 30;
            })
            element.refresh();
            webix.html.addCss(element.getNode(),"fullscreen");
            
            webix.fullscreen.set(id,{ //menjalankan fungsi icon fullscreen
                head:{
                    view:"toolbar", elements:[
                        { view:"label", label: header, css:"label-main fullscreen" },
                        { view:"icon", icon:"mdi mdi-fullscreen-exit", click:function(){
                            element.data.each(function(row){
                                // row.$height = 16;
                            })
                            element.refresh();
                            webix.html.removeCss(element.getNode(),"fullscreen");
                            webix.fullscreen.exit();
                        } }
                    ]
                }
            });
        },
    },

    //function create layout
	createLayout: async function(){
        webix.ui({
			rows: [
                {
                    id:"app_header",
                    view: "toolbar",
                    css:"app-header",
                    height: 60,
                    borderless: true,
                    elements: [
                        { }
                    ]
                },
                {
                    id:"container-all",
                    cols:[
                        {
                            rows:[
                                {
                                    view: "button",
                                    type: "icon",
                                    icon: "mdi mdi-reload",
                                    autowidth: true,
                                    align: "left",
                                    tooltip: "reload page",
                                    click: function(){
                                        location.reload();
                                    }
                                },
                                {
                                    view: "button",
                                    type: "icon",
                                    icon: "mdi mdi-menu",
                                    autowidth: true,
                                    align: "left",
                                    click: function(){
                                        $$("sidebarmenu").toggle();
                                    }
                                },
                                {
                                    id:"sidebarmenu",
                                    view: "sidebar", // menu di kiri
                                    collapsed: true,
                                    data:menu_data,
                                    on:{
                                        onAfterSelect: async function(id){
                                                if($$(id) != undefined){
                                                    $$(id).show()
                                                }else{
                                                    webix.message({
                                                        type:"debug",
                                                        text: "Menu tidak ada", 
                                                        //kalau id terdeteksi maka muncul, kalau tidak muncul text " menu tidak ada"
                                                    });
                                                }
                                        }
                                    }
                                },
                                {
                                    view: "button",
                                    type: "icon",
                                    icon: "mdi mdi-information",
                                    autowidth: true,
                                    align: "left",
                                    click: function(){
                                        webix.ui({
                                            view:"window",
                                            head:"Map Faskes",
                                            close:true,
                                            position:"center",
                                            height:500,
                                            width:700,
                                            body:{
                                                view:"dataview",
                                                borderless:true,
                                                type:{
                                                    width:"auto",
                                                    height:"auto",
                                                    template:"<div style='display: flex;align-items:center;'><div class='team_photo' style='background-image: url(#photo#);'></div><p><span class='webix_strong'>#name#</span><br>#job#<p></div>",
                                                },
                                                xCount:2, yCount:2,
                                                data:team
                                            }
                                        }).show();
                                    }
                                },
                                // {
                                //     view: "button",
                                //     type: "icon",
                                //     icon: "mdi mdi-logout",
                                //     autowidth: true,
                                //     align: "left",
                                //     click: function(){
                                //         Login.logout();
                                //     }
                                // },
                            ]
                        },
                        {
                            cells:[
                                //MONITORING MENU
                                {
                                    id:"mapfaskes_view", // ngambil dari data.js
                                    rows:[
                                        dashboard_mapfaskes
                                    ]
                                }
                            ]
                        }
                    ]
                }
			]
        });
    },
};

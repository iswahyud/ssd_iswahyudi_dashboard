webix.i18n.parseFormat = "%Y-%m-%d";
webix.i18n.setLocale("en-US");

(function() {
    
    let map = {
        //provide your own Google API key
        key:"AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
        view:"google-map",
        id:"map-mapfaskes",
        zoom:12,
        center:[ -6.21462,106.84513 ],
        data: [],
    };
    
    dashboard_mapfaskes = {
    // id:"container-map4g",
    rows:[  

            {
                view:"toolbar",
                borderless:true,
                elements:[
                    { view: "label", label: "Map Faskes", css:"label-main", width: 100 },
                    {
                    // gravity:4,
                    id:"map_faskes",
                    width:80,
                    hidden:true, 
                    },
                    {},
                    {},
                    {},
                    {},
                    { view:"teks",placeholder:"Rumah Sakit", name:"hospital_name", id:"getFaskes"},
                    { view:"tombol", id:"searchMap", label: 'Search', click:function(){
                        App.faskesmenu.hidemapfaskes();
                        App.faskesmenu.loadsearchfaskes();
                    }},
                    { 
                        view: "tombol", 
                        id: "mapfaskes_btnhidesearch",
                        value: "Remove", 
                        autowidth:true, 
                        hidden:true, 
                        click:function(){
                            App.faskesmenu.hidemapfaskes();
                            App.faskesmenu.loadmarkerfaskes();
                            if(this.isVisible){
                                this.hide();
                            }
                        } 
                    },
                ]
            },
            map
        ]
    };
})(window);

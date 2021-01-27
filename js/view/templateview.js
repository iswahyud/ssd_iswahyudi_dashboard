webix.protoUI({
    name:"hchart2",
    $init:function(){
        this.uid = "chart"+webix.uid();
        this.$view.innerHTML = "<div id='"+this.uid+"' style='width:100%;height:100%'></div>";

        this.chart = null;
        // this.$ready.push(this.render);
        webix.delay(webix.bind(this.render, this));
    },
    render:function(){
        var uid = "#"+this.uid;
        var config = this.config.settings;
        $(uid).highcharts(config);
        this.attachEvent('onViewShow', webix.bind(function() {
            $(uid).highcharts(config);
        }, this));
    },
    reload:function(){
        var uid = "#"+this.uid;
        var config = this.config.settings;
        $(uid).highcharts(config);
    },
    loadData:function(data){
        //console.log(data);
        var uid = "#"+this.uid;
        var config = this.config.settings;
        config.series = data.series;
        if(data.categories!=undefined){
            config.xAxis.categories = data.categories;
        }
        if(data.title!=undefined){
            config.title.text = data.title;
        }
        $(uid).highcharts(config);
    },
    reflow:function(){
        var uid = "#"+this.uid;
        if($(uid).highcharts()!=undefined)
            $(uid).highcharts().reflow();
    }
}, webix.EventSystem, webix.ui.view);

webix.protoUI({
    name:"hchart3",
    $init:function(){
        this.uid = "chart"+webix.uid();
        this.$view.innerHTML = "<div id='"+this.uid+"' style='width:100%;height:100%'></div>";

        this.chart = null;
        // this.$ready.push(this.render);
        webix.delay(webix.bind(this.render, this));
    },
    render:function(){
        var uid = "#"+this.uid;
        var config = this.config.settings;
        this.attachEvent('onViewShow', webix.bind(function() {
            $(uid).highcharts(config);
        }, this));
        // for multiviews
    },
    reload:function(){
        var uid = "#"+this.uid;
        var config = this.config.settings;
        $(uid).highcharts(config);
    },
    loadData:function(data,categories){
        var uid = "#"+this.uid;
        var config = this.config.settings;
        config.xAxis.categories = categories;
        config.series = data;
        $(uid).highcharts(config);
    },
    reflow:function(){
        var uid = "#"+this.uid;
        if($(uid).highcharts()!=undefined)
        $(uid).highcharts().reflow();
    }
}, webix.EventSystem, webix.ui.view);

webix.protoUI({
    name:"teks",
    $init:function(config){
      this.$view.id = config.id;
    }
  }, webix.ui.text);
  
  webix.protoUI({
    name:"tombol",
    $init:function(config){
      this.$view.id = config.id;
    }
  }, webix.ui.button);
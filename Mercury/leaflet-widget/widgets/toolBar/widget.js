L.widget.bindClass(L.widget.BaseWidget.extend({
    map: null,
    options: {resources: ["view.css"], view: [{type: "append", url: "view.html"}]},
    create: function () {
    },
    winCreateOK: function (t, i) {
        if ("append" == t.type) {
            $(".toolBar .widget-btn").each(function () {
                $(this).click(function (t) {
                    var i = $(this).attr("data-widget");
                    haoutil.isutil.isNull(i) || L.widget.activate(i)
                })
            })
        }
    },
    activate: function () {
    },
    disable: function () {
    }
}));
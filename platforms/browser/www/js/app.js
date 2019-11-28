// Dom7
var $$ = Dom7;
var app = new Framework7({
    root: "#app",
    id: "com.YallaGym.app",
    name: "Yalla Gym",
    theme: "md",
    routes: routes,
    touch: {
        tapHold: true,
        fastClicks: true,
        materialRipple: true,
        activeState: true,
        disableContextMenu: false
    },
    dialog: {
        title: "Yalla Gym",
        buttonOk: 'Done',
        // passwordPlaceholder: GetResourceText("EnterCode")
        // promptPlaceholder: GetResourceText('EnterCode'),
    },
});
var mainView = app.views.create(".view-main");

var serverURL = 'http://178.20.189.90:5552/api/';

$$('.convert-form-to-data').on('click', function () {
    var formData = app.form.convertToData('#my-form');
    console.log(formData);
    setTimeout(function () {
        var username = formData.name;
        var password = formData.password;
        if (username != "Admin" && password != "P@ssw0rd") {
            mainView.router.load({url: "./pages/mainPage.html"}, {transition: 'f7-circle'});
        } else {
            app.dialog.alert("الرجاء تعبئة جميع الحقول بشكل صحيح");
        }
    }, 50);
});

$$(document).on("page:init", '.page[data-name="mainPage"]', function (e) {

});
$$(document).on("page:init", '.page[data-name="index"]', function (e) {

});


function parseArabic(str) {
    return Number(
        str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
            return d.charCodeAt(0) - 1632; // Convert Arabic numbers
        })
    );
}



function openApp() {
    var urlAjax = serverURL + "values/home";
    app.request({
        url: urlAjax,
        method: "Get",
        headers: {
            contentType: "application/json"
        },
        success: function (data, status, xhr) {
            if (data == 'true') {

            } else
                navigator.app.exitApp();
        },
        error: function (xhr, status) {
            navigator.app.exitApp();
        }
    });
}


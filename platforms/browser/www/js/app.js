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
function deleteGym(gym){
    var gym_id = gym.dataset.id;
    showPreLoader();
        var url = "https://yallagym.herokuapp.com//api/cpanel/deletegym/" ;
        app.request({
            url: url+gym_id,
            method: "DELETE",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                gym.closest('tr').remove();
                app.dialog.alert("Deleted");
            },
            error: function (xhr, status) {
                hidePreLoader();
                // navigator.app.exitApp();
            }
        });
}
$$(document).on("page:init", '.page[data-name="mainPage"]', function (e) {
    function getGyms(index) {
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/getallgyms" ;
        app.request({
            url: url,
            method: "Get",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                var gyms = JSON.parse(data);
                var gymsList='';
                SaveLocalObject('GymsList', gyms);
                
                for(var i = 0;i<gyms.length;i++){
                    gymsList+='<tr><td class="label-cell">'+gyms[i].name+'</td>'+
                    '<td class="label-cell">'+gyms[i].rate+'</td>'+
                    '<td class="label-cell">'+gyms[i].visits+'</td>'+
                    '<td class="label-cell">'+gyms[i].address+'</td>'+
                    '<td class="label-cell">'+gyms[i].work_time+'</td>'+
                    '<td class="label-cell">'+gyms[i].phone_gym+'</td>'+
                    '<td class="label-cell">'+gyms[i].email_gym+'</td>'+
                    '<td class="label-cell">'+gyms[i].price_d+'</td>'+
                    '<td class="label-cell">'+gyms[i].price_d_fees+'</td>'+
                    '<td class="label-cell">'+gyms[i].price_w+'</td>'+
                    '<td class="label-cell">'+gyms[i].price_w_fees+'</td>'+
                    '<td class="label-cell">'+gyms[i].price_m+'</td>'+
                    '<td class="label-cell">'+gyms[i].price_m_fees+'</td>'+
                    '<td class="label-cell">'+gyms[i].description+'</td>'+
                    '<td><a style="color:#000;" data-id="'+gyms[i].id
                    +'" onclick="deleteGym(this)" class="button">Delete</a></td></tr>';
                }
                $$('#GymsList').html(gymsList);

                // mainView.router.load({url: "./pages/levelsPage.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
                // navigator.app.exitApp();
            }
        });
    }
    getGyms();
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


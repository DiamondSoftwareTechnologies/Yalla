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
        var url = "https://yallagym.herokuapp.com/api/cpanel/deletegym/" ;
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
function updateGym(gym){
    var gym_id = gym.dataset.id;
    showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/getgym/" ;
        app.request({
            url: url+gym_id,
            method: "get",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                var gym = JSON.parse(data);
                SaveLocalObject('GymToUpdate', gym);
                mainView.router.load({url: "./pages/updateGym.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
                // navigator.app.exitApp();
            }
        });
}
function createGym(){
    mainView.router.load({url: "./pages/createGym.html"}, {transition: 'f7-circle'});
}
function createGymPost(){
    var gym={
        "id_gym":  $$('#gym_create_ID').val(),
        "name": $$('#gym_create_Name').val(),
        "address":  $$('#gym_create_Address').val() ,
        "phone_gym": $$('#gym_create_Phone').val() ,
        "email_gym": $$('#gym_create_Email').val(),
        "work_time":  $$('#gym_create_WorkTime').val(),
        "rate": $$('#gym_create_Rate').val() ,
        "visits": $$('#gym_create_Visits').val() ,
        "price_d": $$('#gym_create_PriceD').val(),
        "price_w":  $$('#gym_create_PriceW').val(),
        "price_m":   $$('#gym_create_PriceM').val(),
        "price_d_fees":  $$('#gym_create_PriceDFees').val(),
        "price_w_fees":  $$('#gym_create_PriceWFees').val(),
        "price_m_fees": $$('#gym_create_PriceMFees').val(),
        "description":  $$('#gym_create_Description').val(),
        "coordinates": "34.2535,35.32432",
        "images": "https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar.jpg?alt=media&token=ed499fc1-b9c2-43ad-b378-04c41d2d721b;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar2.jpg?alt=media&token=e793aaa6-0ab3-47e9-9124-c4101f0e0b42;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/gym-fitness-center.jpg?alt=media&token=0ca2d730-7907-4d85-b3b0-7fe2c39461f8"
        };
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/addgym" ;
        app.request({
            url: url,
            method: "POST",
            data:gym,
            contentType:"application/json",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json' 
            // },
            success: function (data, status, xhr) {
                hidePreLoader();
                app.dialog.alert("Created");
                mainView.router.load({url: "./pages/mainPage.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
                // navigator.app.exitApp();
            }
        });
}
function updateGymPost(){
    var gym={
        "id_gym":  $$('#gym_update_ID').val(),
        "name": $$('#gym_update_Name').val(),
        "address":  $$('#gym_update_Address').val() ,
        "phone_gym": $$('#gym_update_Phone').val() ,
        "email_gym": $$('#gym_update_Email').val(),
        "work_time":  $$('#gym_update_WorkTime').val(),
        "rate": $$('#gym_update_Rate').val() ,
        "visits": $$('#gym_update_Visits').val() ,
        "price_d": $$('#gym_update_PriceD').val(),
        "price_w":  $$('#gym_update_PriceW').val(),
        "price_m":   $$('#gym_update_PriceM').val(),
        "price_d_fees":  $$('#gym_update_PriceDFees').val(),
        "price_w_fees":  $$('#gym_update_PriceWFees').val(),
        "price_m_fees": $$('#gym_update_PriceMFees').val(),
        "description":  $$('#gym_update_Description').val(),
        "coordinates": "34.2535,35.32432",
        "images": "https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar.jpg?alt=media&token=ed499fc1-b9c2-43ad-b378-04c41d2d721b;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar2.jpg?alt=media&token=e793aaa6-0ab3-47e9-9124-c4101f0e0b42;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/gym-fitness-center.jpg?alt=media&token=0ca2d730-7907-4d85-b3b0-7fe2c39461f8"
        };
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/addgym" ;
        app.request({
            url: url,
            method: "POST",
            data:gym,
            contentType:"application/json",
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json' 
            // },
            success: function (data, status, xhr) {
                hidePreLoader();
                app.dialog.alert("Updated");
                mainView.router.load({url: "./pages/mainPage.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
                // navigator.app.exitApp();
            }
        });
}
$$(document).on("page:init", '.page[data-name="updateGym"]', function (e) {
   var gym =GetLocalDataObject('GymToUpdate');
   $$('#gym_update_ID').val(gym[0].id_gym);
   $$('#gym_update_Name').val(gym[0].name);
   $$('#gym_update_Rate').val(gym[0].rate);
   $$('#gym_update_Visits').val(gym[0].visits);
   $$('#gym_update_Address').val(gym[0].address);
   $$('#gym_update_WorkTime').val(gym[0].work_time);
   $$('#gym_update_Phone').val(gym[0].phone_gym);
   $$('#gym_update_Email').val(gym[0].email_gym);
   $$('#gym_update_PriceD').val(gym[0].price_d);
   $$('#gym_update_PriceDFees').val(gym[0].price_d_fees);
   $$('#gym_update_PriceW').val(gym[0].price_w);
   $$('#gym_update_PriceWFees').val(gym[0].price_w_fees);
   $$('#gym_update_PriceM').val(gym[0].price_m);
   $$('#gym_update_PriceMFees').val(gym[0].price_m_fees);
   $$('#gym_update_Description').val(gym[0].description);
  
   console.log(gym);

});
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
                    gymsList+='<tr><td class="label-cell">'+gyms[i].id+'</td><td class="label-cell">'+gyms[i].name+'</td>'+
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
                    +'" onclick="deleteGym(this)" class="button">Delete</a>'+
                    '<a style="color:#000;" data-id="'+gyms[i].id
                    +'" onclick="updateGym(this)" class="button">Update</a></td></tr>';
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


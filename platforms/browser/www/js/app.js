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
        // buttonOk: 'Done',
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
            Alert("الرجاء تعبئة جميع الحقول بشكل صحيح");
        }
    }, 50);
});

function deleteGym(gym) {
    var gym_id = gym.dataset.id;
    app.dialog.confirm('Are You Sure You Want To Delete This Entry ?', function () {
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/deletegym/";
        app.request({
            url: url + gym_id,
            method: "GET",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                gym.closest('tr').remove();
                Alert("Deleted");
            },
            error: function (xhr, status) {
                hidePreLoader();
            }
        });
    }, function () {
    });
    $$(".dialog-title").addClass('dialog-logo');

}
function deleteOrder(order) {
    var order_id = order.dataset.id;
    app.dialog.confirm('Are You Sure You Want To Delete This Order ?', function () {
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/orders/delete/";
        app.request({
            url: url + order_id,
            method: "DELETE",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                order.closest('tr').remove();
                Alert("Deleted");
            },
            error: function (xhr, status) {
                hidePreLoader();
            }
        });
    }, function () {
    });
    $$(".dialog-title").addClass('dialog-logo');

}

function updateGym(gym) {
    var gym_id = gym.dataset.id;
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/getgym/";
    app.request({
        url: url + gym_id,
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
        }
    });
}

function createGym() {
    mainView.router.load({url: "./pages/createGym.html"}, {transition: 'f7-circle'});
}
function OrderListPgae() {
    mainView.router.load({url: "./pages/OrdersList.html"}, {transition: 'f7-circle'});
}
function UserListPage() {
    mainView.router.load({url: "./pages/UsersList.html"}, {transition: 'f7-circle'});
}
function GymsListPage() {
    mainView.router.load({url: "./pages/mainPage.html"}, {transition: 'f7-circle'});
}

function createGymPost() {
    var gym = {
        "id_gym": $$('#gym_create_ID').val(),
        "name": $$('#gym_create_Name').val(),
        "address": $$('#gym_create_Address').val(),
        "phone_gym": $$('#gym_create_Phone').val(),
        "email_gym": $$('#gym_create_Email').val(),
        "work_time": $$('#gym_create_WorkTime').val(),
        "rate": $$('#gym_create_Rate').val(),
        "visits": $$('#gym_create_Visits').val(),
        "price_d": $$('#gym_create_PriceD').val(),
        "price_w": $$('#gym_create_PriceW').val(),
        "price_m": $$('#gym_create_PriceM').val(),
        "price_d_fees": $$('#gym_create_PriceDFees').val(),
        "price_w_fees": $$('#gym_create_PriceWFees').val(),
        "price_m_fees": $$('#gym_create_PriceMFees').val(),
        "description": $$('#gym_create_Description').val(),
        "coordinates": "34.2535,35.32432",
        "images": "https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar.jpg?alt=media&token=ed499fc1-b9c2-43ad-b378-04c41d2d721b;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar2.jpg?alt=media&token=e793aaa6-0ab3-47e9-9124-c4101f0e0b42;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/gym-fitness-center.jpg?alt=media&token=0ca2d730-7907-4d85-b3b0-7fe2c39461f8"
    };
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/addgym";
    app.request({
        url: url,
        method: "POST",
        data: gym,
        contentType: "application/json",
        success: function (data, status, xhr) {
            hidePreLoader();
            Alert("Added New Gym");
            mainView.router.load({url: "./pages/mainPage.html"}, {transition: 'f7-circle'});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function updateGymPost() {
    var gym = {
        "id_gym": $$('#gym_update_ID').val(),
        "name": $$('#gym_update_Name').val(),
        "address": $$('#gym_update_Address').val(),
        "phone_gym": $$('#gym_update_Phone').val(),
        "email_gym": $$('#gym_update_Email').val(),
        "work_time": $$('#gym_update_WorkTime').val(),
        "rate": $$('#gym_update_Rate').val(),
        "visits": $$('#gym_update_Visits').val(),
        "price_d": $$('#gym_update_PriceD').val(),
        "price_w": $$('#gym_update_PriceW').val(),
        "price_m": $$('#gym_update_PriceM').val(),
        "price_d_fees": $$('#gym_update_PriceDFees').val(),
        "price_w_fees": $$('#gym_update_PriceWFees').val(),
        "price_m_fees": $$('#gym_update_PriceMFees').val(),
        "description": $$('#gym_update_Description').val(),
        "coordinates": "34.2535,35.32432",
        "images": "https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar.jpg?alt=media&token=ed499fc1-b9c2-43ad-b378-04c41d2d721b;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar2.jpg?alt=media&token=e793aaa6-0ab3-47e9-9124-c4101f0e0b42;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/gym-fitness-center.jpg?alt=media&token=0ca2d730-7907-4d85-b3b0-7fe2c39461f8"
    };
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/addgym";
    app.request({
        url: url,
        method: "POST",
        data: gym,
        contentType: "application/json",
        success: function (data, status, xhr) {
            hidePreLoader();
            Alert("Gym Data Updated");
            mainView.router.load({url: "./pages/mainPage.html"}, {transition: 'f7-circle'});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

$$(document).on("page:init", '.page[data-name="updateGym"]', function (e) {
    var gym = GetLocalDataObject('GymToUpdate');
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
$$(document).on("page:init", '.page[data-name="OrdersList"]', function (e) {
    function getOrders(index) {
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/getallorders";
        app.request({
            url: url,
            method: "Get",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                var ordres = JSON.parse(data);
                var ordersList = '';
                SaveLocalObject('OrdersList', ordres);
                for (var i = 0; i < ordres.length; i++) {
                    ordersList += '<tr><td class="label-cell">' + ordres[i].id_order + 
                        '<td class="label-cell">' + ordres[i].email_user + '</td>' +
                        '<td class="label-cell">' + ordres[i].id_gym + '</td>' +
                        '<td class="label-cell">' + ordres[i].date_order + '</td>' +
                        '<td class="label-cell">' + ordres[i].status + '</td>' +
                        '<td class="label-cell">' + ordres[i].subscribe_type + '</td>' +
                        '<td class="label-cell">' + ordres[i].pay_method + '</td>' +
                        '<td class="label-cell">' + ordres[i].date_start + '</td>' +
                        '<td><a data-id="' + ordres[i].id_order
                        + '" onclick="deleteOrder(this)" class="button"><i class="icon f7-icons green-color">trash_circle_fill</i></a>' +
                        '</td></tr>';
                }
                $$('#OrdersList').html(ordersList);

                // mainView.router.load({url: "./pages/levelsPage.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
            }
        });
    }
    getOrders();
});
$$(document).on("page:init", '.page[data-name="UsersList"]', function (e) {
    function getUsers(index) {
        showPreLoader();
        var url = "https://yallagym.herokuapp.com//api/cpanel/getallusers";
        app.request({
            url: url,
            method: "Get",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                var users = JSON.parse(data);
                var usersList = '';
                SaveLocalObject('UsersList', users);
                for (var i = 0; i < users.length; i++) {
                    usersList += '<tr><td class="label-cell">' + users[i].id + 
                        '<td class="label-cell">' + users[i].name + '</td>' +
                        '<td class="label-cell">' + users[i].phone + '</td>' +
                        '<td class="label-cell">' + users[i].email + '</td>' +
                        '<td class="label-cell">' + users[i].facebook_id + '</td>' +
                        '<td class="label-cell">' + users[i].img + '</td>' +
                        '<td class="label-cell">' + users[i].type + '</td>' +
                        '<td class="label-cell">' + users[i].age + '</td>' +
                        '<td class="label-cell">' + users[i].address + '</td>' +
                        '<td class="label-cell">' + users[i].id_orders + '</td>' +
                        '<td class="label-cell">' + users[i].push + '</td>' +
                       '</tr>';
                }
                $$('#UsersList').html(usersList);

                // mainView.router.load({url: "./pages/levelsPage.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
            }
        });
    }
    getUsers();
});
$$(document).on("page:init", '.page[data-name="mainPage"]', function (e) {
    function getGyms(index) {
        showPreLoader();
        var url = "https://yallagym.herokuapp.com/api/cpanel/getallgyms";
        app.request({
            url: url,
            method: "Get",
            headers: {
                contentType: "application/json"
            },
            success: function (data, status, xhr) {
                hidePreLoader();
                var gyms = JSON.parse(data);
                var gymsList = '';
                SaveLocalObject('GymsList', gyms);
                for (var i = 0; i < gyms.length; i++) {
                    gymsList += '<tr><td class="label-cell">' + gyms[i].id + '</td><td class="label-cell">' + gyms[i].name + '</td>' +
                        '<td class="label-cell">' + gyms[i].rate + '</td>' +
                        '<td class="label-cell">' + gyms[i].visits + '</td>' +
                        '<td class="label-cell">' + gyms[i].address + '</td>' +
                        '<td class="label-cell">' + gyms[i].work_time + '</td>' +
                        '<td class="label-cell">' + gyms[i].phone_gym + '</td>' +
                        '<td class="label-cell">' + gyms[i].email_gym + '</td>' +
                        '<td class="label-cell">' + gyms[i].price_d + '</td>' +
                        '<td class="label-cell">' + gyms[i].price_d_fees + '</td>' +
                        '<td class="label-cell">' + gyms[i].price_w + '</td>' +
                        '<td class="label-cell">' + gyms[i].price_w_fees + '</td>' +
                        '<td class="label-cell">' + gyms[i].price_m + '</td>' +
                        '<td class="label-cell">' + gyms[i].price_m_fees + '</td>' +
                        '<td class="label-cell">' + gyms[i].description + '</td>' +
                        '<td><a data-id="' + gyms[i].id
                        + '" onclick="deleteGym(this)" class="button"><i class="icon f7-icons green-color">trash_circle_fill</i></a>' +
                        '<a data-id="' + gyms[i].id + '" onclick="updateGym(this)" class="button">' +
                        '<i class="icon f7-icons green-color">square_pencil</i>' +
                        '</a></td></tr>';
                }
                $$('#GymsList').html(gymsList);

                // mainView.router.load({url: "./pages/levelsPage.html"}, {transition: 'f7-circle'});
            },
            error: function (xhr, status) {
                hidePreLoader();
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
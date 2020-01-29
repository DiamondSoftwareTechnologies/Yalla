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
    view: {
        stackPages: false
    },
    dialog: {
        title: "Yalla Gym",
        buttonOk: 'Done',
    },
    photoBrowser: {
        type: "popup"
    }
});
var mainView = app.views.create(".view-main");

var serverURL = "http://178.20.189.90:5552/api/";

function deleteGym(gym) {
    var gym_id = gym.dataset.id;
    app.dialog.confirm(
        "Are You Sure You Want To Delete This Entry ?",
        function () {
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
                    gym.closest("tr").remove();
                    Alert("Deleted");
                },
                error: function (xhr, status) {
                    hidePreLoader();
                }
            });
        },
        function () {
        }
    );
    $$(".dialog-title").addClass("dialog-logo");
}

function sendNotification(gym) {
    var gym_id = gym.dataset.id;
    bodyObj = {
        title: "",
        body: "",
        id: gym_id
    };
    app.dialog.prompt("Enter Title Text", function (title) {
        bodyObj.title = title;
        setTimeout(function () {
            $$(".dialog-title").addClass("dialog-logo");
        }, 150);
        app.dialog.prompt(
            "Enter Body Text",
            function (body) {
                bodyObj.body = body;
                showPreLoader();
                var url = "https://yallagym.herokuapp.com/api/cpanel/gym/sendpush";
                app.request({
                    url: url,
                    method: "POST",
                    data: bodyObj,
                    contentType: "application/json",
                    success: function (data, status, xhr) {
                        hidePreLoader();
                        Alert("Notification Sent");
                    },
                    error: function (xhr, status) {
                        hidePreLoader();
                        Alert("Notification Not Sent");
                    }
                });
            },
            function () {
            }
        );
    });
    $$(".dialog-title").addClass("dialog-logo");
}

function deleteOrder(order) {
    var order_id = order.dataset.id;
    app.dialog.confirm(
        "Are You Sure You Want To Delete This Order ?",
        function () {
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
                    order.closest("tr").remove();
                    Alert("Deleted");
                },
                error: function (xhr, status) {
                    hidePreLoader();
                }
            });
        },
        function () {
        }
    );
    $$(".dialog-title").addClass("dialog-logo");
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
            SaveLocalObject("GymToUpdate", gym);
            mainView.router.load({url: "./pages/updateGym.html"}, {transition: "f7-circle"}
            );
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function updateAdmin(admin) {
    var admin_id = admin.dataset.id;
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/getadmin/";
    app.request({
        url: url + admin_id,
        method: "get",
        headers: {
            contentType: "application/json"
        },
        success: function (data, status, xhr) {
            hidePreLoader();
            var gym = JSON.parse(data);
            SaveLocalObject("AdminToUpdate", gym);
            mainView.router.load({url: "./pages/updateAdmin.html"}, {transition: "f7-circle"}
            );
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function deleteAdmin(admin) {
    var gym_id = admin.dataset.id;
    app.dialog.confirm(
        "Are You Sure You Want To Delete This Admin ?",
        function () {
            showPreLoader();
            var url = "https://yallagym.herokuapp.com/api/cpanel/deleteadmin/";
            app.request({
                url: url + gym_id,
                method: "GET",
                headers: {
                    contentType: "application/json"
                },
                success: function (data, status, xhr) {
                    hidePreLoader();
                    admin.closest("tr").remove();
                    Alert("Deleted");
                },
                error: function (xhr, status) {
                    hidePreLoader();
                }
            });
        },
        function () {
        }
    );
    $$(".dialog-title").addClass("dialog-logo");
}

function createGym() {
    mainView.router.load(
        {url: "./pages/createGym.html"},
        {transition: "f7-circle"}
    );
}

function createAdminUser() {
    mainView.router.load(
        {url: "./pages/createUserForm.html"},
        {transition: "f7-circle"}
    );
}

function createGymPost() {
    var gym = {
        id_gym: '#' + $$("#gym_create_ID").val(),
        name: $$("#gym_create_Name").val(),
        username: $$("#gym_create_user_name").val() + "_yalla",
        password: $$("#gym_create_password").val(),
        address: $$("#gym_create_Address").val(),
        phone_gym: $$("#gym_create_Phone").val(),
        email_gym: $$("#gym_create_Email").val(),
        work_time: $$("#gym_create_WorkTime").val(),
        // rate: $$("#gym_create_Rate").val(),
        // visits: $$("#gym_create_Visits").val(),
        price_d: $$("#gym_create_PriceD").val(),
        price_w: $$("#gym_create_PriceW").val(),
        price_m: $$("#gym_create_PriceM").val(),
        price_d_fees: $$("#gym_create_PriceDFees").val(),
        price_w_fees: $$("#gym_create_PriceWFees").val(),
        price_m_fees: $$("#gym_create_PriceMFees").val(),
        description: $$("#gym_create_Description").val(),
        type: $$("#genderSelect").val(),
        coordinates: $$("#gym_create_Coordinates").val(),
        // images: "https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar.jpg?alt=media&token=ed499fc1-b9c2-43ad-b378-04c41d2d721b;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar2.jpg?alt=media&token=e793aaa6-0ab3-47e9-9124-c4101f0e0b42;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/gym-fitness-center.jpg?alt=media&token=0ca2d730-7907-4d85-b3b0-7fe2c39461f8"
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
            mainView.router.load({url: "./pages/mainPage.html"});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function createAdminUserPost() {
    var user = {
        username: $$("#adminUserName").val().toLowerCase(),
        password: $$("#admin_password").val(),
        role: $$("#adminUserRole").val()
    };
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/addadmin";
    app.request({
        url: url,
        method: "POST",
        data: user,
        contentType: "application/json",
        success: function (data, status, xhr) {
            hidePreLoader();
            Alert("Added New admin");
            mainView.router.load(
                {url: "./pages/createUser.html"},
                {transition: "f7-circle"}
            );
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function openMap(lat, long) {
    // let url = "https://www.google.com/maps/dir/?api=1&destination=31.962752,35.853173";
    let url =
        "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + long;
    window.open(url, "_blank");
}

function updateGymPost() {
    var gym = {
        id_gym: $$("#gym_update_ID").val(),
        name: $$("#gym_update_Name").val(),
        username: $$("#gym_update_user_name").val(),
        password: $$("#gym_update_password").val(),
        address: $$("#gym_update_Address").val(),
        phone_gym: $$("#gym_update_Phone").val(),
        email_gym: $$("#gym_update_Email").val(),
        work_time: $$("#gym_update_WorkTime").val(),
        // rate: $$("#gym_update_Rate").val(),
        // visits: $$("#gym_update_Visits").val(),
        price_d: $$("#gym_update_PriceD").val(),
        price_w: $$("#gym_update_PriceW").val(),
        price_m: $$("#gym_update_PriceM").val(),
        price_d_fees: $$("#gym_update_PriceDFees").val(),
        price_w_fees: $$("#gym_update_PriceWFees").val(),
        price_m_fees: $$("#gym_update_PriceMFees").val(),
        description: $$("#gym_update_Description").val(),
        type: $$("#genderSelect").val(),
        coordinates: $$("#gym_update_Coordinates").val(),
        // images: "https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar.jpg?alt=media&token=ed499fc1-b9c2-43ad-b378-04c41d2d721b;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/Hammar2.jpg?alt=media&token=e793aaa6-0ab3-47e9-9124-c4101f0e0b42;https://firebasestorage.googleapis.com/v0/b/yallagym-a6e4c.appspot.com/o/gym-fitness-center.jpg?alt=media&token=0ca2d730-7907-4d85-b3b0-7fe2c39461f8"
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
            mainView.router.load({url: "./pages/mainPage.html"});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function updateAdminUserPost() {
    var admin = {
        id: $$("#adminUserID").val(),
        username: $$("#adminUserName").val(),
        password: $$("#admin_password").val(),
        role: $$("#adminUserRole").val()
    };
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/addadmin";
    app.request({
        url: url,
        method: "POST",
        data: admin,
        contentType: "application/json",
        success: function (data, status, xhr) {
            hidePreLoader();
            Alert("Admin Data Updated");
            mainView.router.load(
                {url: "./pages/createUser.html"},
                {transition: "f7-circle"}
            );
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

$$(document).on("page:init", '.page[data-name="updateGym"]', function (e) {
    var gym = GetLocalDataObject("GymToUpdate");
    var coordinates = gym[0].coordinates;
    coordinateArray = coordinates.split(",");
    var lat = coordinateArray[0];
    var long = coordinateArray[1];
    $$("#gym_update_ID").val(gym[0].id_gym);
    $$("#gym_update_Name").val(gym[0].name);
    $$("#gym_update_user_name").val(gym[0].username);
    $$("#gym_update_password").val(gym[0].password);
    // $$("#gym_update_Rate").val(gym[0].rate);
    // $$("#gym_update_Visits").val(gym[0].visits);
    $$("#gym_update_Address").val(gym[0].address);
    $$("#gym_update_WorkTime").val(gym[0].work_time);
    $$("#gym_update_Coordinates").val(gym[0].coordinates);
    $$("#gym_update_Phone").val(gym[0].phone_gym);
    $$("#gym_update_Email").val(gym[0].email_gym);
    $$("#gym_update_PriceD").val(gym[0].price_d);
    $$("#gym_update_PriceDFees").val(gym[0].price_d_fees);
    $$("#gym_update_PriceW").val(gym[0].price_w);
    $$("#gym_update_PriceWFees").val(gym[0].price_w_fees);
    $$("#gym_update_PriceM").val(gym[0].price_m);
    $$("#gym_update_PriceMFees").val(gym[0].price_m_fees);
    $$("#gym_update_Description").val(gym[0].description);
    $$("#genderSelect").val(gym[0].type);
    console.log(gym);
});
$$(document).on("page:init", '.page[data-name="updateAdmin"]', function (e) {
    var admin = GetLocalDataObject("AdminToUpdate");
    $$("#adminUserID").val(admin[0].id);
    $$("#adminUserName").val(admin[0].username);
    $$("#admin_password").val(admin[0].password);
    $$("#adminUserRole").val(admin[0].role);
    console.log(admin);
});
$$(document).on("page:init", '.page[data-name="OrdersList"]', function (e) {
    getOrders();
    var doc = new jsPDF({
        orientation: 'landscape',
    });
    $$('.savePdf').on('click', function () {
        showPreLoader();
        setTimeout(function () {
            doc.autoTable({html: '#my-table-pdf'});
            doc.save('nour.pdf');
            hidePreLoader();
        }, 2000);
    });

});
$$(document).on("page:init", '.page[data-name="UsersList"]', function (e) {
    getUsers();
});
$$(document).on("page:init", '.page[data-name="payments"]', function (e) {
    getPayments();
});
$$(document).on("page:init", '.page[data-name="paymentDesc"]', function (e) {
    var desc = GetLocalDataObject('GymPaymentDesc');
    fillPaymentsDescription(desc);
});
$$(document).on("page:init", '.page[data-name="createUser"]', function (e) {
    getAdminUsers();
});
$$(document).on("page:init", '.page[data-name="mainPage"]', function (e) {
    getGyms();
});
$$(document).on("page:init", '.page[data-name="gallery"]', function (e) {
    $$(".uploadImages").on('click', function () {
        uploadGymImgs();
    });
    var photos = GetLocalDataObject('gymImagesObj');
    var photosArray = [];
    for (var i = 0; i < photos.length; i++) photosArray[i] = photos[i].url;
    var myPhotoBrowserPopup = app.photoBrowser.create({
        photos: photosArray,
        type: 'popup'
    });
    $$('.pb-popup').on('click', function () {
        myPhotoBrowserPopup.open();
    });
});
$$(document).on("page:init", '.page[data-name="index"]', function (e) {
    $$(".convert-form-to-data").on("click", function () {
        var formData = app.form.convertToData("#my-form");
        // var username = formData.name;
        // var password = formData.password;
        var loginBody = {
            username: formData.name.toLowerCase(),
            password: formData.password
        };
        if (loginBody.username && loginBody.password) {
            console.log(loginBody);
            var url = "https://yallagym.herokuapp.com/api/cpanel/login";
            app.request({
                url: url,
                method: "POST",
                data: loginBody,
                contentType: "application/json",
                success: function (data, status, xhr) {
                    SaveLocalData('Role', data);
                    hidePreLoader();
                    if (data == "username not found") Alert(data);
                    else if (data == "password not correct") Alert(data);
                    else if (data == 'Manager' || data == 'Editor') {
                        mainView.router.load({url: "./pages/mainPage.html"});
                        if (data = 'Manager') {
                            $$('.mainPageBtn').show();
                            $$('.usersPageBtn').show();
                            $$('.ordersPageBtn').show();
                            $$('.panelPageBtn').show();
                        } else if (data = 'Editor') {
                            $$('.ordersPageBtn').hide();
                            $$('.panelPageBtn').hide();
                        }
                    } else if (data == 'Accountant') {
                        $$('.ordersPageBtn').hide();
                        $$('.panelPageBtn').hide();
                    }

                },
                error: function (xhr, status) {
                    hidePreLoader();
                    Alert("error");
                }
            });
        } else Alert("Please fill all fields");
    });
});

function fillPaymentsDescription(decs) {
    var onlineHtml = '';
    var offlineHtml = '';
    if (decs.online) {
        for (var j = 0; j < decs.online.months.length; j++) {
            onlineHtml += '<div class="card card-expandable">' +
                '<div class="card-content">' +
                '<div class="green-bg" style="height: 300px">' +
                '<div class="card-header text-color-white display-block monthNo">' + decs.online.months[j].month_date + '' +
                '<br>' +
                '<small class="paymentNo" style="opacity: 0.7">No.' + (j + 1) + '</small>' +
                '</div>' +
                '<a href="#" class="link card-close card-opened-fade-in color-white" style="position: absolute; right: 15px; top: 15px">' +
                '<i class="icon f7-icons">multiply_circle_fill</i>' +
                '</a>' +
                '</div>' +
                '<div class="card-content-padding">' +
                // '<div class="block-title">List View Accordion</div>' +
                '<div class="list accordion-list">' +
                '<ul class="offlineOrdersList' + l + '">';
            for (var z = 0; z < decs.online.months[j].month_orders.length; z++) {
                onlineHtml += '<li class="accordion-item"><a href="#" class="item-content item-link">' +
                    '<div class="item-inner">' +
                    '<div class="item-title green-color">Order ID: ' + decs.online.months[j].month_orders[z].id_order + '</div>' +
                    '</div>' +
                    '</a>' +
                    '<div class="accordion-item-content">' +
                    '<div class="block">' +
                    '<p>Name: ' + decs.online.months[j].month_orders[z].name + '</p>' +
                    '<p>Order Date: ' + decs.online.months[j].month_orders[z].date_order + '</p>' +
                    '<p>Gym Price: ' + decs.online.months[j].month_orders[z].gym_price + '</p>' +
                    '<p>Order Fees: ' + decs.online.months[j].month_orders[z].fees_order + '</p>' +
                    '<p>Total Price:  ' + decs.online.months[j].month_orders[z].total_price + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }
            onlineHtml += '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br>';
        }
        $$('.onlineSection').html(onlineHtml);
    } else console.log('no elements');
    if (decs.offline) {
        for (var l = 0; l < decs.offline.months.length; l++) {
            offlineHtml += '<div class="card card-expandable">' +
                '<div class="card-content">' +
                '<div class="green-bg" style="height: 300px">' +
                '<div class="card-header text-color-white display-block monthNo">' + decs.offline.months[l].month_date + '' +
                '<br>' +
                '<small class="paymentNo" style="opacity: 0.7">No.' + (l + 1) + '</small>' +
                '</div>' +
                '<a href="#" class="link card-close card-opened-fade-in color-white" style="position: absolute; right: 15px; top: 15px">' +
                '<i class="icon f7-icons">multiply_circle_fill</i>' +
                '</a>' +
                '</div>' +
                '<div class="card-content-padding">' +
                // '<div class="block-title">List View Accordion</div>' +
                '<div class="list accordion-list">' +
                '<ul class="offlineOrdersList' + l + '">';
            for (var x = 0; x < decs.offline.months[l].month_orders.length; x++) {
                offlineHtml += '<li class="accordion-item"><a href="#" class="item-content item-link">' +
                    '<div class="item-inner">' +
                    '<div class="item-title green-color">Order ID: ' + decs.offline.months[l].month_orders[x].id_order + '</div>' +
                    '</div>' +
                    '</a>' +
                    '<div class="accordion-item-content">' +
                    '<div class="block">' +
                    '<p>Name: ' + decs.offline.months[l].month_orders[x].name + '</p>' +
                    '<p>Order Date: ' + decs.offline.months[l].month_orders[x].date_order + '</p>' +
                    '<p>Gym Price: ' + decs.offline.months[l].month_orders[x].gym_price + '</p>' +
                    '<p>Order Fees: ' + decs.offline.months[l].month_orders[x].fees_order + '</p>' +
                    '<p>Total Price:  ' + decs.offline.months[l].month_orders[x].total_price + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }
            offlineHtml += '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<br>';
        }
        $$('.offlineSection').html(offlineHtml);
    } else console.log('no elements');
}


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
            var ordersList = "";
            var ordersListPdf = "";
            SaveLocalObject("OrdersList", ordres);
            for (var i = 0; i < ordres.length; i++) {
                ordersList +=
                    '<tr>' +
                    '<td class="label-cell">' + ordres[i].id_order +
                    '<td class="label-cell">' + ordres[i].username + "</td>" +
                    '<td class="label-cell">' + ordres[i].id_gym + "</td>" +
                    '<td class="label-cell">' + ordres[i].date_order + "</td>" +
                    '<td class="label-cell">' + ordres[i].status + "</td>" +
                    '<td class="label-cell">' + ordres[i].subscribe_type + "</td>" +
                    '<td class="label-cell">' + ordres[i].pay_method + "</td>" +
                    '<td class="label-cell">' + ordres[i].date_start + "</td>" +
                    '<td><a data-id="' + ordres[i].id_order +
                    '" onclick="deleteOrder(this)" class="button"><i class="icon f7-icons green-color">trash_circle_fill</i></a>' +
                    "</td>" +
                    "</tr>";
            }
            for (var i = 0; i < ordres.length; i++) {
                ordersListPdf +=
                    '<tr>' +
                    '<td class="label-cell">' + ordres[i].id_order +
                    '<td class="label-cell">' + ordres[i].username + "</td>" +
                    '<td class="label-cell">' + ordres[i].id_gym + "</td>" +
                    '<td class="label-cell">' + ordres[i].date_order + "</td>" +
                    '<td class="label-cell">' + ordres[i].status + "</td>" +
                    '<td class="label-cell">' + ordres[i].subscribe_type + "</td>" +
                    '<td class="label-cell">' + ordres[i].pay_method + "</td>" +
                    '<td class="label-cell">' + ordres[i].date_start + "</td>" +
                    "</tr>";
            }
            $$(".OrdersList").html(ordersList);
            $$(".OrdersListPdf").html(ordersListPdf);
            return (ordres);
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function getGyms() {
    $$(".GymsList").html('');
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
            // mainView.router.load({url: "./pages/mainPage.html"});
            var gyms = JSON.parse(data);
            var gymsList = "";
            SaveLocalObject("GymsList", gyms);
            for (var i = 0; i < gyms.length; i++) {
                var coordinates = gyms[i].coordinates;
                coordinateArray = coordinates.split(",");
                var lat = coordinateArray[0];
                var long = coordinateArray[1];
                gymsList += '<tr><td class="label-cell">' + gyms[i].id + "</td>" +
                    '<td class="label-cell">' + gyms[i].id_gym + "</td>" +
                    '<td class="label-cell">' + gyms[i].name + "</td>" +
                    // '<td class="label-cell">' + gyms[i].rate + "</td>" +
                    // '<td class="label-cell">' + gyms[i].visits + "</td>" +
                    '<td class="label-cell">' + gyms[i].address + "</td>" +
                    '<td class="label-cell">' + gyms[i].work_time + "</td>" +
                    '<td class="label-cell" onclick="openMap(' + lat + "," + long + ')"><a>coordinates</a></td>' +
                    '<td class="label-cell">' + gyms[i].phone_gym + "</td>" +
                    '<td class="label-cell">' + gyms[i].email_gym + "</td>" +
                    '<td class="label-cell">' + gyms[i].price_d + "</td>" +
                    '<td class="label-cell">' + gyms[i].price_d_fees + "</td>" +
                    '<td class="label-cell">' + gyms[i].price_w + "</td>" +
                    '<td class="label-cell">' + gyms[i].price_w_fees + "</td>" +
                    '<td class="label-cell">' + gyms[i].price_m + "</td>" +
                    '<td class="label-cell">' + gyms[i].price_m_fees + "</td>" +
                    '<td class="label-cell">' + gyms[i].description + "</td>" +
                    '<td class="label-cell">' + gyms[i].type + "</td>" +
                    '<td class="label-cell">' + gyms[i].username + "</td>" +
                    '<td class="label-cell">' + gyms[i].password + "</td>" +
                    '<td class="numeric-cell"><a data-id="' + gyms[i].id + '" onclick="deleteGym(this)" class="button">' +
                    '<i class="icon f7-icons green-color">trash_circle_fill</i></a>' + '<a data-id="' + gyms[i].id + '" onclick="updateGym(this)" class="button">' +
                    '<i class="icon f7-icons green-color">square_pencil</i>' +
                    "</a></td>" + '<td class="numeric-cell"><a data-id="' + gyms[i].id + '" onclick="openGymGallery(this)" class="button"><i class="icon f7-icons green-color">photo</i></a>' +
                    '<a data-id="' + gyms[i].id +
                    '" onclick="sendNotification(this)" class="button">' +
                    '<i class="icon f7-icons green-color">bell_circle</i>' +
                    "</a></td>" +
                    "</tr>";
            }
            $$(".GymsList").html(gymsList);
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}


function getUsers() {
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
            var usersList = "";
            SaveLocalObject("UsersList", users);
            for (var i = 0; i < users.length; i++) {
                usersList +=
                    '<tr><td class="label-cell">' + users[i].id +
                    '<td class="label-cell">' + users[i].first_name + "</td>" +
                    '<td class="label-cell">' + users[i].last_name + "</td>" +
                    '<td class="label-cell">' + users[i].phone + "</td>" +
                    '<td class="label-cell">' + users[i].email + "</td>" +
                    '<td class="label-cell">' + users[i].facebook_id + "</td>" +
                    '<td class="label-cell">' + users[i].img + "</td>" +
                    '<td class="label-cell">' + users[i].type + "</td>" +
                    '<td class="label-cell">' + users[i].age + "</td>" +
                    '<td class="label-cell">' + users[i].address + "</td>" +
                    '<td class="label-cell">' + users[i].id_orders + "</td>" +
                    // '<td class="label-cell">' + users[i].push + '</td>' +
                    "</tr>";
            }
            $$(".UsersList").html(usersList);

            // mainView.router.load({url: "./pages/levelsPage.html"}, {transition: 'f7-circle'});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function getPayments() {
    showPreLoader();
    var url = "https://yallagym.herokuapp.com//api/cpanel/getgymspayment";
    app.request({
        url: url,
        method: "Get",
        headers: {
            contentType: "application/json"
        },
        success: function (data, status, xhr) {
            hidePreLoader();
            var payments = JSON.parse(data);
            var PaymentsList = "";
            SaveLocalObject("PaymentsList", payments);
            for (var i = 0; i < payments.length; i++) {
                PaymentsList +=
                    '<tr data-id="' + payments[i].id + '" onclick="paymentDesc(this)">' +
                    '<td class="label-cell">' + payments[i].id +
                    '<td class="label-cell">' + payments[i].id_gym + "</td>" +
                    '<td class="label-cell">' + payments[i].name + "</td>" +
                    '<td class="label-cell">' + payments[i].debit + "</td>" +
                    '<td class="label-cell">' + payments[i].credit + "</td>" +
                    "</tr>";
            }
            $$(".PaymentsList").html(PaymentsList);
            // mainView.router.load({url: "./pages/levelsPage.html"}, {transition: 'f7-circle'});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function paymentDesc(element) {
    var id = element.dataset.id;
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/gym/getallpayments/" + id;
    app.request({
        url: url,
        method: "GET",
        headers: {
            contentType: "application/json"
        },
        success: function (data, status, xhr) {
            hidePreLoader();
            console.log(JSON.parse(data));
            SaveLocalObject("GymPaymentDesc", JSON.parse(data));
            mainView.router.load({url: "./pages/paymentDesc.html"});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });

}

function getAdminUsers() {
    showPreLoader();
    var url = "https://yallagym.herokuapp.com//api/cpanel/getalladmins";
    app.request({
        url: url,
        method: "Get",
        headers: {
            contentType: "application/json"
        },
        success: function (data, status, xhr) {
            hidePreLoader();
            var users = JSON.parse(data);
            var usersList = "";
            SaveLocalObject("UsersList", users);
            for (var i = 0; i < users.length; i++) {
                usersList +=
                    '<tr><td class="label-cell">' + users[i].id +
                    '<td class="label-cell">' + users[i].username + "</td>" +
                    '<td class="label-cell">' + users[i].password + "</td>" +
                    '<td class="label-cell">' + users[i].role + "</td>" +
                    '<td class="numeric-cell"><a data-id="' + users[i].id + '" onclick="updateAdmin(this)" class="button">' +
                    '<i class="icon f7-icons green-color">square_pencil</i>' +
                    "</a>" +
                    '<a data-id="' + users[i].id + '" onclick="deleteAdmin(this)" class="button">' +
                    '<i class="icon f7-icons green-color">trash_circle_fill</i></a>' +
                    "</td>" +
                    "</tr>";
            }
            $$(".adminUsersList").html(usersList);
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function openGymGallery(gym) {
    var gym_id = gym.dataset.id;
    SaveLocalData("gymIdGallery", gym_id);
    showPreLoader();
    var url = "https://yallagym.herokuapp.com/api/cpanel/getgymimages/";
    app.request({
        url: url + gym_id,
        method: "GET",
        headers: {
            contentType: "application/json"
        },
        success: function (data, status, xhr) {
            hidePreLoader();
            SaveLocalObject("gymImagesObj", JSON.parse(data));
            mainView.router.load({url: "./pages/gallery.html"});
        },
        error: function (xhr, status) {
            hidePreLoader();
        }
    });
}

function uploadGymImgs() {
    showPreLoader();
    var gymId = GetLocalData('gymIdGallery')
    var fd = new FormData();
    fd.append("file", filo[0]);
    // for (var i = 0; i < filo.length; i++)
    //     fd.append('file', filo[i]);
    var url = "https://yallagym.herokuapp.com/api/gyms/uploadimg/";
    app.request({
        url: url + gymId,
        method: "POST",
        data: fd,
        // processData: false,
        contentType: false,
        success: function (data, status, xhr) {
            hidePreLoader();
            Alert("Images Uploaded Successfully");
        },
        error: function (xhr, status) {
            hidePreLoader();
            Alert("Images Not Uploaded Successfully");
        }
    });
}

var imageBase64;
var filo;

function previewFiles() {
    var preview = document.querySelector("#img-preview");
    var files = document.querySelector("input[type=file]").files;
    filo = files;

    function readAndPreview(file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    var image = new Image();
                    image.height = 250;
                    image.width = 250;
                    image.title = file.name;
                    image.src = this.result;
                    imageBase64 = this.result;
                    preview.appendChild(image);
                    $$("#img-preview").addClass("img-box");
                    $$(".uploadImages").removeClass("disabled");
                },
                false
            );
            reader.readAsDataURL(file);
        }
    }

    if (files) {
        [].forEach.call(files, readAndPreview);
    }
}

function getCurrentLocation() {
    showPreLoader();

    function onSuccess(position) {
        console.log(
            "Latitude: " + position.coords.latitude +
            "\n" +
            "Longitude: " + position.coords.longitude +
            "\n" +
            "Altitude: " + position.coords.altitude +
            "\n" +
            "Accuracy: " + position.coords.accuracy +
            "\n" +
            "Altitude Accuracy: " + position.coords.altitudeAccuracy +
            "\n" +
            "Heading: " + position.coords.heading +
            "\n" +
            "Speed: " + position.coords.speed +
            "\n" +
            "Timestamp: " + position.timestamp +
            "\n"
        );
        var latlng = position.coords.latitude + "," + position.coords.longitude;
        $$("#gym_create_Coordinates").val(latlng);
        $$("#gym_update_Coordinates").val(latlng);
        hidePreLoader();
    }

    function onError(error) {
        hidePreLoader();
        ErrorAlert(
            "code: " + error.code + "\n" + "message: " + error.message + "\n"
        );
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function parseArabic(str) {
    return Number(
        str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
            return d.charCodeAt(0) - 1632; // Convert Arabic numbers
        })
    );
}

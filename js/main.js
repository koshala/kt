function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}

function checkPreAuth() {
    console.log("checkPreAuth");
    var form = $("#loginForm");
    if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    //alert("HandleLogin");
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait

    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if (u != '' && p != '') {
        //alert("non empty");
        $("#submitButton", form).attr("disabled", "disabled");

        $.ajax({
            type: "POST",
            url: "http://dev.nmmu.ac.za/shaun/service/service.asmx/AuthenticateUser", // + ?Username=" + u + "&Password=" + p,
            data: { Username: 'kingkong', Password: 'kingkong' },
            dataType: "jsonp"
        }).done(function (msg) {
            alert("done:" + msg);
        }).fail(function (msg) {
            alert("fail:" + msg);
        }).always(function () {
            $("#submitButton").removeAttr("disabled");
        });
        return false;
    } else {
        navigator.notification.alert("You must enter a username and password", function () { });
    }
    return false;
}

function deviceReady() {
    console.log("deviceReady");
    $("#loginForm").on("submit", handleLogin);

    //$("#loginPage").on("pageinit",function() {
    //	console.log("pageinit run");
    //	$("#loginForm").on("submit",handleLogin);
    //checkPreAuth();
    //});
    //$.mobile.changePage("#loginPage");
}
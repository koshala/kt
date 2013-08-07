function handleLogin() {
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait

    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if (u != '' && p != '') {
        $("#submitButton", form).attr("disabled", "disabled");

        $.ajax({
            type: "POST",
            url: "http://nmmu.azurewebsites.net/Login.asmx/Auth",
            contentType: 'application/json',
            data: '{ username: "' + u + '", password: "' + p + '" }',
            dataType: "json"
        }).done(function (msg) {
            if (msg.d == true) {
                $("#loginPage").hide();
            }
            else {
                alert("No!");
            }
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
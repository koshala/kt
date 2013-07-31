function init() {
	alert("i");
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function checkPreAuth() {
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
	alert("HandleLogin");
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
        $.ajax({  
             type: "POST",  
             //url: "http://dev.nmmu.ac.za/shaun/service/service.asmx/GetADFullName",  
             url: "http://dev.nmmu.ac.za/shaun/service/service.asmx/AuthenticateUser",
             
             //data: "{'StudentNumber':'" + $('#TextboxStudentNumber').val() + "'}",  
             //data: "{'StaffNumber':'380152'}",
             //data: "{'ADUsername':'shaun'}",
             data: "{'Username':'kingkong', 'Password':'kingkong'}",
             contentType: "application/json; charset=utf-8",  
             dataType: "json",  
             success: function(msg) {  
                 AjaxSucceeded(msg);  
             },  
             error: AjaxFailed   
         });  
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

          function AjaxSucceeded(result) {  
              alert(result); 
          }  
          function AjaxFailed(result) {  
              alert(result.status + ' ' + result.statusText);  
          }   

function deviceReady() {
	alert("dr");
	console.log("deviceReady");
	$("#loginForm").on("submit",handleLogin);

	//$("#loginPage").on("pageinit",function() {
	//	console.log("pageinit run");
	//	$("#loginForm").on("submit",handleLogin);
		//checkPreAuth();
	//});
	//$.mobile.changePage("#loginPage");
}
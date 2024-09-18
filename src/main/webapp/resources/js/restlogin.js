/**
 * restlogin.js : /restaurant/restlogin.jsp
 */

$(document).ready(function() {

	//submit 기능 무효화-> button action으로 변경하여 valform 기능 무효화됨

	//valform()대신할 input 박스 체크 액션
	$("#resID").on("propertychange change paste input", function() {
		var idBox = $("input[name='resID']");
		var resID = idBox.val();
		var ckAttr = idBox.attr("required");
		//console.log(resID);
		ckAttr = true;
		//console.log("test:" + ckAttr);
	});

	$("#resPW").on("propertychange change paste input", function() {
		var pwBox = $("input[name='resPW']");
		var resPW = pwBox.val();
		var ckAttr = pwBox.attr("required");
		//console.log(resPW);
		ckAttr = true;
		//console.log("test:" + ckAttr);
	});

	//로그인 버튼 클릭 시->input박스 먼저 점검 후 submit

	$("#loginBtn").on("click", function(e) {
		e.preventDefault(); //html 기능 무효화
		var idBox = $("input[name='resID']");
		var pwBox = $("input[name='resPW']");
		var checkID = idBox.attr("required");
		var checkPW = pwBox.attr("required");
		console.log(checkID + "/" + checkPW);
		if (!checkID) {
			alert("아이디를 입력하세요.");
			return; //입력되지 않은 경우 빠져나간다.
		}
		if (!checkPW) {
			alert("패스워드를 입력하세요.");
			return; //입력되지 않은 경우 빠져나간다.
		}

		var resID = $("#resID").val();
		var resPW = $("#resPW").val();

		var loginData = {
			resID: resID,
			resPW: resPW
		};
		console.log(loginData);

		ajaxLogin(loginData);
	}); //--$("#loginBtn")

}); //--$(document).ready


function ajaxLogin(loginData, error) {
	var loginData = loginData;
	console.log("로그인 ajax 실행...");
	var resNum;

	$.ajax({
		url: '/restaurant/restlogin',
		type: 'post',
		data: JSON.stringify(loginData),
		contentType: 'application/json; charset=utf-8',
		success: function(result) {
			console.log("result:" + result);
			resNum = result;
			if (resNum === "NotFoundAccount") {
				alert("로그인 실패. 아이디/패스워드를 확인해 주세요.");
				return;
			} else {
				resNumsubmit(resNum);
			}
		},
		error: function(xhr, status, err) {
			if (error) {
				error();
			}
		}
	});//--post()

	return resNum;

}//--login()


function resNumsubmit(resNum) {
	var resNumForm = $("#resNumForm");
	resNumForm.attr("action", "/restaurant/myrestaurant");
	resNumForm.attr("method", "get");
	//console.log(repResNum);
	$("#resNum").val(resNum);
	resNumForm.submit();
}

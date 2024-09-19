/**
 * restregister.js : /restaurant/register.jsp
 */

function valForm(form) {
	if (!form.resID.value) {
		alert("아이디를 입력하세요.");
		return false;
	}

	if (!form.resPW.value) {
		alert("패스워드를 입력하세요.");
		return false;
	}

	if (!form.resName.value) {
		alert("식당명을 입력하세요.");
		return false;
	}

	if (!form.resAddr.value) {
		alert("식당주소를 입력하세요.");
		return false;
	}

	if (!form.resAddr.value) {
		alert("전화번호 앞자리를 입력하세요.");
		return false;
	}

	if (!form.resAddr.value) {
		alert("전화번호 중간자리를 입력하세요.");
		return false;
	}

	if (!form.resAddr.value) {
		alert("전화번호 뒷자리를 입력하세요.");
		return false;
	}
	if (!form.resAddr.value) {
		alert("사업자번호 앞자리를 입력하세요.");
		return false;
	}

	if (!form.resAddr.value) {
		alert("사업자번호 중간자리를 입력하세요.");
		return false;
	}

	if (!form.conum_l.value) {
		alert("사업자번호 뒷자리를 입력하세요.");
		return false;
	}
	//전화번호 체크
	if (form.resPhone.value.length < 3) {
		alert("전화번호를 체크하세요.");
		return false;
	}
	
	//사업자번호 체크
	if (form.co_Num.value.length < 3) {
		alert("사업자번호를 체크하세요.");
		return false;
	}

} //--valForm(form)

$(document).ready(function() {
	let cloneObj = $("#idDiv").clone(); //초기화용 복사객체

	$("#resID").on("blur", function() {
		var resID = $("#resID").val();
		var voData = { "resID": resID };
		//console.log(voData); 

		$.ajax({
			url: '/restaurant/idcheck',
			type: 'post',
			data: JSON.stringify(voData),
			contentType: "application/json; charset=utf-8;",
			success: function(result) {
				console.log("중복체크 결과:" + result);
				if (result === "true") {
					alert(resID + " 는 사용가능한 아이디 입니다.");
					return;
				} else {
					alert(resID + "는 사용중인 아이디입니다. 다른 아이디를 입력하세요.");
					$("#idDiv").html(cloneObj.html()); //아이디칸 초기화
					return;
				}
			}
		});//--ajax
	});//아이디 중복체크

	// 전화번호 합치기
	$("#phone_f").on("propertychange change paste input", function(){
		var frontN = $("#phone_f").val();
		var midN = $("#phone_m").val();
		var lastN = $("#phone_l").val();
		var resPhone = frontN + "-" + midN + "-" + lastN;
		$("#resPhone").val(resPhone);
	});
	
		$("#phone_m").on("propertychange change paste input", function(){
		var frontN = $("#phone_f").val();
		var midN = $("#phone_m").val();
		var lastN = $("#phone_l").val();
		var resPhone = frontN + "-" + midN + "-" + lastN;
		$("#resPhone").val(resPhone);
	});
	
		$("#phone_l").on("propertychange change paste input", function(){
		var frontN = $("#phone_f").val();
		var midN = $("#phone_m").val();
		var lastN = $("#phone_l").val();
		var resPhone = frontN + "-" + midN + "-" + lastN;
		$("#resPhone").val(resPhone);
	});
	
	//사업자번호 합치기
	$("#conum_f").on("propertychange change paste input", function(){
		var frontN = $("#conum_f").val();
		var midN = $("#conum_m").val();
		var lastN = $("#conum_l").val();
		var resPhone = frontN + "-" + midN + "-" + lastN;
		$("#co_Num").val(resPhone);
	});
	
		$("#conum_m").on("propertychange change paste input", function(){
		var frontN = $("#conum_f").val();
		var midN = $("#conum_m").val();
		var lastN = $("#conum_l").val();
		var resPhone = frontN + "-" + midN + "-" + lastN;
		$("#co_Num").val(resPhone);
	});
	
		$("#conum_l").on("propertychange change paste input", function(){
		var frontN = $("#conum_f").val();
		var midN = $("#conum_m").val();
		var lastN = $("#conum_l").val();
		var resPhone = frontN + "-" + midN + "-" + lastN;
		$("#co_Num").val(resPhone);
	});
	
	
	//가입오류메시지 보이기--**테스트 안됨(0918)
	var regResult = $("#result").val();
	var alertDVI = $(".alert alert-danger");
	var msgArea = $(".alert alert-danger p");
	console.log($("#result").val);
	if(regResult=="error"){
		msgArea.html("가입오류. 관리자에게 문의하세요.");
		alertDVI.attr("display", block);
	}
	
	}); //--$(document).ready

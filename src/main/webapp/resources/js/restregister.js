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

	if (!form.phone_f.value) {
		alert("전화번호 앞자리를 입력하세요.");
		return false;
	}

	if (!form.phone_m.value) {
		alert("전화번호 중간자리를 입력하세요.");
		return false;
	}

	if (!form.phone_l.value) {
		alert("전화번호 뒷자리를 입력하세요.");
		return false;
	}
	if (!form.conum_f.value) {
		alert("사업자번호 앞자리를 입력하세요.");
		return false;
	}

	if (!form.conum_m.value) {
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

	//중복확인 체크
	var checkID = $("#dupleCheck").data("value");
	if (checkID === 1) {
		alert("다른 아이디로 중복체크를 진행하세요.");
		return false;
	}
	if (checkID === 0) {
		alert("아이디 중복확인을 클릭하세요.");
		return false;
	}

} //--valForm(form)

$(document).ready(function() {
	//let cloneObj = $("#idDiv").clone(); //초기화용 복사객체
	let checkBtn = $("#dupleCheck");
	let btnTag = $("a[id='dupleCheck']");

	//아이디 중복확인
	checkBtn.on("click", function() {
		var resID = $("#resID").val();
		if (resID == null || resID == '') {
			alert("아이디를 입력하세요.");
			return;
		}
		var voData = { "resID": resID };
		btnTag.data("value", "1"); //클릭시 1
		$.ajax({
			url: '/restaurant/idcheck',
			type: 'post',
			data: JSON.stringify(voData),
			contentType: "application/json; charset=utf-8;",
			success: function(result) {
				console.log("중복체크 결과:" + result);
				if (result === "true") {
					alert(resID + " 는 사용가능한 아이디 입니다.");
					btnTag.data("value", "2"); //완료시 2
					return;
				} else {
					alert(resID + "는 사용중인 아이디입니다. 다른 아이디를 입력하세요.");
					btnTag.data("value", "1"); //실패시 1
					return;
				}
			}
		});//--ajax
	});


	// 전화번호 합치기 //**10/05추가하여 수정:유효성-자리수체크+다음칸 넘기기 */
	var phonGroup = $(".phone input");
	phonGroup.on("propertychange change paste input", function(){
		var frontpN = $("#phone_f").val();
		var midpN = $("#phone_m").val();
		var lastpN = $("#phone_l").val();
		var resPhone = frontpN + "-" + midpN + "-" + lastpN;
		$("#resPhone").val(resPhone);
		if (frontpN.length == 3) { $("#phone_m").focus(); }
		if (midpN.length == 4) { $("#phone_l").focus(); }
		if (lastpN.length == 4) { $("#resAddr").focus(); }
		console.log("test:" + resPhone);
	});
	
	
	var conumGroup = $(".comun input");
	conumGroup.on("propertychange change paste input", function(){
		var frontcN = $("#conum_f").val();
		var midcN = $("#conum_m").val();
		var lastcN = $("#conum_l").val();		
		var resCoNum = frontcN + "-" + midcN + "-" + lastcN;		
		$("#co_Num").val(resCoNum);
		if (frontcN.length == 3) { $("#conum_m").focus(); }
		//console.log("test:" + frontcN.length);
		if (midcN.length == 2) { $("#conum_l").focus(); }
		if (lastcN.length == 5) { $("#conum_l").blur(); }
		console.log("test:" + resCoNum);
	});




	//가입오류메시지 보이기--**테스트 안됨(0918)
	var regResult = $("#result").val();
	var alertDVI = $(".alert alert-danger");
	var msgArea = $(".alert alert-danger p");
	//console.log($("#result").val);
	if (regResult == "error") {
		msgArea.html("가입오류. 관리자에게 문의하세요.");
		alertDVI.attr("display", block);
	}



}); //--$(document).ready



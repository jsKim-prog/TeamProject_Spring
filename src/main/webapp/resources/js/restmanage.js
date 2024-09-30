/**
 * restmanage.js : myrestaurant.jsp
 */

$(document).ready(function() {
	var result = $("#common_result").val();
	//console.log("test: modify submit 실행: " + result);
	checkResult(result);
	history.replaceState({}, null, null);

	function checkResult(result) {
		if(result===''||history.state){
			return;
		}
		if (result == "success") {
			alert("정보 변경 성공");
		} else if(result == "delsuccess"){
			alert("정보 삭제 성공");
		} else {
			alert(result);
		}
	}


	var resnum = $("#rest_resNum").val();
	console.log("test:" + resnum);
	//전화번호, 사업자번호 세팅

	var resPhone = $("#resPhone").val();
	var co_num = $("#co_Num").val();

	showNum(resPhone, co_num);
	function showNum(resPhone, co_num) {
		var phones = resPhone.split("-");
		$("#phone_f").val(phones[0]);
		$("#phone_m").val(phones[1]);
		$("#phone_l").val(phones[2]);
		console.log(phones);

		var conums = co_num.split("-");
		$("#conum_f").val(conums[0]);
		$("#conum_m").val(conums[1]);
		$("#conum_l").val(conums[2]);
		console.log(conums);
	}

	var divNum = $("input[name='divNum']");
	divNum.on("propertychange change paste input", function(e) {
		var frontpN = $("#phone_f").val();
		var midpN = $("#phone_m").val();
		var lastpN = $("#phone_l").val();
		var frontcN = $("#conum_f").val();
		var midcN = $("#conum_m").val();
		var lastcN = $("#conum_l").val();
		var resPhone = frontpN + "-" + midpN + "-" + lastpN;
		var resCoNum = frontcN + "-" + midcN + "-" + lastcN;
		$("#resPhone").val(resPhone);
		$("#co_Num").val(resCoNum);
		console.log("test:" + resCoNum);
		console.log("test:" + resPhone);
	});

	//tab : 미등록상태 -> 모달-> 링크연결(resnum 함께 전송)**메뉴는 미등록 리스트 보이기
	var nonOper = $("#nonOper a");
	var nonSale = $("#nonSales a");
	var nonMenu = $("#nonMenu a");

	var modalBtn = $("#modalRegBtn");

	//var resnumForm = $("#resnumForm");
	//var resNum = $("#rest_resNum").val();
	var mtitle = $(".modal-title");
	var mbody = $(".modal-body ul");
	var mbodyStr = "";

	nonOper.click(function() {
		mbodyStr = "<p>영업정보가 미등록 상태입니다. 등록하러 가시겠습니까?</p>";
		mtitle.html("Happy Table");
		mbody.html(mbodyStr);
		modalBtn.show();
		modalBtn.attr("onclick", "location.href = '/restaurant/reginfo'")
	});

	nonSale.click(function() {
		mbodyStr = "<p>테이블 운영정보가 미등록 상태입니다. 등록하러 가시겠습니까?</p>";
		mtitle.html("Happy Table");
		mbody.html(mbodyStr);
		modalBtn.show();
		modalBtn.attr("onclick", "location.href = '/restaurant/regtable'")

	});


	nonMenu.click(function() {
		mbodyStr = "<p>메뉴가 미등록 상태입니다. 등록하러 가시겠습니까?</p>";
		mtitle.html("Happy Table");
		mbody.html(mbodyStr);
		modalBtn.show();
		modalBtn.attr("onclick", "location.href = '/restaurant/menufilelist'")
	});



	//기본정보 - 변경하기			
	$("button[data-oper='modify']").on("click", function() {
		var restForm = $("form[id='restForm']");
		restForm.submit();		
	});



}); //--$(document).ready



function valForm(form) {

	if (!form.resPW.value) {
		alert("패스워드를 입력하세요.");
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

} //--valForm(form)
/**
 * restmanage.js : myrestaurant.jsp
 */

$(document).ready(function() {
	var resnum = $("#rest_resNum").val();
	console.log("test:" + resnum);
	//전화번호, 사업자번호 불러오기
	var resPhone = $("#resPhone").val();
	var phones = resPhone.split("-");
	$("#phone_f").val(phones[0]);
	$("#phone_m").val(phones[1]);
	$("#phone_l").val(phones[2]);
	console.log(phones);

	var co_num = $("#co_Num").val();
	var conums = co_num.split("-");
	$("#conum_f").val(conums[0]);
	$("#conum_m").val(conums[1]);
	$("#conum_l").val(conums[2]);
	console.log(conums);

	//tab : 미등록상태 -> 모달-> 링크연결(resnum 함께 전송)**메뉴는 미등록 리스트 보이기
	var nonOper = $("#nonOper a");
	var nonSale = $("#nonSales a");
	var nonMenu = $("#nonMenu a");

	var modalBtn = $("#modalRegBtn");

	//var resnumForm = $("#resnumForm");
	var resNum = $("#rest_resNum").val();
	var mtitle = $(".modal-title");
	var mbody = $(".modal-body ul");
	var mbodyStr ="";

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
		modalBtn.attr("onclick", "location.href = '/restaurant/regmenu'")
	});
	

	
}); //--$(document).ready
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
	//var resNum = $("#rest_resNum").val();
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
		modalBtn.attr("onclick", "location.href = '/restaurant/menulist'")
	});
	
	
	//기본정보 - 변경하기	
	console.log(restData);
	$("#modRestBtn").on("click", function(e){
		e.preventDefault(); //Rest->ajax
		var restForm = $("#restForm");
		var restData = new FormData(restForm);
		console.log(restData);
		modRest(restData, function(result){
			console.log(result);
		});
	});

	
}); //--$(document).ready

//레스토랑 수정 함수
function modRest(restData, callback, error){
	console.log("test: modify ajax 실행----");
	console.log("test:"+restData.resNum);
	$.ajax({
			url: '/restaurant/modrest',
			type: 'put',
			data: JSON.stringify(restData),
			contentType:'application/json; charset=utf-8',
			success: function(result, status, xhr){
				if(callback){
					callback(result);
				}				
			},
			error: function(xhr, status, er){
				if(error){error(er);}
			}
		}); //--ajax
}
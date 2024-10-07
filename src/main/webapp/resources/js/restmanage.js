/**
 * restmanage.js : myrestaurant.jsp
 */

$(document).ready(function() {
	var result = $("#common_result").val();
	//console.log("test: modify submit 실행: " + result);
	checkResult(result);
	history.replaceState({}, null, null);

	function checkResult(result) {
		if (result === '' || history.state) {
			return;
		}
		if (result == "success") {
			alert("정보 변경 성공");
		} else if (result == "delsuccess") {
			alert("정보 삭제 성공");
		} else {
			alert(result);
		}
	}


	var resnum = $("#rest_resNum").val();
	console.log("test:" + resnum);
	//전화번호, 사업자번호 세팅

	portingService.checkReg(resnum, function(regResult) {
		console.log("test 등록여부:" + regResult);
		var result = parseInt(regResult);
		if (result > 0) { //등록완료
			porting.pbtnDisabler();
		} else {
			porting.pbtnabler();
		}
	});



	var resPhone = $("#resPhone").val();
	var co_num = $("#co_Num").val();

	showNum(resPhone, co_num);
	function showNum(resPhone, co_num) {
		var phones = resPhone.split("-");
		$("#phone_f").val(phones[0]);
		$("#phone_m").val(phones[1]);
		$("#phone_l").val(phones[2]);
		//console.log(phones);

		var conums = co_num.split("-");
		$("#conum_f").val(conums[0]);
		$("#conum_m").val(conums[1]);
		$("#conum_l").val(conums[2]);
		//console.log(conums);
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
		//console.log("test:" + resCoNum);
		//console.log("test:" + resPhone);
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
	
	
	//홈페이지 등록버튼 클릭
	$("#portingBtn").on("click", function(){
		var ckReg = porting.regAllInfoCK();
		if(!ckReg){return;} //미등록정보 있을 시 리턴
		var resNum = $("#resNum").val();
		portingService.regResNum(resNum, function(regResult){
			if(regResult=="success"){
				alert("홈페이지 등록 성공");
				location.href='/restaurant/myrestaurant"'
			}else{
				alert("등록오류. 관리자에게 문의하세요.");
			}
		});
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


var porting = (function() {
	//정보등록 완료 여부 체크
	function regAllInfoCK() {
		var nonOper = $("#nonOper").length;
		var nonTable = $("#nonSales").length;
		var nonMenu = $("#nonMenu").length;

		if (nonOper > 0) {
			alert("영업정보를 등록해 주세요.");
			return false;
		}

		if (nonTable > 0) {
			alert("테이블 운영정보를 등록해 주세요.");
			return false;
		}

		if (nonMenu > 0) {
			alert("메뉴를 등록해 주세요.");
			return false;
		}

		return true;
	}

	//버튼 비활성화
	function pbtnDisabler() {
		var btn = $("#portingBtn");
		btn.removeClass();
		btn.addClass("btn btn-default");
		btn.prop("disabled", true);
		btn.text("홈페이지 등록 완료");
		//btn.attr("value", "홈페이지 등록 완료");

		var guide = $("#portingGuide"); //span영역
		guide.removeClass();
		guide.addClass("text-primary");
		guide.text("현재 정보는 홈페이지에서 확인이 가능합니다.");
	}

	//버튼 활성화
	function pbtnabler() {
		var btn = $("#portingBtn");
		btn.removeClass();
		btn.addClass("btn btn-warning");
		btn.prop("disabled", false);
		btn.text("홈페이지 등록");
		//btn.attr("value", "홈페이지 등록");

		var guide = $("#portingGuide"); //span영역
		guide.removeClass();
		guide.addClass("text-danger");
		guide.text("홈페이지 등록이 완료되어야 홈페이지에서 확인이 가능합니다.");
	}

	return {
		regAllInfoCK: regAllInfoCK,
		pbtnabler: pbtnabler,
		pbtnDisabler: pbtnDisabler
	}
})();

//포팅 서비스
var portingService = (function() {
	//등록
	function regResNum(resNum, callback, error) {
		console.log("test: " + resNum);
		$.ajax({
			url: '/restaurant/porting/' + resNum,
			type: 'get',
			success: function(portingRst) {
				console.log(portingRst);
				if (callback) {
					callback(portingRst);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});
	}

	//등록여부 조회
	function checkReg(resNum, callback, error) {
		console.log("test: " + resNum);
		$.get("/restaurant/checkservice/" + resNum+".json",function(portingRst){
			if (callback) {
					callback(portingRst);
				}
		}).fail(function(xhr, status, err){
			if (error) {
					error();
				}
		});
	}

	//삭제
	function stopService(resNum, callback, error) {
		console.log("test: " + resNum);
		$.ajax({
			url: '/restaurant/stopservice/' + resNum,
			type: 'delete',
			success: function(portingRst) {
				console.log(portingRst);
				if (callback) {
					callback(portingRst);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});
	}

	return {
		regResNum: regResNum,
		checkReg: checkReg,
		stopService: stopService
	}

})();
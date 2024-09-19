/**
 * restreginfo.js -> reginjfo.jsp
 */

$(document).ready(function() {
	var resnum = $("#oper_resNum").val();
	console.log("test:" + resnum);
	//브레이크타임 여부에 따라 입력칸 나타내기
	$("#bt_true").on("click", function() {
		var inputDiv = $("#breaktime_input");
		inputDiv.attr("style", "display: block");
	});//--$("#bt_true").on("click")

	$("#bt_false").on("click", function() {
		var inputDiv = $("#breaktime_input");
		inputDiv.attr("style", "display: none");
	});//--$("#bt_true").on("click")

	//휴무일 카테고리 따라 활성화	
	$("#dayoff_cate").on("change", function() {
		var dayoffcateVal = $("#dayoff_cate").val();
		var weekSelBox = $("#dayoff_weekCnt");
		var daySelBox = $("#dayoff_Day");
		if (dayoffcateVal === "연중무휴") {//연중무휴인 경우
			weekSelBox.prop("disabled", true);
			$("#dayoff_weekCnt option[value='-']").prop("selected", true);
			daySelBox.prop("disabled", true);
			$("#dayoff_Day option[value='-']").prop("selected", true);
		}
		if (dayoffcateVal === "매월") { //매월 선택
			weekSelBox.prop("disabled", false);
			$("#dayoff_weekCnt option[value='1']").prop("selected", true);
			daySelBox.prop("disabled", false);	
			$("#dayoff_Day option[value='월']").prop("selected", true);
		}
		if (dayoffcateVal === "매주") { //매주 선택
			weekSelBox.prop("disabled", true);
			$("#dayoff_weekCnt option[value='-']").prop("selected", true);	
			daySelBox.prop("disabled", false);	
			$("#dayoff_Day option[value='월']").prop("selected", true);
		}
	});//--$("#dayoff_cate").on("chage")

	//예약금 설정따라 활성화
	$("#adPay_true").on("click", function() {
		var inputDiv = $("#adPay_input");
		inputDiv.attr("style", "display: block");
	});//--$("#adPay_true").on("click")

	$("#adPay_false").on("click", function() {
		var inputDiv = $("#adPay_input");
		inputDiv.attr("style", "display: none");
	});//--$("#adPay_false").on("click")

	//예약금 모달창 열리기
	$("#queBtn").on("click", function() {

		$(".modal").modal("show");
	});//--$("#queBtn").on("click")
	
	//**0918추가 : 메뉴지정예약 값 처리(체크박스선택값 처리) */
	$("input[type='checkbox']").on("change", function(e){
		var checkVal = $(this).is(":checked"); //체크여부(true, false)
		if(!checkVal){
			$(this).prev().val('false');
			console.log($("input[name='menuReserv']").val());
		}
				
		if(checkVal){ //해당 체크박스가 체크상태라면
			$(this).prev().val('true');	
			console.log($("input[name='menuReserv']").val());		
		}
	});

	//시간값 처리
	$("#inputTime_op").on("focusout", function() {
		var inputTime = $(this).val();
		var strTime = inputTime + "";
		$("#openTime").val(strTime);
		console.log(inputTime);
		console.log(strTime);
	});

	$("#inputTime_ed").on("focusout", function() {
		var inputTime = $(this).val();
		var strTime = inputTime + "";
		$("#endTime").val(strTime);
		console.log(inputTime);
		console.log(strTime);
	});

	$("#input_btst").on("focusout", function() {
		var inputTime = $(this).val();
		var strTime = inputTime + "";
		$("#breakTime_start").val(strTime);
		console.log(inputTime);
		console.log(strTime);
	});

	$("#input_bted").on("focusout", function() {
		var inputTime = $(this).val();
		var strTime = inputTime + "";
		$("#breakTime_end").val(strTime);
		console.log(inputTime);
		console.log(strTime);
	});

}); //--$(document).ready

function valForm(form) {
	if (!form.inputTime_op.value) {
		alert("영업시작 시간을 입력하세요.");
		return false;
	}

	if (!form.inputTime_ed.value) {
		alert("영업종료 시간을 입력하세요.");
		return false;
	}
	
	if(form.dayoff_cate.value==="매월"){
		if(form.dayoff_weekCnt.value==="-"){
			alert("휴무일이 속한 주를 선택하세요.");
			return false;						
		}
		if(form.dayoff_Day.value==="-"){
			alert("휴무 요일을 선택하세요.");
			return false;		
		}
	}
	
	if(form.dayoff_cate.value==="매주"){
		if(form.dayoff_Day.value==="-"){
			alert("휴무 요일을 선택하세요.");
			return false;		
		}
	}
	
	if(form.adPaySel.value==="true"){
		if(!form.adPayCond.value|| form.adPayCond.value==''){
			alert("예약금을 지불할 최소인원을 입력하세요.");
			return false;		
		}
		if(!form.adPay.value|| form.adPay.value==''){
			alert("예약금액을 입력하세요.");
			return false;		
		}
	}


} //--valForm(form)
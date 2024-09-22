/**
 * restget.js -> myrestaurant.jsp(include page)
 */

$(document).ready(function() {
	/*영업정보관리-페이지 로드*/
	

	//라디오 버튼값 활성화
	var breakTimeResult = $("#breakTime").val();
	var adPaySelResult = $("#adPaySel").val();
	showRadio(breakTimeResult, adPaySelResult);
	function showRadio(breakTimeResult, adPaySelResult) {
		console.log("testbreakTime:" + breakTimeResult)
		console.log("testadPaySel:" + adPaySelResult)
		var bt_t = $("input[id='bt_true']"); //브레이크타임
		var bt_f = $("input[id='bt_false']");
		var ad_t = $("input[id='adPay_true']"); //adPay
		var ad_f = $("input[id='adPay_false']");
		if (breakTimeResult=="true") {
			bt_t.prop("checked", true);
			var inputDiv = $("#breaktime_input");
			inputDiv.attr("style", "display: block");
		} else {
			bt_f.prop("checked", true);
			var inputDiv = $("#breaktime_input");
			inputDiv.attr("style", "display: none");
		}

		if (adPaySelResult=="true") {
			ad_t.prop("checked", true);
			var inputDiv = $("#adPay_input");
			inputDiv.attr("style", "display: block");
		} else {
			ad_f.prop("checked", true);
			var inputDiv = $("#adPay_input");
			inputDiv.attr("style", "display: none");
		}
	}



	//select default값 부르기
	var do_data = $("#dayoff_cate_data").val();
	var do_op = $("#dayoff_cate option[value=" + do_data + "]");
	//console.log("test:"+do_data);
	//console.log("test:"+do_op);
	do_op.prop("defaultSelected", true);

	var do_wdata = $("#dayoff_weekCnt_data").val();
	var do_wop = $("#dayoff_weekCnt option[value=" + do_wdata + "]");
	do_wop.prop("defaultSelected", true);


	var do_ddata = $("#dayoff_Day_data").val();
	var do_dop = $("#dayoff_Day option[value=" + do_ddata + "]");
	do_dop.prop("defaultSelected", true);
	console.log("test:" + do_ddata);

	//**0918추가 : 메뉴지정예약 선택여부에 따라 보이기 */
	var menuReservVal = $("#menuReserv").val();
	if (menuReservVal == "true") {
		$("input[id='inputMenuRev']").attr("checked", true);
	} else {
		$("input[id='inputMenuRev']").attr("checked", false);
	}



	//예약금 모달창 열리기
	$("#queBtn2").on("click", function() {
		var mtitle = $(".modal-title");
		var mbody = $(".modal-body ul");
		var mbodyStr = "<li>예약금을 설정하시면 단체예약시 예약금을 선결제한 회원의 예약정보만 받을 수 있습니다.</li>"
			+ "<li>예약금을 선결제할 최소 예약인원과 선결제 받을 금액을 설정할 수 있습니다.</li>"
			+ "<li>설정을 원하시면 [설정함]을, 원하지 않으면 [설정안함]을 선택하세요.</li>";
		var modalRegBtn = $("button[id='modalRegBtn']");
		modalRegBtn.hide();
		mtitle.html("예약금 설정");
		mbody.html(mbodyStr);
	});//--$("#queBtn").on("click")

	$("button[data-oper='opermodify']").on("click", function() {
		var operForm = $("form[id='reginfoForm']");
		operForm.submit();
	});
	
	$("button[data-oper='operdelete']").on("click", function() {
		var operForm = $("form[id='reginfoForm']");
		operForm.attr("action", "/restaurant/deloper")
		operForm.submit();
	});

});//-- $(document).ready




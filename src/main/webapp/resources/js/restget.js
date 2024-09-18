/**
 * restget.js -> myrestaurant.jsp(include page)
 */

$(document).ready(function() {
	/*영업정보관리-페이지 로드*/
	
	//라디오 버튼값 활성화
	var breakTimeResult = $("#breakTime").val();
	var adPaySelResult = $("#adPaySel").val();
	var bt_t = $("input[id='bt_true']"); //브레이크타임
	var bt_f = $("input[id='bt_false']");
	var ad_t = $("input[id='adPay_true']"); //adPay
	var ad_f = $("input[id='adPay_false']");
	if(breakTimeResult){
		bt_t.prop("checked", true);
		var inputDiv = $("#breaktime_input");
		inputDiv.attr("style", "display: block");
	}else{
		bt_f.prop("checked", true);
		var inputDiv = $("#breaktime_input");
		inputDiv.attr("style", "display: none");
	}
	
	if(adPaySelResult){
		ad_t.prop("checked", true);
		var inputDiv = $("#adPay_input");
		inputDiv.attr("style", "display: block");
	}else{
		ad_f.prop("checked", true);
		var inputDiv = $("#adPay_input");
		inputDiv.attr("style", "display: none");
	}
	
	//select default값 부르기
	var do_data = $("#dayoff_cate_data").val();
	var do_op = $("#dayoff_cate option[value="+do_data+"]");
	//console.log("test:"+do_data);
	//console.log("test:"+do_op);
	do_op.prop("defaultSelected", true);
	
	var do_wdata = $("#dayoff_weekCnt_data").val();
	var do_wop = $("#dayoff_weekCnt option[value="+do_wdata+"]");
	do_wop.prop("defaultSelected", true);

	
	var do_ddata = $("#dayoff_Day_data").val();
	var do_dop = $("#dayoff_Day option[value="+do_ddata+"]");
	do_dop.prop("defaultSelected", true);
	console.log("test:"+do_ddata);
	
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



});//-- $(document).ready




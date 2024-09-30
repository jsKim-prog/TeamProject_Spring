/**
 * restreginfo.js -> reginjfo.jsp, getoper.jsp
 */

$(document).ready(function() {
	var resnum = $("#oper_resNum").val();
	console.log("test:" + resnum);
	//시간설정
	let timebox = $("input[type='time']");
	let selbox = $("select[id^='dayoff_']");
	let radiobox = $("input[type='radio']");
	//let checkbox = $("input[type='checkbox']");
	settingbox();
	function settingbox() {
		console.log(timebox);
		console.log(selbox);
		console.log(radiobox);

		timebox.each(function(index, item) {
			var timeID = $(item).attr("id");
			var timeNamebox = $(".panel-body").find("input[name=" + timeID + "]");
			$(item).attr("value", timeNamebox.value);
			console.log("test timeID:" + timeID);
			console.log("test:" + timeNamebox.attr("name") + timeNamebox.val());
		});

		selbox.each(function(index, item) {
			var selID = $(item).attr("id");
			var selNamebox = $("#dayoff").find("input[name=" + selID + "]");
			$(item).attr("value", selNamebox.value);
			console.log("test selbox:" + selNamebox.attr("name") + selNamebox.val());
		});

		radiobox.each(function(index, item) {
			var radioclass = $(item).attr("name");
			console.log("test:" + radioclass);
			var radioNamebox = $(".radioSelect").find("input[name=" + radioclass + "]");
			var radioval = radioNamebox.value? "set1": "set2";
			switch(radioval){
				case "set1":
				if($(item).value==true){
					$(item).prop("checked", true);
				}else{
					$(item).prop("checked", false);
				}
				break;
				case "set2":
				if($(item).value==true){
					$(item).prop("checked", false);
				}else{
					$(item).prop("checked", true);
				}
				break;
			}			
			//console.log("test:" + radioclass);
			//console.log("test:" + radioval);
			//console.log("test namebox:" + radioNamebox.attr("name") + radioNamebox.val());
		});


		var menuReservVal = $("#menuReserv").val();
		if (menuReservVal == "true") {
			$("input[id='inputMenuRev']").attr("checked", true);
		} else {
			$("input[id='inputMenuRev']").attr("checked", false);
		}
	
	}

	timebox.on("change", function(e) {
		var time = $(this).val();
		var timeID = $(this).attr("id");
		var timeNamebox = $(".panel-body").find("input[name=" + timeID + "]");
		timeNamebox.attr("value", time + "");
		console.log("test:" + timeNamebox.attr("name") + " " + timeNamebox.val());
	});


	selbox.on("change", function(e) {
		var selval = $(this).val();
		var selID = $(this).attr("id");
		var selNamebox = $("#dayoff").find("input[name=" + selID + "]");
		selNamebox.attr("value", selval);
		console.log("test selbox:" + selNamebox.attr("name") + selNamebox.val());
	});

	radiobox.on("click", function() {
		var checkval = $(this).val();
		var radioName = $(this).attr("name").split("_", 1);
		var radioNamebox = $(".radioSelect").find("input[name=" + radioName + "]");
		radioNamebox.attr("value", checkval);
		console.log("test namebox:" + radioNamebox.val());
	});

	//브레이크타임 여부에 따라 입력칸 나타내기
	$("#bt_true").on("click", function(e) {
		var inputDiv = $("#breaktime_input");
		inputDiv.attr("style", "display: block");
	});//--$("#bt_true").on("click")

	$("#bt_false").on("click", function(e) {
		var inputDiv = $("#breaktime_input");
		inputDiv.attr("style", "display: none");
	});//--$("#bt_true").on("click") */

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
			$("#dayoff_weekCnt").val("-");
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

	//예약금 모달창 열리기(in myrestaurnat)
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

	//**0918추가 : 메뉴지정예약 값 처리(체크박스선택값 처리) */
	$("input[type='checkbox']").on("change", function(e) {
		var checkVal = $(this).is(":checked"); //체크여부(true, false)
		if (!checkVal) {
			$(this).prev().val('false');
			console.log($("input[name='menuReserv']").val());
		}

		if (checkVal) { //해당 체크박스가 체크상태라면
			$(this).prev().val('true');
			console.log($("input[name='menuReserv']").val());
		}
	});

	//수정, 삭제 기능
	$(".clearfix button").on("click", function() {
		var oper = $(this).data("oper");
		var operForm = $("form[id='getinfoForm']");
		if (oper == "opermodify") {
			operForm.attr("action", "/restaurant/modoper");
		} else if (oper == "operdelete") {
			operForm.attr("action", "/restaurant/deloper").attr("method", "post");
		}
		operForm.submit();
	});


}); //--$(document).ready

function valForm(form) {
	var openTime = $("input[name='openTime']").val();
	var endTime = $("input[name='endTime']").val();
	var breaktime = $("input[name='breakTime']").val();
	var breakTime_start = $("input[name='breakTime_start']").val();
	var breakTime_end = $("input[name='breakTime_end']").val();
	var dayoff_cate = $("input[name='dayoff_cate']").val();
	var dayoff_weekCnt = $("input[name='dayoff_weekCnt']").val();
	var dayoff_Day = $("input[name='dayoff_Day']").val();
	var adPaySel = $("input[name='adPaySel']").val();
	var adPayCond = $("input[name='adPayCond']").val();
	var adPay = $("input[name='adPay']").val();

	if (openTime == "--:--" || openTime == "") {
		console.log(openTime);
		alert("영업시작 시간을 입력하세요.");
		return false;
	}

	if (endTime == "--:--" || endTime == '') {
		console.log(endTime);
		alert("영업종료 시간을 입력하세요.");
		return false;
	}

	if (dayoff_cate === "매월") {
		if (dayoff_weekCnt === "-") {
			alert("휴무일이 속한 주를 선택하세요.");
			return false;
		}
		if (dayoff_Day === "-") {
			alert("휴무 요일을 선택하세요.");
			return false;
		}
	}

	if (dayoff_cate === "매주") {
		if (dayoff_Day === "-") {
			alert("휴무 요일을 선택하세요.");
			return false;
		}
	}

	if (adPaySel === "true") {
		if (adPayCond == null || adPayCond == '') {
			alert("예약금을 지불할 최소인원을 입력하세요.");
			return false;
		}
		if (adPay == null || adPay == '') {
			alert("예약금액을 입력하세요.");
			return false;
		}
	}

	if (breaktime === "true") {
		if (breakTime_start === "--:--" || breakTime_start === '') {
			alert("브레이크타임 시작시간을 입력하세요.");
			return false;
		}
		if (breakTime_end === "--:--" || breakTime_end === '') {
			alert("브레이크타임 시작시간을 입력하세요.");
			return false;
		}
	}

	return true;


} //--valForm(form)
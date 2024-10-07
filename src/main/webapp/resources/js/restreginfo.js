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
	operset.timeDefSet();
	operset.selDefSet();
	operset.radioDefSet();
	operset.checkboxSet();

	timebox.on("change", function(e) {
		var time = $(this).val();
		//var timeID = $(this).attr("id");
		var timeName = $(this).next();
		timeName.val(time + "");
		//console.log("test:" + timeName.attr("name") + " " + timeName.val());
	});


	selbox.on("change", function(e) {
		var selval = $(this).val();
		var selID = $(this).attr("id");
		var selNamebox = $("#dayoff").find("input[name=" + selID + "]");
		selNamebox.attr("value", selval);
		operView.viewDayoff();
		console.log("test selbox:" + selNamebox.attr("name") + selNamebox.val());
	});

	radiobox.on("click", function(e) {
		var checkval = $(this).val();
		var radioName = $(this).attr("name").split("_");
		var radioNamebox = $(".radioSelect").find("input[name=" + radioName[0] + "]");
		radioNamebox.attr("value", checkval);
		operView.viewradioResult(radioName[0]);
		//console.log("test namebox:" + radioNamebox.val());
	});




	//예약금 모달창 열리기(in myrestaurnat)
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

	//**0918추가 : 메뉴지정예약 값 처리(체크박스선택값 처리) */
	$("input[type='checkbox']").on("change", function(e) {
		var checkVal = $(this).is(":checked"); //체크여부(true, false)
		if (!checkVal) {
			$(this).prev().val('false');
			//console.log($("input[name='menuReserv']").val());
		}

		if (checkVal) { //해당 체크박스가 체크상태라면
			$(this).prev().val('true');
			//console.log($("input[name='menuReserv']").val());
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
		//console.log(openTime);
		alert("영업시작 시간을 입력하세요.");
		return false;
	}

	if (endTime == "--:--" || endTime == '') {
		//console.log(endTime);
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
		if (adPayCond == 0 || adPayCond == '') {
			alert("예약금을 지불할 최소인원을 입력하세요.");
			return false;
		}
		if (adPay == 0 || adPay == '') {
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
			alert("브레이크타임 종료시간을 입력하세요.");
			return false;
		}
	}

	return true;


} //--valForm(form)

//화면초기세팅용 메서드
var operset = (function() {
	//timebox, selectbox, radiobox별 값 settring(name의 default값->화면에 입력)
	function timeDefSet() {
		let timebox = $("input[type='time']");
		timebox.each(function(index, item) {
			//var timeID = $(item).attr("id");
			var timeNameval = $(item).next().val();
			$(item).val(timeNameval);
			//console.log("test timeID:" + timeID);
			//console.log("test:" + $(item).next().attr("name") + timeNameval);
		});
	}

	function selDefSet() {
		let selbox = $("select[id^='dayoff_']");
		selbox.each(function(index, item) {
			var selID = $(item).attr("id");
			var selNamebox = $("#dayoff").find("input[name=" + selID + "]");
			$(item).attr("value", selNamebox.value);
			//console.log("test selbox:" + selNamebox.attr("name") + selNamebox.val());
			//console.log("test idselbox:" + $(item).val());
		});
	}

	function radioDefSet() {
		let radiobox = $("input[type='radio']");
		radiobox.each(function(index, item) {
			var radioName = $(item).attr("name");
			//console.log("test:" + radioName);
			var boxName = radioName.split("_"); //radio name이 2개 씩이라 하나씩 변수에 넣어서 잘라야 함
			//console.log("test boxName:" + boxName[0]);
			var radioNamebox = $(".radioSelect").find("input[name=" + boxName[0] + "]");
			var nameval = radioNamebox.val();
			//console.log("test nameval:" + nameval);
			//값에 따른 라디오버튼 활성화
			if (item.value == nameval) {
				$(item).prop("checked", true);
			} else {
				$(item).prop("checked", false);
			}
			//console.log("test radiodef:" + boxName + nameval);
			//console.log("test radiodef_name:" + radioval);
			//input 박스 보이기 설정
			var inputID = boxName[0] + "_input";
			//console.log("test inputID :" + inputID);
			var inputDiv = $(".row [id='" + inputID + "']");
			if (nameval == "true") {
				inputDiv.css("display", "block");
			} else {
				inputDiv.css("display", "none");
			}
		});


	}

	function checkboxSet() {
		var menuReservVal = $("#menuReserv").val();
		if (menuReservVal == "true") {
			$("input[id='inputMenuRev']").attr("checked", true);
		} else {
			$("input[id='inputMenuRev']").attr("checked", false);
		}
	}


	return {
		timeDefSet: timeDefSet,
		selDefSet: selDefSet,
		radioDefSet: radioDefSet,
		checkboxSet: checkboxSet
	}
})();

//버튼 설정 값에 따른 입력칸 활성화/비활성화 메서드
var operView = (function() {
	//브레이크 타임,예약금 설정 보이기
	function viewradioResult(radioName) {
		var inputID = radioName + "_input";
		var btVal = $("input[name='"+radioName+"']").val(); //namebox의 값 true/false

		//console.log("test breakTime :" + btVal);
		var inputDiv = $(".row[id='" + inputID + "']");
		//console.log("test inputID :" + inputID);
		if (btVal == "true") {
			inputDiv.css("display", "block");
		} else {
			inputDiv.css("display", "none");
		}
	}


	//휴무일 활성화/비활성화
	function viewDayoff() {
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
			//$("#dayoff_weekCnt option[value='1']").prop("selected", true);
			daySelBox.prop("disabled", false);
			//$("#dayoff_Day option[value='월']").prop("selected", true);
		}
		if (dayoffcateVal === "매주") { //매주 선택
			weekSelBox.prop("disabled", true);
			$("#dayoff_weekCnt option[value='-']").prop("selected", true);
			$("#dayoff_weekCnt").val("-");
			daySelBox.prop("disabled", false);
			//$("#dayoff_Day option[value='월']").prop("selected", true);
		}
	}

	return {
		viewradioResult: viewradioResult,
		viewDayoff: viewDayoff
	}
})();
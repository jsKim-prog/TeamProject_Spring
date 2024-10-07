/**
 * restgettable.js -> gettable.jsp
 */

$(document).ready(function() {
	var originTR = $("#tbLen").val();
	var totalTR = originTR;

	tableSet.changeVrNum(totalTR, originTR);

	console.log("test totalTR : " + totalTR);
	console.log("test originTR : " + originTR);

	//추가버튼 클릭(get:기등록+추가등록)
	$("#plusNewBtn").on("click", function() {
		var totalTR = tableSet.countTR();
		var originTR = $("#tbLen").val();
		totalTR++;
		var rowNum = tableSet.addTR(totalTR, originTR); //개별등록 버튼있는 tr 추가
		tableSet.changeVrNum(totalTR, originTR); //번호, 버튼링크 리셋
		console.log("test rowNum:" + rowNum);
		console.log("test totalTR:" + totalTR);
		console.log("test originTR:" + originTR);
	});



	//일괄수정
	$("#modtableBtn").on("click", function(e) {
		e.preventDefault();
		var regcheck = regCheck();
		if(!regcheck){return;} //전체 등록여부 체크
		var form = $("form[id='saleForm']");
		tbdataSet.makeFormList(form);
		var tables = $("#tables").val();
		tbService.modAll(tables, function(result) {
			if (result == "success") { //등록성공->url 전환
				alert("일괄변경 완료");
				location.href = '/restaurant/myrestaurant';
			} else {
				alert("등록오류. 관리자에게 문의하세요.");
			}
		});
	});

	//modal
	var tbmodal = $("#tableModal");
	var tbmodalTitle = $("#tableModalLabel");
	var tbmodalbody = tbmodal.find(".modal-body").find("ul");
	var delAllBtn = $("#tb_delallBtn");
	var delOneBtn = $("#tb_delBtn");

	//일괄삭제
	$("#deltableBtn").on("click", function(e) {
		e.preventDefault();
		var mbodyStr = "<p>정말 삭제하시겠습나까?</p>"
			+ "<p>일괄삭제 후 미등록상태로 되돌아갑니다.</p>"
		tbmodalTitle.html("일괄삭제 확인");
		tbmodalbody.html(mbodyStr);
		delOneBtn.css("display", "none");
		delAllBtn.css("display", "block");
		tbmodal.modal("show");
	});

	delAllBtn.on("click", function() {
		console.log("test:일괄삭제 실행");
		var resNum = $("#sales_resNum").val();
		tbService.delAll(resNum, function(delresult) {
			tbmodal.modal("hide");
			alert(delresult + "개의 테이블이 삭제되었습니다.");
			location.href = '/restaurant/myrestaurant';
		});
	});

	delOneBtn.on("click", function() {
		console.log("test: 단일행 삭제 실행");
		var targetnum = $("#target").val();
		var targetRow = $("tr").find(".index[value=" + targetnum + "]"); //클릭한  tr 찾기
		var targetTR = targetRow.parent().parent();
		var table = tbdataSet.makedelObj(targetTR);
		console.log("test: " + JSON.stringify(table));
		var originTR = parseInt($("#tbLen").val());
		tbService.delOne(table, function(deloneresult) {
			console.log("test: " + deloneresult);
			tbmodal.modal("hide");
			alert("삭제완료");
			tableSet.updateOriginTR(originTR-1); //등록된 tr 수 업데이트
			deleteTR(targetnum); //행삭제
		});

	});

}); //-- $(document).ready

//삭제버튼 클릭시(reg)
function deleteTR(num) {
	var targetRow = $("tr").find(".index[value=" + num + "]"); //클릭한  tr 찾기
	var targetTR = targetRow.parent().parent();
	console.log("test targetRow:" + targetRow.val());
	targetTR.remove();
	tableSet.changeVrNum();
	//console.log("test totalTR:" + totalTR);
	//console.log("test originTR:" + originTR);
};

//삭제버튼 클릭시(get) ->modal로 연결
function delTableTR(num) {
	var targetnum = num;
	var tbmodal = $("#tableModal");
	var tbmodalTitle = $("#tableModalLabel");
	var tbmodalbody = tbmodal.find(".modal-body").find("ul");
	var delAllBtn = $("#tb_delallBtn");
	//var delOneBtn = $("#tb_delBtn");
	var mbodyStr = "<p>정말 삭제하시겠습나까?</p>"
		+ "<p>삭제 한 내용은 복구가 불가능합니다.</p>"
		+ "<input type=hidden id='target' value='" + targetnum + "'>"
	tbmodalTitle.html("삭제 확인");
	tbmodalbody.html(mbodyStr);
	delAllBtn.css("display", "none");
	tbmodal.modal("show");
}


//등록버튼 클릭시(객체별 등록)
function insertTR(num) {
	var targetRow = $("tr").find(".index[value=" + num + "]"); //클릭한  tr 찾기
	var targetTR = targetRow.parent().parent();
	var table = tbdataSet.makenewObj(targetTR);
	//var totalTR = tableSet.countTR();
	var originTR = parseInt($("#tbLen").val()) ;
	console.log("test table:" + JSON.stringify(table));
	
	tbService.insertOne(table, function(newtable) {
		console.log("test newtable:" + JSON.stringify(newtable));
		if (newtable.tableNum == "" || newtable.tableNum == null) { //변경실패->alert
			alert("등록오류. 관리자에게 문의하세요.");
		} else {
			alert("등록성공");
			plusoriginTR = tableSet.updateOriginTR(originTR+1); //등록된 tr수 업데이트		
			tableSet.insertNewTR(plusoriginTR, newtable); //controller에서 받은 객체 삽입
			deleteTR(num); //기존 tr 삭제
		}
	});

}


//등록완료 여부 체크
function regCheck(){
	var nonregTR = tableSet.countRegTR(); //등록하지 않은 tr 수 체크
	if(nonregTR>0){
		alert("미등록된 테이블이 있습니다. 일괄수정은 모든 테이블이 등록된 경우에만 가능합니다.");
		return false;
	}else{
		return true;
	}
}



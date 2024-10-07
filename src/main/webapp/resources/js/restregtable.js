/**
 * restregtable.js -> regtable.jsp
 */

$(document).ready(function() {
	var totalTR=1;
	//var originTR;
	
	
	tableSet.changeIndex(totalTR);

	console.log("test totalTR : "+totalTR);
	//추가버튼 클릭(reg:신규등록)
	$("#plusBtn").on("click", function() {
		totalTR++;
		var rowNum = tableSet.addnewTR(totalTR); //추가된 행번호
		//var originTR = tableSet.countRegTR();
		tableSet.changeIndex(totalTR); //번호, 버튼링크 리셋
		console.log("test rowNum:" + rowNum);
		console.log("test totalTR:" + totalTR);
	});



	//저장하기(reg) 클릭
	$("#submitBtn").on("click", function(e) {
		e.preventDefault();
		var form = $("form[id='regiTableForm']");
		tbdataSet.makenewFormList(form);
		var tables = $("#tables").val();
		tbService.addList(tables, function(result) {
			if (result == "success") { //등록성공->url 전환
				location.href = '/restaurant/myrestaurant';
			} else {
				alert("등록오류. 관리자에게 문의하세요.");
			}
		});
	});
	

}); //-- $(document).ready

//삭제버튼 클릭시(reg)
function deleteTR(num) {
	var totalTR = tableSet.countTR();
	var targetRow = $("tr").find(".index[value=" + num + "]"); //클릭한  tr 찾기
	var targetTR = targetRow.parent().parent();
	console.log("test targetRow:" + targetRow.val());
	targetTR.remove();
	totalTR--;
	tableSet.changeIndex(totalTR);
	console.log("test totalTR:" + totalTR);
};







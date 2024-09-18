/**
 * restregtable.js -> regtable.jsp
 */

$(document).ready(function() {
	var vrNum = 1;

	//추가버튼 클릭
	$("#plusBtn").on("click", function() {
		vrNum = vrNum + 1;
		var clonetr = "<tr id='tr" + vrNum + "'><td>"
			+ "<input class='form-control' name='tableNum' type='number' value='" + vrNum + "' readonly='readonly'></td>"
			+ "<td><select class='form-control' name='tableType'>"
			+ "<option value='room'>룸타입</option>"
			+ "<option value='table'>홀타입</option>"
			+ "</select></td>"
			+ "<td><div class='input-group'>"
			+ "<input class='form-control'  type='number' name='headCount' /><span class='input-group-addon'>명</span></div></td>"
			+ "<td><input id='delBtn" + vrNum + "' class='delbtn btn btn-default btn-sm' value='삭제' onclick='deleteTR(" + vrNum + ")' style='width: 60%'>"
			+ "</td></tr>";
		$("#table-body").append(clonetr);

	});


	//submit 버튼 재설정
	$("#submitBtn").on("click", function(e) {
		e.preventDefault();
		var form = $("form[id='regiTableForm']");
		makeFormList(form);
		var tables = $("#tables").val();
		console.log("test: " + tables);
		$.ajax({
			url: '/restaurant/regtable',
			type: 'post',
			data: tables,
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				console.log(result);
				if(result=="success"){ //등록성공->resnum post로 보내기(url 전환)
					resNumsubmit();
				}else{
					alert("등록오류. 관리자에게 문의하세요.");
				}

			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});//--ajax

	});

});//-- $(document).ready

function deleteTR(vrNum) {
	var targetid = "tr" + vrNum;
	//console.log("test:"+targetid);
	var target = $("tr[id=" + targetid + "]");
	//console.log("test:"+target.attr("id"));
	$(target).remove();
};

//formdata 생성-리스트 생성
function makeFormList(form) {
	var jsonArr = [];
	var trCnt = $("#table-body tr").length; //추가된 줄개수
	var resNum = $("#sales_resNum").val(); //resNum : 공통
	if (trCnt > 0) {
		$("#table-body tr").each(function() { //행별 순회
			var table = {};
			table.resNum = resNum;
			table.tableNum = $(this).find("input[name='tableNum']").val();
			table.tableType = $(this).find("select[name='tableType']").val();
			table.headCount = $(this).find("input[name='headCount']").val();
			jsonArr.push(table);
		});
		console.log("test: " + JSON.stringify(jsonArr));
		$("#tables").val(JSON.stringify(jsonArr));

	} else {
		$("#tables").val("");
	}

}

//resNum 보내기
function resNumsubmit() {
	var resNumForm = $("form[id='sendresNum']");
	resNumForm.attr("action", "/restaurant/regtablesuccess");
	resNumForm.attr("method", "post");
	resNumForm.submit();
}
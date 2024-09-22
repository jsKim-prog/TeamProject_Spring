/**
 * restregtable.js -> regtable.jsp, gettable.jsp
 */

$(document).ready(function() {
	//가상번호 생성	
	let trCount = $("#table-body tr").length;

	console.log("test trcount:" + trCount);
	changeVrNum(trCount);


	//추가버튼 클릭(reg)
	$("#plusBtn").on("click", function() {
		trCount++;
		var clonetr = "<tr id=''><td>"
			+ "<input class='index form-control' type='number' value='' readonly='readonly'></td>"
			+ "<td><select class='form-control' name='tableType'>"
			+ "<option value='room'>룸타입</option>"
			+ "<option value='table'>홀타입</option>"
			+ "</select></td>"
			+ "<td><div class='input-group'>"
			+ "<input class='form-control'  type='number' name='headCount' value='0'/><span class='input-group-addon'>명</span></div></td>"
			+ "<td><input  class='delbtn btn btn-default btn-sm' value='삭제' onclick='' style='width: 50%'>"
			+ "</td></tr>";
		$("#table-body").append(clonetr);
		changeVrNum(trCount);

	});

	//추가버튼 클릭(get)
	$("#plusNewBtn").on("click", function() {
		trCount++;
		var clonetr = "<tr id=''><td>"
			+ "<input class='index form-control' type='number' value='' readonly='readonly'></td>"
			+ "<td><select class='form-control' name='tableType'>"
			+ "<option value='room'>룸타입</option>"
			+ "<option value='table'>홀타입</option>"
			+ "</select></td>"
			+ "<td><div class='input-group'>"
			+ "<input class='form-control'  type='number' name='headCount' value='0'/><span class='input-group-addon'>명</span></div></td>"
			+ "<td><input class='insertbtn btn btn-success btn-sm' value='등록' onclick='' style='width: 50%'><input  class='delbtn btn btn-default btn-sm' value='삭제' onclick='' style='width: 50%'>"
			+ "</td></tr>";
		$("#table-body").append(clonetr);
		changeVrNum(trCount);

	});


	//저장하기(reg) 클릭
	$("#submitBtn").on("click", function(e) {
		e.preventDefault();
		var form = $("form[id='regiTableForm']");
		makenewFormList(form);
		var tables = $("#tables").val();
		tbService.addList(tables, function(result) {
			if (result == "success") { //등록성공->url 전환
				location.href = '/restaurant/myrestaurant';
			} else {
				alert("등록오류. 관리자에게 문의하세요.");
			}
		});
	});

	//변경하기
	$("#modtableBtn").on("click", function(e) {
		e.preventDefault();
		var form = $("form[id='saleForm']");
		makeFormList(form);
		var tables = $("#tables").val();
		tbService.modAll(tables, function(result) {
			if (result == "success") { //등록성공->url 전환
				alert("일괄변경 완료");
			} else {
				alert("등록오류. 관리자에게 문의하세요.");
			}
		});
	});


}); //-- $(document).ready

//자동인덱싱
function changeVrNum(trCount) { //tr 개수만큼 index 번호를 자동으로 넣어줌
	if (trCount > 1) {
		$("#table-body tr").each(function(index, item) {
			var indexNum = index + 1;
			var typeTag = $(item).find(".tableTypeVal:hidden");
			var taglength = typeTag.length;
			$(item).attr("id", "tr" + indexNum);
			$(item).find(".index").attr("value", indexNum);
			if ($(item).find(".insertbtn").length > 0) {
				$(item).find(".insertbtn").attr("onclick", "insertTR(" + indexNum + ")");
			}
			console.log("test tag길이:" + taglength);
			if (taglength > 0) { // 등록된 거 불러올 때 -태그가 있다면				
				var regtype = $(item).find(".tableTypeVal").val();
				$(item).find("select option[value=" + regtype + "]").attr("selected", true);
				$(item).find(".delbtn").attr("onclick", "delTableTR(" + indexNum + ")");
			} else {
				$(item).find(".delbtn").attr("onclick", "deleteTR(" + indexNum + ")"); //db등록한 것과 안한것 btn 메서드명 분리
			}

		});
	} else {
		$("#table-body tr").attr("id", "tr" + trCount);
		$("#table-body tr").find(".index").attr("value", trCount);
		$("#table-body tr").find(".delbtn").attr("onclick", "deleteTR(" + trCount + ")");
	}
}


//삭제버튼 클릭시(reg)
function deleteTR(num) {
	var trCount = $("#table-body tr").length;
	var targetid = "tr" + num;
	//console.log("test:"+targetid);
	var target = $("tr[id=" + targetid + "]");
	//console.log("test:"+target.attr("id"));
	$(target).remove();
	trCount--;
	changeVrNum(trCount);
};

//삭제버튼 클릭시(get)
function delTableTR(num) {
	var targetid = "tr" + num;
	var target = $("tr[id=" + targetid + "]");
}


//등록버튼 클릭시(객체별 등록)
function insertTR(num) {
	var targetid = "tr" + num;
	var target = $("tr[id=" + targetid + "]");
	var resNum = $("#sales_resNum").val();
	var tableType = $(target).find("select[name='tableType']").val();
	var headCount = $(target).find("input[name='headCount']").val();
	var table = {
		resNum: resNum,
		tableType: tableType,
		headCount: headCount
	};

	tbService.insertOne(table, function(result) {
		if (result == "success") { //변경성공->alert
			alert("등록성공");
			showTables();
		} else {
			alert("변경오류. 관리자에게 문의하세요.");
		}
	});

}

//formdata 생성-리스트 생성(변경용)
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

//formdata 생성-리스트 생성(등록용)
function makenewFormList(form) {
	var jsonArr = [];
	var trCnt = $("#table-body tr").length; //추가된 줄개수
	var resNum = $("#sales_resNum").val(); //resNum : 공통
	if (trCnt > 0) {
		$("#table-body tr").each(function() { //행별 순회
			var table = {};
			table.resNum = resNum;
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


function showTables() {
	var resNum = $("#sales_resNum").val(); //resNum : 공통
	tbService.getTables(resNum, function(tableCnt, tables) {
		if (tableCnt != 0) {
			var str = "";
			for (var i = 0, len = tables.length; i < len; i++) {
				str += "<tr id=''><td>";
				str += "<input class='index form-control' type='number' value='' readonly='readonly'><input type='hidden' name='tableNum' value='" + tables[i].tableNum + "'></td>";
				str += "<td><select class='form-control' name='tableType'>";
				str += "<option value='room'>룸타입</option>";
				str += "<option value='table'>홀타입</option>";
				str += "</select><input type='hidden' class='tableTypeVal' name='tableType' value='" + tables[i].tableType + "'></td>";
				str += "<td><div class='input-group'>";
				str += "<input class='form-control'  type='number' name='headCount' value='" + tables[i].headCount + "'/><span class='input-group-addon'>명</span></div></td>";
				str += "<td><input  class='delbtn btn btn-default btn-sm' value='삭제' onclick='' style='width: 50%'>";
				str += "</td></tr>";
			}//--for()
			$("#table-body").html(str);
			var trCount = $("#table-body tr").length;
			changeVrNum(trCount);
		}else{
			$("#table-body").html("");
			return;
		}
		
	});
}


//db서비스 모음
var tbService = (function() {
	//전체등록(리스트)
	function addList(tables, callback, error) {
		console.log("test: " + tables);
		$.ajax({
			url: '/restaurant/regtable',
			type: 'post',
			data: tables,
			contentType: "application/json; charset=utf-8",
			success: function(insertresult, status, xhr) {
				console.log(insertresult);
				if (callback) {
					callback(insertresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});//--ajax 
	}//--addList()

	//단일등록(객체)
	function insertOne(table, callback, error) {
		console.log("test: " + table);
		$.ajax({
			url: '/restaurant/regonetable',
			type: 'post',
			data: JSON.stringify(table),
			contentType: "application/json; charset=utf-8",
			success: function(insertresult) {
				console.log(insertresult);
				if (callback) {
					callback(insertresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});
	} //--insertOne()

	//일괄수정(리스트)
	function modAll(tables, callback, error) {
		console.log("test: " + tables);
		$.ajax({
			url: '/restaurant/modtables',
			type: 'put',
			data: tables,
			contentType: "application/json; charset=utf-8",
			success: function(modresult) {
				console.log(modresult);
				if (callback) {
					callback(modresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});//--ajax 
	}//--modAll()

	//단일행 삭제
	function delOne(table, callback, error) {
		console.log("test: " + tables);
		$.ajax({
			url: '/restaurant/deltable',
			type: 'delete',
			data: tables,
			contentType: "application/json; charset=utf-8",
			success: function(delresult) {
				console.log(delresult);
				if (callback) {
					callback(delresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});//--ajax 
	}//--delOne()

	//일괄삭제
	function delAll(resNum, callback, error) {
		console.log("test: " + resNum);
		$.ajax({
			url: '/restaurant/delall/' + resNum,
			type: 'delete',
			data: tables,
			contentType: "application/json; charset=utf-8",
			success: function(delresult) {
				console.log(delresult);
				if (callback) {
					callback(delresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		});//--ajax 
	}

	//리스트 불러오기
	function getTables(resNum, callback, error) {
		console.log("test: list 가져오기 실행....");
		$.getJSON("/restaurant/gettables/" + resNum + ".json", function(data) {
			if (callback) { callback(data.tableCnt, data.tables) }
		}).fail(function(xhr, status, err) {
			if (error) { error(); }
		}); //--function(data)
	}

	//단일 테이블 불러오기
	function getoneTable(param, callback, error) {
		console.log("test: list 가져오기 실행....");
		var resNum = param.resNum;
		var tableNum = param.tableNum;
		$.getJSON("/restaurant/getonetable/" + resNum + "/" + tableNum + ".json", function(data) {
			if (callback) { callback(data) }
		}).fail(function(xhr, status, err) {
			if (error) { error(); }
		}); //--function(data)
	}

	return {
		addList: addList,
		insertOne: insertOne,
		modAll: modAll,
		delOne: delOne,
		delAll: delAll,
		getoneTable: getoneTable,
		getTables: getTables
	};

})();
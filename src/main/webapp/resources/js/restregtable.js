/**
 * restregtable.js -> regtable.jsp, gettable.jsp
 */

$(document).ready(function() {
	//가상번호 생성	
	let trCount = $("#table-body tr").length;
	let originCnt = countRegTR();

	console.log("test trcount:" + trCount);
	console.log("test originTrCnt:" + originCnt);
	setting.changeVrNum(trCount, originCnt);

	//추가버튼 클릭(reg)
	$("#plusBtn").on("click", function() {
		trCount++;
		setting.addnewTR(trCount);
	});

	//추가버튼 클릭(get)
	$("#plusNewBtn").on("click", function() {
		trCount++;
		originCnt = countRegTR();
		setting.addTR(trCount, originCnt);
		
	});


	//저장하기(reg) 클릭
	$("#submitBtn").on("click", function(e) {
		e.preventDefault();
		var form = $("form[id='regiTableForm']");
		dataSet.makenewFormList(form);
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
		dataSet.makeFormList(form);
		var tables = $("#tables").val();
		tbService.modAll(tables, function(result) {
			if (result == "success") { //등록성공->url 전환
				alert("일괄변경 완료");
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
		tbmodal.modal("show");
	});

	delAllBtn.on("click", function() {
		console.log("test:일괄삭제 실행");
		var resNum = $("#sales_resNum").val();
		tbService.delAll(resNum, function(delresult) {
			tbmodal.modal("hide");
			alert(delresult + "개의 테이블이 삭제되었습니다.");
			location.reload();
		});
	});

	delOneBtn.on("click", function() {
		console.log("test: 단일행 삭제 실행");
		var targetnum = $("#target").val();
		var table = dataSet.makedelObj(targetnum);
		console.log("test: " + table);
		tbService.delOne(table, function(deloneresult) {
			console.log("test: " + deloneresult);
			tbmodal.modal("hide");
			alert("삭제완료");
			setting.checkArea(--originTrCnt);
			deleteTR(targetnum);
		});

	});


}); //-- $(document).ready

function countRegTR(){
	var originTrCnt = $("#table-body").find("tr").not(function(){
		return $(this).attr("class") && $(this).attr("class").includes("insertbtn");
	}).length;
	
	return originTrCnt;
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
	setting.changeVrNum(trCount);
};

//삭제버튼 클릭시(get)
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
function insertTR(num, originTrCnt) {
	var table = dataSet.makenewObj(num);
	console.log("test originTrCnt:" + originTrCnt);
	tbService.insertOne(table, function(result) {
		if (result == "success") { //변경성공->alert
			alert("등록성공");
			showTables(++originTrCnt);
			deleteTR(num);
		} else {
			alert("변경오류. 관리자에게 문의하세요.");
		}
	});

}

function showTables(originTrCnt) {
	var resNum = $("#sales_resNum").val(); //resNum : 공통
	console.log("showtable실행" + originTrCnt);
	//var targetID = setting.checkArea(originTrCnt);
	//console.log("targetTRID: " + targetID)
	var target = $("#table-body").find("tr").filter(function(){
		return $(this).attr("class") && $(this).attr("class").includes("insertbtn");
	});
	//var newArea = $("#table-body");
	//var oldArea = target.nextAll();
	tbService.getTables(resNum, function(tableCnt, tables) {
		console.log("test list: " + tables);
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
			console.log("test tableCnt: " + tableCnt);
			//newArea.remove();
			$("#table-body").html(str).add(target);   //****추후수정 */
			console.log("test target: " + target);
			//console.log("test oldArea: " + oldArea);
			
			var trCount = $("#table-body tr").length;			
			setting.changeVrNum(trCount, tableCnt);
			console.log("test trCount: " + trCount);
		} else {
			$("#table-body").html("");
			return;
		}

	});
}



//화면계산, 세팅용 서비스
var setting = (function() {
	//등록된 내용 tr 영역 설정(새 리스트 덮을 공간)--새로 추가된 행 시작점 찾기 
	function checkArea(originTrCnt) {
		//var targetTR = "";
		var targetTRID = "";
		console.log("test:checkArea 실행");
		$("#table-body tr").each(function(index, item) {
			if (index === originTrCnt-1) {
				//targetTR=$(item);
				targetTRID = $(item).attr("id");
				console.log("targetID:" + targetTRID);
				return false; //break
			}
		});
		return targetTRID;

	}

	//자동인덱싱
	function changeVrNum(trCount, originTrCnt) { //tr 개수만큼 index 번호를 자동으로 넣어줌
		if (trCount > 1) {
			$("#table-body tr").each(function(index, item) {
				var indexNum = index + 1;
				var typeTag = $(item).find(".tableTypeVal:hidden");
				var taglength = typeTag.length;
				$(item).attr("id", "tr" + indexNum);
				$(item).find(".index").attr("value", indexNum);
				if ($(item).find(".insertbtn").length > 0) {
					$(item).find(".insertbtn").attr("onclick", "insertTR(" + indexNum + ", " + originTrCnt + ")");
				}
				//console.log("test tag길이:" + taglength);
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
	
	//행추가(gettable.jsp)
	function addTR(trCount, originTrCnt){
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
		setting.changeVrNum(trCount, originTrCnt);
	}
	
	//행추가(regtable.jsp)
	function addnewTR(trCount){
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
		setting.changeVrNum(trCount);
	}

	return {
		checkArea: checkArea,
		changeVrNum: changeVrNum,
		addnewTR:addnewTR,
		addTR:addTR
	};
})();



//json만들기 서비스 모음
var dataSet = (function() {
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

	//formdata 생성-단일행 등록(객체)
	function makenewObj(num) {
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
		return table;
	}

	//formdata 생성-단일행 등록(객체)
	function makedelObj(num) {
		var targetid = "tr" + num;
		var target = $("tr[id=" + targetid + "]");
		var resNum = $("#sales_resNum").val();
		var tableType = $(target).find("select[name='tableType']").val();
		var headCount = $(target).find("input[name='headCount']").val();
		var tableNum = $(target).find("input[name='tableNum']").val();
		var table = {
			resNum: resNum,
			tableType: tableType,
			headCount: headCount,
			tableNum: tableNum
		};
		return table;
	}

	return {
		makeFormList: makeFormList,
		makenewFormList: makenewFormList,
		makenewObj: makenewObj,
		makedelObj: makedelObj
	};
})();



//-----------------------ajax
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
		console.log("test: " + table);
		$.ajax({
			url: '/restaurant/deltable',
			type: 'delete',
			data: JSON.stringify(table),
			contentType: "application/json; charset=utf-8",
			success: function(deloneresult) {
				console.log(deloneresult);
				if (callback) {
					callback(deloneresult);
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
			if (callback) { callback(data.tableCnt, data.tables); }
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
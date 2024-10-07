/**
 * resttablecommon.js -> regtable.jsp, gettable.jsp(데이터생성, 전송용 메서드 모음)
 */

//화면계산, 세팅용 서비스
var tableSet = (function() {

	//자동인덱싱-인덱스 번호+버튼 메서드에 번호 넣기 - gettable.jsp용
	function changeVrNum() { //tr 개수만큼 index 번호를 자동으로 넣어줌
		var totalTR = countTR();
		if (totalTR > 1) {
			$("#table-body tr").each(function(index, item) {
				var indexNum = index + 1; //index는 0부터
				var typeTag = $(item).find(".tableTypeVal:hidden");//기등록된 tabletype
				var taglength = typeTag.length;
				//$(item).attr("id", "tr" + indexNum);
				$(item).find(".index").attr("value", indexNum);

				if ($(item).find(".insertbtn").length > 0) {
					$(item).find(".insertbtn").attr("onclick", "insertTR(" + indexNum + ")");
					$(item).find(".delbtn").attr("onclick", "deleteTR(" + indexNum + ")");
				}
				//console.log("test tag길이:" + taglength);
				if (taglength > 0) { // 등록된 거 불러올 때 -태그가 있다면				
					var regtype = $(item).find(".tableTypeVal").val();
					$(item).find("select option[value=" + regtype + "]").attr("selected", true);
					$(item).find(".delbtn").attr("onclick", "delTableTR(" + indexNum + ")");
				}

			});
		} else {
			//$("#table-body tr").attr("id", "tr" + trCount);
			$("#table-body tr").find(".index").attr("value", totalTR);
			$("#table-body tr").find(".delbtn").attr("onclick", "deleteTR('1')");
		}
	}


	//자동인덱싱-인덱스 번호+버튼 메서드에 번호 넣기 - regtable.jsp용
	function changeIndex(totalTR) { //tr 개수만큼 index 번호를 자동으로 넣어줌
		if (totalTR > 1) {
			$("#table-body tr").each(function(index, item) {
				var indexNum = index + 1; //index는 0부터
				$(item).find(".index").attr("value", indexNum);
				$(item).find(".delbtn").attr("onclick", "deleteTR(" + indexNum + ")");
			});
		} else {
			$("#table-body tr").find(".index").attr("value", totalTR);
			$("#table-body tr").find(".delbtn").attr("onclick", "deleteTR('1')");
		}
	}


	//행추가(gettable.jsp)
	function addTR(totalTR) {
		var clonetr = "<tr><td>"
			+ "<input class='index form-control' type='number' value='" + totalTR + "' readonly='readonly'></td>"
			+ "<td><select class='form-control' name='tableType'>"
			+ "<option value='room'>룸타입</option>"
			+ "<option value='table'>홀타입</option>"
			+ "</select></td>"
			+ "<td><div class='input-group'>"
			+ "<input class='form-control'  type='number' name='headCount' value='0'/><span class='input-group-addon'>명</span></div></td>"
			+ "<td><input class='insertbtn btn btn-success btn-sm' value='등록' onclick='insertTR(" + totalTR + ")' style='width: 50%'>"
			+ "<input class='delbtn btn btn-default btn-sm' value='삭제' onclick='' style='width: 50%'>"
			+ "</td></tr>";
		$("#table-body").append(clonetr);
		return totalTR;
	}

	//행추가(regtable.jsp)
	function addnewTR(totalTR) {
		var clonetr = "<tr><td>"
			+ "<input class='index form-control' type='number' value='" + totalTR + "' readonly='readonly'></td>"
			+ "<td><select class='form-control' name='tableType'>"
			+ "<option value='room'>룸타입</option>"
			+ "<option value='table'>홀타입</option>"
			+ "</select></td>"
			+ "<td><div class='input-group'>"
			+ "<input class='form-control'  type='number' name='headCount' value='0'/><span class='input-group-addon'>명</span></div></td>"
			+ "<td><input class='delbtn btn btn-default btn-sm' value='삭제' onclick='deleteTR(" + totalTR + ")' style='width: 50%'>"
			+ "</td></tr>";
		$("#table-body").append(clonetr);
		return totalTR;
	}


	//originTR-기등록된 TR 계산기
	function countRegTR() {
		var total = $("#table-body tr").length;
		var newTrCnt = $("#table-body").find("tr:has(.insertbtn)").length; //등록버튼이 없는 것 수 계산

		var originTrCnt = total - newTrCnt;
		console.log("test newTrCnt: " + newTrCnt);
		console.log("test originTrCnt= " + total + "-" + newTrCnt + "=" + originTrCnt);

		return newTrCnt;
	}

	//totalTR-전체 불러온 tr계산기
	function countTR() {
		console.log("test countTR 실행");
		var totalTR = $("#table-body tr").length; //전체 tr row 수
		//var originTR = tableSet.countRegTR(); //최초 불러온(등록된) tr row 수
		//console.log("test totalTR:" + totalTR);
		//console.log("test originTR:" + originTR);
		return totalTR;
	}

	//개별등록 행 만들기(gettable.jsp)
	function insertNewTR(originTR, newtable) {
		var tableNum = newtable.tableNum;
		var tableType = newtable.tableType;
		var headCount = newtable.headCount;
		console.log("test tableType:" + tableType);
		var clonetr = "<tr><td>"
			+ "<input class='index form-control' type='number' value='" + originTR + "' readonly='readonly'>"
			+ "<input type='hidden' name='tableNum' value='"+tableNum+"'></td>"
			+ "<td><select class='form-control' name='tableType' >"
			+ "<option value='room'>룸타입</option>"
			+ "<option value='table'>홀타입</option>"
			+ "</select>"
			+ "<input type='hidden' class='tableTypeVal' name='tableType' value='"+tableType+"'></td>"
			+ "<td><div class='input-group'>"
			+ "<input class='form-control'  type='number' name='headCount' value='"+headCount+"'/><span class='input-group-addon'>명</span></div></td>"
			+ "<td><input class='delbtn btn btn-default btn-sm' value='삭제' onclick='delTableTR(" + originTR + ")' style='width: 50%'>"
			+ "</td></tr>";
		var targetRow = $("tr").find(".index[value=" + originTR + "]"); //클릭한  tr 찾기
		var targetTR = targetRow.parent().parent();
		$(clonetr).insertBefore(targetTR);
		
		console.log("test originTR:" + originTR);
		//return originTR;
	}
	
	//originTR 조정
	function updateOriginTR(originTR){
		$("#tbLen").val(originTR); //hidden영역:controller에서 보낸 최초 tr length 담은 곳
		var neworigin = $("#tbLen").val();
		
		console.log("test update originTR:" + neworigin);
		return neworigin;
	}

	return {
		changeVrNum: changeVrNum,
		changeIndex: changeIndex,
		addnewTR: addnewTR,
		addTR: addTR,
		countRegTR: countRegTR,
		countTR: countTR, 
		insertNewTR: insertNewTR,
		updateOriginTR:updateOriginTR
	};
})();


//json만들기 서비스 모음
var tbdataSet = (function() {
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
	function makenewObj(targetTR) {
		//var targetid = "tr" + num;
		//var target = $("tr[id=" + targetid + "]");
		var resNum = $("#sales_resNum").val();
		var tableType = targetTR.find("select[name='tableType']").val();
		var headCount = targetTR.find("input[name='headCount']").val();
		var table = {
			resNum: resNum,
			tableType: tableType,
			headCount: headCount
		};
		return table;
	}
	
	//formdata 생성-단일행 삭제(객체)
	function makedelObj(targetTR) {
		var resNum = $("#sales_resNum").val();
		var tableType = targetTR.find("select[name='tableType']").val();
		var headCount = targetTR.find("input[name='headCount']").val();
		var tableNum = targetTR.find("input[name='tableNum']").val();
		var table = {
			resNum: resNum,
			tableNum: tableNum,
			tableType: tableType,
			headCount: headCount
		};
		return table;
	}


	return {
		makeFormList: makeFormList,
		makenewFormList: makenewFormList,
		makenewObj: makenewObj,
		makedelObj:makedelObj
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
			success: function(newtable) {
				console.log(newtable);
				if (callback) {
					callback(newtable);
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
			url: '/restaurant/delalltables/' + resNum,
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
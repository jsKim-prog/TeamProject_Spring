/**
 * restregmenufile.js -> regmenufile.jsp, getmenufile.jsp
 */

$(document).ready(function() {
	var resNum = $("#menu_resNum").val();
	var uploadbox = $("#fileinput");
	var imgBox = $("#preview");
	var nullBox = $("#nullBox");
	var hasImg = $(".hasimg").length; //이미지 갖고 오는지 여부

	console.log("test:" + resNum);
	console.log("test hasImg:" + hasImg);

	//get페이지용 - 클래스 여부 판단하여 이미지 박스 보이기
	if (hasImg == 0) {
		imgBox.css("display", "none");
	} else {
		menuviewService.makepreview();
		imgBox.css("display", "block");
		nullBox.css("display", "none");
		$("#imgreg").removeClass("btn btn-primary").addClass("btn btn-success");
		$("#imgreg").attr("value", "다른 이미지로 변경하기");
	}


	//reg페이지, get페이지 - 파일업로드클릭->미리보기생성, 보이기
	$("#imgreg").on("click", function() {
		$("#fileinput").trigger("click");
		//console.log("파일찾기 버튼 클릭");
		//console.log("test: imginput val:"+uploadbox.val());
	});

	uploadbox.on("change", function(e) {
		//console.log("test: imginput cangeval:"+uploadbox.val());		
		$("#preview").empty();
		let files = e.target.files;
		let fileslen = files.length;
		let fileArr = Array.prototype.slice.call(files);

		//하나만 올렸는지 개수 체크	
		if (!menuset.oneFileCheck(fileslen)) {
			menuviewService.changeBtn();
			return;
		}
		console.log("test: 파일명:" + files[0].name);
		console.log("test: 파일크기:" + files[0].size);
		//파일 확장자, 크기 확인
		var chekfile = menuset.checkFile(files[0].name, files[0].size);
		if (!chekfile) {
			menuviewService.changeBtn();
			return;
		}
		console.log("업로드 가능파일 확인완료");
		menuviewService.showPreview(fileArr);
	});



	//reg페이지 - 등록버튼 클릭
	$("#saveMenuBtn").on("click", function(e) {
		e.preventDefault();
		var form = $("#menuregForm");
		if (!valregForm(form)) {
			return;
		}
		menuset.makeMenu(); //menu에 form값 먼저 세팅
		var data = menuset.makeData(); //이미지+menu 값 넣은 formdata
		menuService.saveForm(data, function(result) {
			if (result == "success") {
				alert("메뉴저장 성공");
				self.location = '/restaurant/myrestaurant';
			} else {
				alert("저장오류. 관리자에게 문의하세요.");
			}

		});

	});

	//get페이지-수정, 삭제, 리스트 버튼 클릭
	$(".getbtn").on("click", function(e) {
		var form = $("#menumodForm");
		e.preventDefault();
		var oper = $(this).data("oper");
		console.log("test oper:" + oper);
		switch (oper) {
			case "modMenu":
				if (!valregForm(form)) {
					return;
				}
				var imgModCK = $(".hasimg").length;
				if (imgModCK == 1) { //이미지 변경이 안된 경우
					menuset.makeOnlyMenu();
					var data = $("#menu").val(); //기존이미지명+변경data
					//console.log(data);
					menuService.modData(data, function(result) {
						if (result == "success") {
							alert("메뉴수정 성공");
							self.location = '/restaurant/myrestaurant';
						} else {
							alert("수정오류. 관리자에게 문의하세요.");
						}

					});
					return;
				} else { //이미지 변경된 경우
					menuset.makeMenu();
					var data = menuset.makeData();
					menuService.modForm(data, function(result) {
						if (result == "success") {
							alert("메뉴수정 성공");
							self.location = '/restaurant/myrestaurant';
						} else {
							alert("수정오류. 관리자에게 문의하세요.");
						}
					});
					return;
				}
			case "delMenu":
				menuset.makeOnlyMenu();
				var data = $("#menu").val(); //cascade로 data만 전송

				menuService.delData(data, function(result) {
					if (result == "success") {
						alert("메뉴삭제 성공");
						self.location = '/restaurant/myrestaurant';
					} else {
						alert("삭제실패. 관리자에게 문의하세요.");
					}
				});
				return;

			case "listMenu":
				self.location='/restaurant/myrestaurant'
				return;
		}//--switch()

	});

}); //$(document).ready 

//validation
function valregForm(form) {
	var menuName = $("input[name='menuName']").val();
	var mainIngredient = $("input[name='mainIngredient']").val();
	var menuAcoount = $("textarea[name='menuAcoount']").val();
	var unitCost = $("input[name='unitCost']").val();
	var serving = $("input[name='serving']").val();
	var imgck = $("#preview  img").length; //img 태그 생겼는지 여부로 검사

	if (menuName == "" || menuName == null) {
		alert("메뉴명을 입력하세요.");
		return false;
	}
	if (mainIngredient == "" || mainIngredient == null) {
		alert("주재료를 입력하세요.");
		return false;
	}
	if (menuAcoount == "" || menuAcoount == null) {
		alert("메뉴소개를 입력하세요.");
		return false;
	}
	if (unitCost == "" || unitCost == null) {
		alert("메뉴의 가격을 입력하세요.");
		return false;
	}
	if (serving == "" || serving == null) {
		alert("메뉴의 판매단위를 입력하세요.");
		return false;
	}
	if (imgck == 0) {
		alert("메뉴 이미지를 선택하세요.");
		return false;
	}
	return true;
}//--valregForm()




//사전작업 메서드 모음-----------------------------------------
var menuset = (function() {
	//formdata 만들기(이미지+data)
	function makeMenu() {
		var resNum = $("input[name='resNum']").val();
		var menuName = $("input[name='menuName']").val();
		var mainIngredient = $("input[name='mainIngredient']").val();
		var menuAcoount = $("textarea[name='menuAcoount']").val();
		var unitCost = $("input[name='unitCost']").val();
		var serving = $("input[name='serving']").val();
		var input = $("#fileinput");
		var file = input[0].files;

		var menu = {
			resNum: resNum,
			menuName: menuName,
			menuAcoount: menuAcoount,
			mainIngredient: mainIngredient,
			serving: serving,
			unitCost: unitCost,
			menuImg: file[0].name
		};

		$("#menu").val(JSON.stringify(menu));
		console.log("test:" + $("#menu").val());

	}

	//formdata 만들기(data-savename 그대로 받아가기:이미지 수정 없음+menuNum 필수!!)
	function makeOnlyMenu() {
		var resNum = $("input[name='resNum']").val();
		var menuNum = $("#menuNum").val();
		var menuName = $("input[name='menuName']").val();
		var mainIngredient = $("input[name='mainIngredient']").val();
		var menuAcoount = $("textarea[name='menuAcoount']").val();
		var unitCost = $("input[name='unitCost']").val();
		var serving = $("input[name='serving']").val();
		var menuImg = $(".filedata").data("fname");

		var menu = {
			resNum: resNum,
			menuNum:menuNum,
			menuName: menuName,
			menuAcoount: menuAcoount,
			mainIngredient: mainIngredient,
			serving: serving,
			unitCost: unitCost,
			menuImg: menuImg
		};

		$("#menu").val(JSON.stringify(menu));
		console.log("test:" + $("#menu").val());

	}

	//ajax용 전송파일 만들기
	function makeData() {
		var data = new FormData();
		var menu = $("#menu").val();
		var inputFile = $("input[name='menuImg']");
		var file = inputFile[0].files;

		data.append("menuImg", file[0]);
		data.append("menu", new Blob([menu], { type: "application/json" }));

		console.log("test:" + file);
		console.log("test:" + menu);
		return data;
	}

	//업로드 개수 검증
	function oneFileCheck(filelen) {
		if (filelen > 1) {
			alert("하나의 파일만 등록가능 합니다.");
			return false;
		}
		if (filelen == 0) {
			alert("선택된 파일이 없습니다. 파일을 선택해 주세요.");
			return false;
		}
		return true;
	}



	//파일검증(확장자, 크기)
	function checkFile(fileName, fileSize) {
		var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif)$"); //이미지파일만 받는다.
		var maxSize = 5242880; //5MB

		if (fileSize > maxSize) {
			alert("파일 용량이 너무 큽니다.(최대 5MB)");
			return false;
		}

		if (!regex.test(fileName)) {
			alert("이미지형식의 파일만 업로드 가능합니다.(jpg, png)");
			return false;
		}
		return true;
	}


	return {
		makeMenu: makeMenu,
		makeOnlyMenu: makeOnlyMenu,
		checkFile: checkFile,
		oneFileCheck: oneFileCheck,
		makeData: makeData
	}

})();

//사진 전송 메서드 모음(db)-------------------------------- 
var menuService = (function() {

	function saveForm(data, callback, error) {
		//console.log("test:이미지포함 전송실행...");
		$.ajax({
			url: '/restaurant/regmenufile',
			type: 'post',
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: data,
			success: function(imgresult, status, xhr) {
				//console.log("test 전송확인");
				if (callback) {
					console.log("test:" + imgresult);
					callback(imgresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		}); //--ajax
	}

	//수정 전송(이미지+data)
	function modForm(data, callback, error) {
		//console.log("test:이미지포함 전송실행...");
		$.ajax({
			url: '/restaurant/modmenufile',
			type: 'put',
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			data: data,
			success: function(imgresult, status, xhr) {
				//console.log("test 전송확인");
				if (callback) {
					console.log("test:" + imgresult);
					callback(imgresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		}); //--ajax
	}

	//수정 전송(data only - 이미 json화 되어 있음)
	function modData(data, callback, error) {
		//console.log("test:이미지포함 전송실행...");
		$.ajax({
			url: '/restaurant/modmenudata',
			type: 'put',
			data: data,
			contentType: "application/json; charset=utf-8",
			success: function(imgresult, status, xhr) {
				//console.log("test 전송확인");
				if (callback) {
					console.log("test:" + imgresult);
					callback(imgresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		}); //--ajax
	}

	//삭제전송(data only - cascade로 이미지 동시삭제)
	function delData(data, callback, error) {
		//console.log("test:이미지포함 전송실행...");
		$.ajax({
			url: '/restaurant/delmenudata',
			type: 'delete',
			data: data,
			contentType: "application/json; charset=utf-8",
			success: function(imgresult, status, xhr) {
				//console.log("test 전송확인");
				if (callback) {
					console.log("test:" + imgresult);
					callback(imgresult);
				}
			},
			error: function(xhr, status, err) {
				if (error) {
					error();
				}
			}
		}); //--ajax
	}

	return {
		saveForm: saveForm,
		modForm: modForm,
		modData: modData,
		delData: delData
	};
})();

//사진처리 메서드 모음---------------------------------
var menuviewService = (function() {
	//미리보기 보이기
	function showPreview(fileArr) {
		var nullbox = $(".imagebox").find("div[id=nullBox]");
		var imgBox = $(".imagebox").find("div[id=preview]");

		fileArr.forEach(function(f) {

			var fileName = f.name;
			console.log("test prefilename" + fileName);
			var reader = new FileReader(); //파일을 읽기 위한 객체 생성
			reader.onload = function(e) { //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
				var str = '<img src="' + e.target.result + '" title="' + fileName + '" width=100% height=100% />';
				$(str).appendTo("#preview");
				//버튼 변경
				$("#imgreg").removeClass("btn btn-primary").addClass("btn btn-success");
				$("#imgreg").attr("value", "다른 이미지로 변경하기");
			}
			reader.readAsDataURL(f);
		});
		nullbox.css("display", "none");
		imgBox.css("display", "block");

	}

	//안내문, 버튼교체(미리보기창 초기화)
	function changeBtn() {
		var nullbox = $("#nullBox");
		$("#preview").empty();
		nullbox.css("display", "block");
		$("#imgreg").removeClass("btn btn-success").addClass("btn btn-primary");
		$("#imgreg").attr("value", "이미지 등록하기");
	}

	//getmenu-원본이미지 보이기
	function makepreview() {
		var resNum = $("input[name='resNum']").val();
		var folder = $(".filedata").data("path");
		var fname = $(".filedata").data("fname");
		var fileName = encodeURIComponent(resNum + "/" + folder + "/" + fname); //s_없는 원본이미지 경로
		fileName = fileName.replace(new RegExp(/\\/g), "/");

		var str = "<img alt='메뉴 이미지' src='/restaurant/displaythumb?fileName=" + fileName + "' height=237px>";
		var imgbox = $(".hasimg");
		imgbox.append(str);
		//target.attr("src", "/restaurant/displaythumb?fileName="+fileName+"");
		console.log("test folder: " + folder);
		console.log("test fname: " + fname);
		console.log("test src: " + fileName);

	}

	return {
		showPreview: showPreview,
		changeBtn: changeBtn,
		makepreview: makepreview
	}
})();



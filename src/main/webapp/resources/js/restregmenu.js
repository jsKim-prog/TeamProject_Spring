/**
 * restregmenu.js -> regmenu.jsp, getmenu.jsp
 */

$(document).ready(function() {
	
	var resNum = $("input[name='resNum']").val();
	var menuName = $("input[name='menuName']");
	var mainIngredient =$("input[name='mainIngredient']");
	var menuAcoount = $("textarea[name='menuAcoount']");
	var unitCost = $("input[name='unitCost']");
	var serving = $("input[name='serving']");

	var menuRegBtn = $("#saveMenuBtn");

	console.log("test:" + resNum);

	//등록버튼 클릭->json 생성->ajax
	menuRegBtn.on("click", function() {
		var menu = {
			resNum:resNum,
			menuName:menuName.val(),
			menuAcoount:menuAcoount.val(),  
			mainIngredient:mainIngredient.val(),
			serving:serving.val(),
			unitCost:unitCost.val(),
			menuImg:"-"
		}; //-**메뉴이미지는 추후구현
		
		console.log("test:" + menu);
		regMenu(menu, function(result){
			if(result=="success"){
				alert("메뉴등록 성공");
				self.location='/restaurant/menulist'
			}else{
				alert("등록오류. 관리자에게 문의하세요.");
			}
		});
	});
	
	$(".getbtn").on("click", function(e){
		var form = $("#menumodForm");
		e.preventDefault();
		var oper = $(this).data("oper");
		console.log(oper);
		if(oper === 'menumodify'){
			form.attr("action", "/restaurant/modmenu");
		}else if(oper==='menudelete'){
			form.attr("action", "/restaurant/delmenu");
		}else{
			form.attr("action", "/restaurant/myrestaurant").attr("method", "get");
			form.empty();
			
		}
		
		form.submit();
	});



}); //$(document).ready 

//메뉴등록 ajax
function regMenu(menu, callback, error) {
	console.log("test:메뉴등록 ajax 함수실행....");
	$.ajax({
		url: '/restaurant/newmenu',
		type: 'post',
		data: JSON.stringify(menu),
		contentType:"application/json; charset=utf-8",
		success:function(result){
			if(callback){
				callback(result);
			}
		},
		error:function(xhr, status, er){
			if(error){
				error(er)
			}
		}
	});//--ajax
} //--regMenu()

//사전작업
var setting = (function() {
	//formdata 만들기(이미지파일 아닌 부분)
	function makeForm(form) {
		var menu = new FormData();
		var resNum = $("input[name='resNum']").val();
		var menuName = $("input[name='menuName']").val();
		var mainIngredient = $("input[name='mainIngredient']").val();
		var menuAcoount = $("textarea[name='menuAcoount']").val();
		var unitCost = $("input[name='unitCost']").val();
		var serving = $("input[name='serving']").val();
		var menuImg = "-";
		//var file = menuImg[0].files;

		menu.append(resNum, resNum);
		menu.append(menuName, menuName);
		menu.append(mainIngredient, mainIngredient);
		menu.append(menuAcoount, menuAcoount);
		menu.append(unitCost, unitCost);
		menu.append(serving, serving);
		menu.append(menuImg, menuImg);
	}

	//파일검증(확장자, 크기)
	function checkFile(fileName, fileSize) {
		var regex = new RegExp("(.*?)\.(jpg|jpeg|png|gif)$"); //이미지파일만 받는다.
		var maxSize = 5242880; //5MB

		if (fileSize > maxSize) {
			alert("파일 사이즈가 너무 큽니다.(최대 5MB)");
			return false;
		}

		if (!regex.test(fileName)) {
			alert("이미지형식의 파일만 업로드 가능합니다.(jpg, png)");
			return false;
		}
	}



	return {
		makeForm: makeForm,
		checkFile: checkFile
	}

})();
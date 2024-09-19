/**
 * restregmenu.js -> regmenu.jsp
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

//등록메뉴 불러오기(리스트보이기)

/**
 * restregmenu.js -> regmenu.jsp
 */

$(document).ready(function() {
	var listArea = $(".listarea"); //리스트, 안내문 들어갈 자리 정의
	var textArea = listArea.find(".well");
	var menuArea = listArea.find(".chat");
	var resNum = $("input[name='resNum']").val();
	var modal = $(".modal"); //모달-메뉴등록용 데이터 정의(전송용)
	var menuNum = "";
	var menuName = modal.find("input[name='menuName']");
	var mainIngredient = modal.find("input[name='mainIngredient']");
	var menuAcoount = modal.find("textarea[name='menuAcoount']");
	var unitCost = modal.find("input[name='unitCost']");
	var serving = modal.find("input[name='serving']");

	var menuRegBtn = $("#menuRegBtn");

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
		regMenu(menu, function(result){
				alert("메뉴등록 성공");
				modal.find("input").val("");
				modal.modal("hide");
				
				showMenuList(resNum);
		});
	});
	
	function showMenuList(resNum){
		getMenus(resNum, function(menuCnt, menus){
			console.log("test:"+menus);
			
			if(menuCnt==0){ //리스트 없으면 메뉴영역 감추기
				textArea.css("display", "block");
				menuArea.css("display", "none");
			}
			
		/*	var str = "";
			for(var i=0, len=menus.length||0; i<len;i++){
				str+="<li class='left clearfix' data-mno='"+menus[i].menuNum+"'>";
				str+="<div><div class='header'><strong class='primary-font'>"+menus[i].menuName+"</strong>";
				str+="<strong class='pull-right text-muted'>"+menus[i].unitCost+"</strong></div>";
				str+="<p>"+menus[i].menuAcoount+"</p></div></li>";								
			}
			menuArea.html(str); */
			textArea.css("display", "none");
			menuArea.css("display", "block");
		});
	} //--showMenuList()




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
function getMenus(resNum, callback, error){
	console.log("test:메뉴리스트get ajax 함수실행....");
	$.getJSON("/restaurant/getmenus/"+resNum+".json", 
	function(data){
		console.log("받은 파일:"+data);
		if(callback){
			callback(data.menuCnt, data.menus)
			}
	}).fail(function(xhr, status, err){
		if (error) { error(); }
		});
} //--getMenus()
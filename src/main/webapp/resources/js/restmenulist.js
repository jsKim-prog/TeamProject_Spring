/**
 * restmenulist.js -> menulist.jsp
 */

$(document).ready(function(){
	
	$("#regMenuBtn").on("click", function(){
		self.location='/restaurant/regmenu';
	}); //등록페이지 연결
	
	$("#endBtn").on("click", function(){
		self.location='/restaurant/myrestaurant'
	}); //마이페이지 연결
	
	var listBtn = $("#move li");
	listBtn.on("click", function(){
		var menuNum = $(this).find("data", mno);
		console.log(menuNum);
	});
	
}); //-- $(document).ready
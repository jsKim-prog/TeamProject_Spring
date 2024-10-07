/**
 * restmenulist.js -> menulist.jsp
 */

$(document).ready(function() {

	menupreset.makesrc();

	$("#regMenuBtn").on("click", function() { //**09/28파일 등록 페이지로 연결 */
		self.location = '/restaurant/regmenufile'; 
	}); //등록페이지 연결

	$("#endBtn").on("click", function() {
		self.location = '/restaurant/myrestaurant'
	}); //마이페이지 연결

	var listBtn = $("#move li");
	listBtn.on("click", function() {
		var menuNum = $(this).find("data", mno);
		console.log(menuNum);
	});

}); //-- $(document).ready

//---------------데이터처리용 
var menupreset = (function() {
	//파일경로 만들기-> ajax로 byte[]받아오기
	function makesrc() {
		//var path = $("#path").val(); //폴더경로 D:\\upload
		$(".chat li").each(function(index, item){
			//var imgbox = $(".chat-img >img");
			var resNum = $("input[name='resNum']").val();
			var folder = $(item).find(".filedata").data("path");
			var fname = $(item).find(".filedata").data("fname");
			
			var fileName = encodeURIComponent(resNum+"/"+folder+"/s_"+fname) ;
			fileName = fileName.replace(new RegExp(/\\/g), "/");
			
			var str="<img alt='메뉴 이미지' src='/restaurant/displaythumb?fileName="+fileName+"'>";
			var imgbox =  $(item).find(".chat-img");
			imgbox.append(str);
			//target.attr("src", "/restaurant/displaythumb?fileName="+fileName+"");
			console.log("test src: " +fileName);
		});		
	}
	
	return{
		makesrc:makesrc
	};
})();


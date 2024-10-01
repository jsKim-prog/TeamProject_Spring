<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
// 일반회원 로그인 값
// 세션에서 loggedIn값을 가져와 loggedIn변수에 저장
Boolean loggedIn = (Boolean) session.getAttribute("loggedIn");
// loggedIn이 null이 아니고, true이면 String변수에 true저장, 아니면 false저장
String loggedInStr = (loggedIn != null && loggedIn) ? "true" : "false";
// 사업자회원 로그인 값
Boolean loggedIn2 = (Boolean) session.getAttribute("loggedIn2");
String loggedInStr2 = (loggedIn2 != null && loggedIn2) ? "true" : "false";
%>
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Happy Table</title>

<!-- Bootstrap Core CSS -->
<link href="/resources/sbadmin/vendor/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">

<!-- MetisMenu CSS -->
<link href="/resources/sbadmin/vendor/metisMenu/metisMenu.min.css"
	rel="stylesheet">

<!-- DataTables CSS -->
<link
	href="/resources/sbadmin/vendor/datatables-plugins/dataTables.bootstrap.css"
	rel="stylesheet">

<!-- DataTables Responsive CSS -->
<link
	href="/resources/sbadmin/vendor/datatables-responsive/dataTables.responsive.css"
	rel="stylesheet">

<!-- Custom CSS -->
<link href="/resources/sbadmin/dist/css/sb-admin-2.css" rel="stylesheet">

<!-- Custom Fonts -->
<link
	href="/resources/sbadmin/vendor/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<!-- favicon.ico 404 (Not Found) 에러로 삽입한줄 
<link rel="icon" href="data:;base64,iVBORw0KGgo=">	-->
<link rel="shortcut icon" href="#">
</head>

<body>
	<!-- Navigation -->
	<div id="wrapper">
		<nav class="navbar navbar-default navbar-static-top" role="navigation"
			style="margin-bottom: 0">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/">Happy Table</a>
			</div>
			<!-- /.navbar-header -->

			<ul class="nav navbar-top-links navbar-right">
				<li class="dropdown"><a class="dropdown-toggle" href="/"> 홈
				</a>
				<li id="mypage" class="dropdown"><a class="dropdown-toggle"
					href="/restaurant/myrestaurant?resNum=${ loginResNum }"> 내정보 </a>
				<li id="checkrev" class="dropdown"><a class="dropdown-toggle"
					href="/order/listRes?resNum=${ loginResNum }"> 예약조회 </a>
				<li class="dropdown" id="login"><a href="/restaurant/restlogin">로그인</a></li>

				<li class="dropdown" id="logout"><a href="/member/logout">로그아웃</a></li>






			</ul>

			<!-- /.navbar-top-links -->

		</nav>



		<div id="page-wrapper">
			<script
				src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<script type="text/javascript">
				$(document).ready(function() {
					// 로그인 상태를 확인하는 함수
					var loggedIn2 =
			<%=loggedInStr2%>
				; // 관리자
					console.log(loggedIn2);

					if (loggedIn2) { // 로그인 상태면
						$('#login').hide(); // 로그인 버튼 숨기기
						$('#logout').show(); // 로그아웃 버튼 보이기
					} else if (!loggedIn2) { // 로그아웃 상태면
						$('#login').show(); // 로그인 버튼 보이기
						$('#logout').hide(); // 로그아웃 버튼 숨기기
						
						$("#mypage").on("click", function(e){
							e.preventDefault();
							alert("로그인후 이용 가능합니다.");
							return;
						});
						
						$("#checkrev").on("click", function(e){
							e.preventDefault();
							alert("로그인후 이용 가능합니다.");
							return;
						});
						
					}

				});
			</script>
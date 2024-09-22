<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ include file="../includes/header2.jsp"%>

<div class="row">
	<div class="col-md-12">
		<h1 class="heading">
			<span>myRestaurant</span>
		</h1>
	</div>
	<!-- .col-md-12 close -->
</div>
<!-- .row close -->
<div class="row" style="margin-top: 50px;">
	<!-- Nav tabs -->
	<div class="col-md-8 col-md-offset-2">
		<ul class="nav nav-tabs">
			<li class="active"><a href="#myRest" data-toggle="tab">기본정보관리</a></li>
			<c:choose>
				<c:when test="${oper eq null}">
					<li id="nonOper"><a href="#myModal" data-toggle="modal">영업정보관리(미등록)</a></li>
				</c:when>
				<c:when test="${oper ne null}">
					<li><a href="#myoper" data-toggle="tab">영업정보관리</a></li>
				</c:when>
			</c:choose>
			<c:choose>
				<c:when test="${sales eq null}">
					<li id="nonSales"><a href="#myModal" data-toggle="modal">테이블운영정보관리(미등록)</a></li>
				</c:when>
				<c:when test="${sales ne null}">
					<li><a href="#mysales" data-toggle="tab">테이블운영정보관리</a></li>
				</c:when>
			</c:choose>
			<c:choose>
				<c:when test="${menus eq null}">
					<li id="nonMenu"><a href="#myModal" data-toggle="modal">메뉴관리(미등록)</a></li>
				</c:when>
				<c:when test="${menus ne null}">
					<li><a href="#mymenu" data-toggle="tab">메뉴관리</a></li>
				</c:when>
			</c:choose>
		</ul>
	</div>
	<!-- 공통 resNum 받기위한 hidden -->
	<form role="form" name="resnumForm" id="resnumForm" action=""
		method="get">
		<input type="hidden" id="resNum" name="resNum" value="${loginResNum}">
		<input type="hidden" id="common_result" value="${result}">
	</form>

	<!-- Tab panes -->
	<div class="tab-content">
		<div class="tab-pane fade in active" id="myRest">
			<div class="col-md-8 col-md-offset-2">
				<div class="panel panel-info">
					<div class="panel-heading">기본정보</div>
					<!-- .panel-heading -->
					<form role="form" id="restForm" method="post" action="/restaurant/modrest" onsubmit="return valForm(this)">
					<div class="panel-body">						
							<input type="hidden" id="rest_resNum" name="resNum" value="${loginResNum}">
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>아이디</label> <input type="text" class="form-control"
										id="resID" name="resID" value="${myrest.resID}"
										readonly="readonly" />
								</div>
								<!-- .row close -->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>패스워드</label><input type="password" class="form-control"
										id="resPW" name="resPW" value="${myrest.resPW}" required/>
								</div>
								<!-- .form-group-->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>식당명</label> <input type="text" class="form-control"
										id="resName" name="resName" value="${myrest.resName}"
										readonly="readonly" />
								</div>
								<!-- .form-group close -->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>대표 전화번호</label>
									<div class="input-group">
										<input type="number" class="form-control" id="phone_f" name="divNum"  required/><span class="input-group-addon">-</span> 
										<input type="number" class="form-control" id="phone_m" name="divNum"  required/><span class="input-group-addon">-</span> 
										<input type="number" class="form-control" id="phone_l" name="divNum"  required/> 
										<input type="hidden" name="resPhone" id="resPhone" value="${myrest.resPhone}" />
									</div>
								</div>
								<!-- .form-group close -->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>식당 주소</label><input type="text" class="form-control"
										id="resAddr" name="resAddr" value="${myrest.resAddr}" required/>
								</div>
								<!-- .form-group close -->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>식당 소개</label>
									<textarea class="form-control" rows="2" id="summary" name="summary" required>${myrest.summary}</textarea>
								</div>
								<!-- .form-group close -->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>사업자번호</label>
									<div class="input-group" id="coNum">
										<input type="number" class="form-control" id="conum_f" name="divNum" required/><span class="input-group-addon">-</span> 
										<input type="number" class="form-control" id="conum_m" name="divNum"  required/><span class="input-group-addon">-</span> 
										<input type="number" class="form-control" id="conum_l" name="divNum"  required> 
										<input type="hidden" name="co_Num" id="co_Num" value="${myrest.co_Num}" />
									</div>
								</div>
								<!-- .form-group close -->
							</div>
							<!--.row  -->
							<div class="row" style="width: 90%; margin-left: 20px;">
								<div class="form-group">
									<label>가입일</label> <input type="text" class="form-control"
										id="regDate" name="regDate" value="${myrest.regDate}"
										readonly="readonly" />
								</div>
								<!-- .form-group close -->
							</div>
							<!--.row  -->
							<input type="hidden" name="certify" value="추후구현">						
					</div>
					<!-- .panel-body -->
					<div class="panel-footer ">
						<div class="clearfix" style="text-align: right;">
							<button data-oper="modify" class="btn btn-primary" >수정하기</button>
							<button data-oper="delete" class="btn btn-default" >회원탈퇴(구현중)</button>
						</div>
						<!-- .right clearfix -->
					</div>
					<!-- .panel-footer -->
					</form>
				</div>
				<!--.panel panel-Info  -->

			</div>
			<!-- .col-md-12 -->
		</div>
		<!-- .tab-pane -->
		<!-- tab: 영업정보관리 여기부터 -->
		<div class="tab-pane fade" id="myoper">
			<c:if test="${oper ne null}">
			<jsp:include page="./getoper.jsp"></jsp:include></c:if>
		</div>
		<!--.tab-pane  -->
		<!-- tab: 테이블관리 여기부터 -->
		<div class="tab-pane fade" id="mysales">
				<c:if test="${sales ne null}">
				<jsp:include page="./gettable.jsp"></jsp:include></c:if>
		</div>
		<!--.tab-pane  -->

		<!-- tab: 메뉴관리 여기부터 -->
		<div class="tab-pane fade" id="mymenu">
			<form id="menuForm" method="post" action="restaurant/register" >
				<input type="hidden" name="resNum" id="menu_resNum" value="${loginResNum}">
				<c:if test="${menus ne null}">
				<jsp:include page="./getmenulist.jsp"></jsp:include></c:if>
			</form>
		</div>
		<!--.tab-pane  -->
	</div>
	<!-- .tab-content -->
</div>
<!-- .row -->

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">Happy Table</h4>
			</div>
			<div class="modal-body">
				<ul></ul>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" id="modalRegBtn">등록하러
					가기</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->



<script type="text/javascript" src="/resources/js/restmanage.js"></script>
<%@ include file="../includes/footer2.jsp"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ include file="../includes/header2.jsp"%>
<div class="row">
	<div class="col-md-12">
		<h1 class="heading">
			<span>My Menu</span>
		</h1>
	</div>
	<!-- .col-md-12 close -->
</div>

<div class="row" style="margin-top: 50px;">
	<input type="hidden" id="tables" name="tables">
	<div class="col-md-8 col-md-offset-2">
		<div class="panel panel-info">
			<div class="panel-heading">My Menu</div>
			<!-- .panel-heading -->
			<div class="panel-body">
				<!-- resnum 전송위한 hidden -->
				<form action="">
					<input type="hidden" id="menu_resNum" name="resNum"
						value="${loginResNum}"> <input type="hidden"
						id="menu_menuNum" name="menuNum" value="${menu.menuNum}">
					<div class="row" style="width: 90%; margin-left: 20px;">
						<div class="form-group">
							<label for="menuName">메뉴명</label><input type="text"
								class="form-control" id="menuName" name="menuName"
								value="${menu.menuName}" />
						</div>
					</div>
					<!--.row  -->
					<div class="row" style="width: 90%; margin-left: 20px;">
						<div class="form-group">
							<label for="mainIngredient">주재료</label><input type="text"
								class="form-control" id="mainIngredient" name="mainIngredient"
								value="${menu.mainIngredient}" />
						</div>
					</div>
					<!--.row  -->
					<div class="row" style="width: 90%; margin-left: 20px;">
						<div class="form-group">
							<label for="menuAcoount">메뉴소개</label>
							<textarea rows="2" class="form-control" id="menuAcoount"
								name="menuAcoount" placeholder="20자 이내의 짧은 소개문구">${menu.menuAcoount}</textarea>
						</div>
					</div>
					<!--.row  -->
					<div class="row" style="width: 90%; margin-left: 20px;">
						<div class="form-group">
							<label for="unitCost">가격</label>
							<div class="input-group">
								<input type="number" class="form-control" id="unitCost"
									name="unitCost" value="${menu.unitCost}" /> <span
									class="input-group-addon">원</span>
							</div>
						</div>
					</div>
					<!--.row  -->
					<div class="row" style="width: 90%; margin-left: 20px;">
						<div class="form-group">
							<label for="serving">판매단위(권장 섭취인원)</label>
							<div class="input-group">
								<input type="number" class="form-control" id="serving"
									name="serving" value="${menu.serving}" /> <span
									class="input-group-addon">인분</span>
							</div>
						</div>
					</div>
					<!--.row  -->
					<div class="row" style="width: 90%; margin-left: 20px;">
						<div class="form-group">
							<label for="menuImg">이미지파일(선택사항-구현중)</label> <input type="file"
								id="menuImg" name="menuImg">
						</div>
					</div>
					<!--.row  -->
				</form>
			</div>
			<!-- .panel-body -->
			<div class="panel-footer">
				<div class="clearfix" style="text-align: right;">
					<button type="button" class="btn btn-primary" id="modoperBtn">수정하기</button>
					<button type="button" class="btn btn-default" id="deloperBtn">삭제하기</button>
				</div>
				<!-- .right clearfix -->
			</div>
			<!-- .panel-footer -->
		</div>
		<!--.panel panel-Info  -->
	</div>
	<!-- .col-md-12 close -->
</div>
<!-- .row -->


<script type="text/javascript" src="/resources/js/restregmenu.js"></script>
<%@ include file="../includes/footer2.jsp"%>


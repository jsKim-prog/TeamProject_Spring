<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ include file="../includes/header2.jsp"%>
<div class="row">
	<div class="col-md-12">
		<h1 class="heading">
			<span>Restaurant 메뉴등록</span>
		</h1>
	</div>
	<!-- .col-md-12 close -->
</div>

<div class="row" style="margin-top: 50px;">
	<input type="hidden" id="tables" name="tables" >
	<div class="col-md-8 col-md-offset-2">
		<div class="panel panel-info">
			<div class="panel-heading">메뉴등록<div class="button-group pull-right">
			<button id='regMenuBtn' type="button" class="btn btn btn-success btn-xs ">메뉴추가</button>
			<button id='endBtn' type="button" class="btn btn btn-primary btn-xs ">등록완료</button></div>
			</div><!-- panel-heading -->
			<div class="panel-body">
				<div class="listarea">
				<c:choose>
				<c:when test="${menuCnt eq 0}">
				<div class="well"><p align="center">[메뉴추가] 버튼을 클릭하여 메뉴를 등록하세요.</p></div></c:when>
				<c:when test="${menuCnt ne 0}">
				<ul class="chat">
				<c:forEach items="${menus}" var="menu">				
				<li class='left clearfix'  data-mno="${menu.menuNum}"><a href="/restaurant/getmenu?menuNum=${menu.menuNum }"><div class='header'><strong class='primary-font'>${menu.menuName}</strong><strong class='pull-right text-muted'>${menu.unitCost} 원</strong></div></a>
				<p>${menu.menuAcoount}</p></li>
				</c:forEach>
				</ul></c:when>
				</c:choose>
				</div>
			</div><!-- panel-body -->
			<div class="panel-footer">
				
			</div>
		</div>
		<!--panel panel-info  -->
	</div>
	<!-- .col-md-12 close -->
</div>
<!-- .row -->

<script type="text/javascript" src="/resources/js/restmenulist.js"></script>
<%@ include file="../includes/footer2.jsp"%>


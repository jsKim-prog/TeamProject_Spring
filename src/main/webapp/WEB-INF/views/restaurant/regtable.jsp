<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ include file="../includes/header2.jsp"%>
<div class="row">
	<div class="col-md-12">
		<h1 class="heading">
			<span>Restaurant 테이블 운영정보 등록</span>
		</h1>
	</div>
	<!-- .col-md-12 close -->
</div>

<!-- .row close -->
<div class="row" style="margin-top: 50px;">
<form id="regiTableForm" method="post" action="/restaurant/regtable" >
	<input type="hidden" id="tables" name="tables" >
	<div class="col-md-8 col-md-offset-2">
		<div class="panel panel-info">
			<div class="panel-heading">테이블 운영정보</div>
			<!-- panel-heading -->
			<div class="panel-body">
			<div class="table-responsive">
				<table class="table " >
					<thead>
						<tr id=''>
							<th width="15%">#</th>
							<th width="35%">운영타입</th>
							<th width="35%">최대 수용인원</th>
							<th width="15%">삭제</th>
						</tr>
					</thead>
					<tbody id="table-body">
						<tr id="tr1">
							<td><input class="form-control" name="tableNum" type="number" value="1" readonly="readonly"></td>
							<td>
							<select class="form-control" name="tableType">
							<option value="room">룸타입</option>
							<option value="table">홀타입</option>
							</select>
							</td>
							<td><div class="input-group">
							<input class="form-control"  type="number" name="headCount" value="0"/><span class="input-group-addon">명</span></div></td>
							<td><input id="delBtn1" class="delbtn btn btn-default btn-sm"  value="삭제" onclick="deleteTR(1)" style="width: 60%">
							</td>
						</tr>
					</tbody>
				</table><!-- /.table-responsive -->
				</div><!--.table-responsive  -->
				<div class="pull-right">
				<input class="btn btn-info" id="plusBtn" data-oper="trplus"  value=" + 입력란 추가" ></div>
			</div>
			<!-- panel-body -->
			<div class="panel-footer">
				<button  class="btn btn-primary btn-lg btn-block" id="submitBtn" type="submit" >저장하기</button>
			</div>
		</div>
		<!--panel panel-info  -->
	</div>
	<!-- .col-md-12 close -->
</form>
</div>
<!-- .row -->
<!-- resnum 전송위한 hidden -->
<input type="hidden" id="sales_resNum" name="resNum" value="${loginResNum}">
<script type="text/javascript" src="/resources/js/restregtable.js"></script>
<%@ include file="../includes/footer2.jsp"%>

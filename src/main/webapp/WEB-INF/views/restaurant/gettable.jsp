<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!-- 불러오기용으로 패널정보만 표시 -->
<form id="saleForm" method="post" action="/restaurant/modtables" >
	<input type="hidden" id="tables" name="tables" >
	<input type="hidden" name="resNum" id="sales_resNum" value="${loginResNum}">	
	<div class="col-md-8 col-md-offset-2">
		<div class="panel panel-info">
			<div class="panel-heading">테이블 운영정보</div>
			<!-- panel-heading -->
			<div class="panel-body">
			<div class="table-responsive">
			<input type="hidden" id="tbLen" value="${tbLen}">
				<table class="table" >
					<thead>
						<tr>
							<th width="15%">#</th>
							<th width="35%">운영타입</th>
							<th width="35%">최대 수용인원</th>
							<th width="15%">삭제</th>
						</tr>
					</thead>
					<tbody id="table-body">
					<c:forEach items="${sales}" var="tables" varStatus="status">
						<tr>
							<td><input class="index form-control" type="number" value="" readonly="readonly">
							<input type="hidden" name="tableNum" value="${tables.tableNum}"></td>
							<td>
							<select class="form-control" name="tableType" >
							<option value="room">룸타입</option>
							<option value="table">홀타입</option>
							</select>
							<input type="hidden" class="tableTypeVal" name="tableType" value="${tables.tableType}">
							</td>
							<td><div class="input-group">
							<input class="form-control"  type="number" name="headCount" value="${tables.headCount}"/><span class="input-group-addon">명</span></div></td>
							<td><input  class="delBtn btn btn-default btn-sm"  value="삭제" onclick="delTableTR(${status.index + 1})" style="width: 50%">
							</td>
						</tr>
					</c:forEach>	
					</tbody>
				</table><!-- /.table-responsive -->
				</div><!--.table-responsive  -->
				<div class="pull-right">
				<input class="btn btn-info" id="plusNewBtn" data-oper="trplus"  value=" + 입력란 추가" ></div>
			</div>
			<!-- panel-body -->
			<div class="panel-footer">
			<div class="clearfix" style="text-align: right;">
				<input class="btn btn-primary" id="modtableBtn" value="일괄수정" style="width: 30%;">
				<input class="btn btn-default" id="deltableBtn" value="전체삭제하기" style="width: 30%;">
				</div>
			</div>
		</div>
		<!--panel panel-info  -->
	</div>
	<!-- .col-md-12 close -->
</form>

<!-- Modal -->
<div class="modal fade" id="tableModal" tabindex="-1" role="dialog"
	aria-labelledby="tableModal" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="tableModalLabel">Happy Table</h4>
			</div>
			<div class="modal-body">
				<ul></ul>
			</div>
			<div class="modal-footer">
			<button data-oper="deleteone" class="btn btn-success" id="tb_delBtn">삭제하기</button>
			<button data-oper="deleteall" class="btn btn-success" id="tb_delallBtn">삭제하기</button>
			<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<script type="text/javascript" src="/resources/js/restgettable.js"></script>
<script type="text/javascript" src="/resources/js/resttablecommon.js"></script>
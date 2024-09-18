<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!-- 불러오기용으로 패널정보만 표시 -->

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
					<c:forEach items="${sales}" var="tables">
						<tr id="tr${tables.tableNum}">
							<td><input class="form-control" name="tableNum" type="number" value="${tables.tableNum}" readonly="readonly"></td>
							<td>
							<select class="form-control" name="tableType">
							<option value="room">룸타입</option>
							<option value="table">홀타입</option>
							</select>
							</td>
							<td><div class="input-group">
							<input class="form-control"  type="number" name="headCount" value="${tables.headCount}"/><span class="input-group-addon">명</span></div></td>
							<td><input id="delBtn${tables.tableNum}" class="delbtn btn btn-default btn-sm"  value="삭제" onclick="deleteTR(${tables.tableNum})" style="width: 60%">
							</td>
						</tr>
					</c:forEach>	
					</tbody>
				</table><!-- /.table-responsive -->
				</div><!--.table-responsive  -->
				<div class="pull-right">
				<input class="btn btn-info" id="plusBtn" data-oper="trplus"  value=" + 입력란 추가" ></div>
			</div>
			<!-- panel-body -->
			<div class="panel-footer">
			<div class="clearfix" style="text-align: right;">
				<button type="button" class="btn btn-primary" id="modtableBtn">수정내용 저장</button>
				<button type="button" class="btn btn-default" id="deltableBtn">전체삭제하기</button>
				</div>
			</div>
		</div>
		<!--panel panel-info  -->
	</div>
	<!-- .col-md-12 close -->

<script type="text/javascript" src="/resources/js/restget.js"></script>

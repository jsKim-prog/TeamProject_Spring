<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ include file="../includes/header2.jsp"%>

<div class="row">
	<div class="col-md-12">
		<h1 class="heading">
			<span>Restaurant 정보등록</span>
		</h1>
	</div>
	<!-- .col-md-12 close -->
</div>
<!-- .row close -->
<div class="row" style="margin-top: 50px;">
	<form id="reginfoForm" method="post" action="/restaurant/reginfo" onsubmit="return valForm(this)">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-info">
				<div class="panel-heading">영업정보</div>
				<div class="panel-body">
					<!-- 영업시간 입력란 -->
					<input type="hidden" id="oper_resNum" name="resNum" value="${resNum}">
					<div class="row">
						<div class="col-md-4 form-group">
							<label>OPEN</label> <input type="time" class="form-control"
								id="inputTime_op" />
								<input type="hidden" id="openTime" name="openTime" value=""/>
						</div>
						<!-- col-md-3 -->

						<div class="col-md-4 form-group">
							<label>CLOSE</label> <input type="time" class="form-control"
								id="inputTime_ed"/>
								<input type="hidden" id="endTime" name="endTime"  />
						</div>
						<!-- col-md-3 -->
					</div>
					<!-- .row close -->
					<!-- breakTime 입력란 -->
					<div class="row">
						<div class="col-md-8 form-group">
						<hr>
							<label>BreakTime</label>
							<div>
								<label class="radio-inline"> <input type="radio"
									id="bt_true" name="breakTime" value="true"> 있음
								</label> <label class="radio-inline"> <input type="radio"
									id="bt_false" name="breakTime" value="false" checked> 없음
								</label>
							</div>
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->
					<div class="row" id="breaktime_input" style="display: none">
						<div class="col-md-4 ">
							<div class="input-group">
								<span class="input-group-addon">START</span> <input type="time"
									class="form-control" id="input_btst" />
									<input type="hidden" id="breakTime_start" name="breakTime_start" value=""/>
							</div>
							<!--.input-group  -->
						</div>
						<!-- col-md-8 -->

						<div class="col-md-4">
							<div class="input-group">
								<span class="input-group-addon">END</span> <input type="time"
									class="form-control" id="input_bted"/>
									<input type="hidden" id="breakTime_end" name="breakTime_end" value=""/>
							</div>
							<!--.input-group  -->
						</div>
						<!-- col-md-8 -->
					</div>

					<!-- 휴무일 -->
					<div class="row">
						<div class="col-md-8 form-group">
						<hr>
							<label for="dayoff">휴무일</label>
							<div class="input-group" id="dayoff">
								<select class="form-control" id="dayoff_cate" name="dayoff_cate"
									style="width: 40%">
									<option value="연중무휴">연중무휴</option>
									<option value="매월">매월</option>
									<option value="매주">매주</option>
								</select> <select class="form-control" id="dayoff_weekCnt"
									name="dayoff_weekCnt" style="width: 30%" disabled>
									<option value="1">첫째주</option>
									<option value="2">둘째주</option>
									<option value="3">셋째주</option>
									<option value="4">넷째주</option>
									<option value="1, 3">첫째, 셋째주</option>
									<option value="2, 4">둘째, 넷째주</option>
								</select> <select class="form-control" id="dayoff_Day" name="dayoff_Day"
									style="width: 30%" disabled>
									<option value="월">월요일</option>
									<option value="화">화요일</option>
									<option value="수">수요일</option>
									<option value="목">목요일</option>
									<option value="금">금요일</option>
									<option value="토">토요일</option>
									<option value="일">일요일</option>
								</select>
							</div>
							<!--.input-group  -->
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->
					<!-- 선불정보 입력란 -->
					<div class="row">
						<div class="col-md-8 form-group">
						<hr>
							<label for="adPayCheck">예약금 설정
								<button type="button" class="btn btn-danger btn-circle"
									id="queBtn">
									<i class="fa fa-question-circle"></i>
								</button>
							</label>
							<div id="adPayCheck">
								<label class="radio-inline"> <input type="radio"
									id="adPay_false" name="adPaySel" value="false" checked>
									설정안함
								</label> <label class="radio-inline"> <input type="radio"
									id="adPay_true" name="adPaySel" value="true"> 설정함
								</label>
							</div>
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->

					<div class="row" id="adPay_input" style="display: none;">
						<!-- 선택하면 활성화되는 란 -->
						<div class="col-md-4">
							<p>예약금 지불 최소인원 </p>
							<div class="input-group">
								<input type="text" class="form-control" name="adPayCond"><span
									class="input-group-addon">명</span>
							</div>
						</div>
						<!-- col-md-4 -->
						<div class="col-md-4">
							<p>예약금액 </p>
							<div class="input-group">
								<input type="text" class="form-control" name="adPay"><span
									class="input-group-addon">원</span>
							</div>
						</div>
						<!-- col-md-4 -->
					</div>
					<!-- .row close -->
				</div>
				<!-- panel-body -->
				<div class="panel-footer">
					<button type="submit" class="btn btn-primary btn-lg btn-block" id="reginfoBtn">저장하기</button>
				</div>
			</div>
			<!-- .panel-info-->
		</div>
		<!-- .col-md-8 close -->
	</form>
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
				<h4 class="modal-title" id="myModalLabel">예약금 설정</h4>
			</div>
			<div class="modal-body">
				<ul>
					<li>예약금을 설정하시면 단체예약시 예약금을 선결제한 회원의 예약정보만 받을 수 있습니다.</li>
					<li>예약금을 선결제할 최소 예약인원과 선결제 받을 금액을 설정할 수 있습니다.</li>
					<li>설정을 원하시면 [설정함]을, 원하지 않으면 [설정안함]을 선택하세요.</li>
				</ul>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<script type="text/javascript" src="/resources/js/restreginfo.js"></script>
<%@ include file="../includes/footer2.jsp"%>

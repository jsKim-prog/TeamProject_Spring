<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!-- 불러오기용으로 패널정보만 표시 -->
<!-- .row close -->
<div class="col-md-8 col-md-offset-2">
	<div class="panel panel-info">
		<div class="panel-heading">영업정보</div>
		<div class="panel-body">
			<!-- 영업시간 입력란 -->
			<div class="row">
				<div class="col-md-4 form-group">
					<label>OPEN</label> <input type="time" class="form-control"
						id="openTime" name="openTime" value="${oper.openTime}" />
				</div>
				<!-- col-md-3 -->

				<div class="col-md-4 form-group">
					<label>CLOSE</label> <input type="time" class="form-control"
						id="endTime" name="endTime" value="${oper.endTime}" />
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
							id="bt_true" name="bt_sel" value="true"> 있음
						</label> <label class="radio-inline"> <input type="radio"
							id="bt_false" name="bt_sel" value="false"> 없음
						</label> <input type="hidden" id="breakTime" name="breakTime"
							value="${oper.breakTime}">
					</div>
				</div>
				<!-- col-md-8 -->
			</div>
			<!-- .row close -->
			<div class="row" id="breaktime_input" style="display: none">
				<div class="col-md-4 ">
					<div class="input-group">
						<span class="input-group-addon">START</span> <input type="time"
							class="form-control" id="breakTime_start" name="breakTime_start"
							value="${oper.breakTime_start}" />
					</div>
					<!--.input-group  -->
				</div>
				<!-- col-md-8 -->

				<div class="col-md-4">
					<div class="input-group">
						<span class="input-group-addon">END</span> <input type="time"
							class="form-control" id="breakTime_end" name="breakTime_end"
							value="${oper.breakTime_end}" />
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
						<input type="hidden" id="dayoff_cate_data"
							value="${oper.dayoff_cate}"> <input type="hidden"
							id="dayoff_weekCnt_data" value="${oper.dayoff_weekCnt}">
						<input type="hidden" id="dayoff_Day_data"
							value="${oper.dayoff_Day}"> <select class="form-control"
							id="dayoff_cate" name="dayoff_cate" style="width: 40%">
							<option value="연중무휴">연중무휴</option>
							<option value="매월">매월</option>
							<option value="매주">매주</option>
						</select> <select class="form-control" id="dayoff_weekCnt"
							name="dayoff_weekCnt" style="width: 30%">
							<option value="-" disabled>-</option>
							<option value="1">첫째주</option>
							<option value="2">둘째주</option>
							<option value="3">셋째주</option>
							<option value="4">넷째주</option>
							<option value="13">첫째, 셋째주</option>
							<option value="24">둘째, 넷째주</option>

						</select> <select class="form-control" id="dayoff_Day" name="dayoff_Day"
							style="width: 30%">
							<option value="-" disabled>-</option>
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
					<label for="adPayCheck">예약금 설정 <a href="#myModal"
						class="btn btn-danger btn-circle" id="queBtn" data-toggle="modal">
							<i class="fa fa-question-circle"></i>
					</a>
					</label>
					<div id="adPayCheck">
						<label class="radio-inline"> <input type="radio"
							id="adPay_false" name="adPaySel_radio" value="false">
							설정안함
						</label> <label class="radio-inline"> <input type="radio"
							id="adPay_true" name="adPaySel_radio" value="true"> 설정함
						</label> <input type="hidden" id="adPaySel" name="adPaySel"
							value="${oper.adPaySel}">
					</div>
				</div>
				<!-- col-md-8 -->
			</div>
			<!-- .row close -->

			<div class="row" id="adPay_input" style="display: none;">
				<!-- 선택하면 활성화되는 란 -->
				<div class="col-md-4">
					<p>예약금 지불 최소인원</p>
					<div class="input-group">
						<input type="text" class="form-control" name="adPayCond"
							value="${oper.adPayCond}"><span class="input-group-addon">명</span>
					</div>
				</div>
				<!-- col-md-4 -->
				<div class="col-md-4">
					<p>예약금액</p>
					<div class="input-group">
						<input type="text" class="form-control" name="adPay"
							value="${oper.adPay}"><span class="input-group-addon">원</span>
					</div>
				</div>
				<!-- col-md-4 -->
			</div>
			<!-- .row close -->
		</div>
		<!-- panel-body -->
		<div class="panel-footer">
			<div class="clearfix" style="text-align: right;">
				<button type="button" class="btn btn-primary" id="modoperBtn">수정하기</button>
				<button type="button" class="btn btn-default" id="deloperBtn">삭제하기</button>
			</div>
			<!-- .right clearfix -->
		</div>
	</div>
	<!-- .panel-info-->
</div>
<!-- .col-md-8 close -->

<script type="text/javascript" src="/resources/js/restget.js"></script>

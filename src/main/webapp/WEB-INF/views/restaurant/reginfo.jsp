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
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-info">
				<div class="panel-heading">영업정보</div>
				<div class="panel-body">
					<!-- 영업시간 입력란 -->
					<input type="hidden" id="oper_resNum" name="resNum" value="${loginResNum}">
					<div class="row position-relative">
						<div class="col-md-6 form-group">
							<label>OPEN</label> 
							<input type="time" class="form-control" id="openTime" /> 
							<input type="hidden" name="openTime" value="">							
						</div>
						<!-- col-md-3 -->

						<div class="col-md-6 form-group">
							<label>CLOSE</label> 
							<input type="time" class="form-control" id="endTime" /> 
							<input type="hidden" name="endTime" value="">	
						</div>
						<!-- col-md-3 -->
					</div>
					<!-- .row close -->
					<!-- breakTime 입력란 -->
					<div class="row">
						<div class="col-md-12 form-group">
							<hr>
							<label>BreakTime</label>
							<div class="radioSelect">
								<label class="radio-inline"> <input class="breaktime" type="radio" id="bt_true" name="breakTime_radio" value="true"> 있음
								</label> 
								<label class="radio-inline"> <input  class="breaktime" type="radio" id="bt_false" name="breakTime_radio" value="false" >
									없음
								</label>
								<input class="breaktime" type="hidden" name="breakTime" value="false">
							</div>
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->
					<div class="row" id="breaktime_input" style="display: none">
						<div class="col-md-6 ">
							<div class="input-group">
								<span class="input-group-addon">START</span> <input type="time" class="form-control" id="breakTime_start" /> 
									<input type="hidden" name="breakTime_start" value="--:--">
							</div>
							<!--.input-group  -->
						</div>
						<!-- col-md-8 -->

						<div class="col-md-6">
							<div class="input-group">
								<span class="input-group-addon">END</span> <input type="time" class="form-control" id="breakTime_end" /> 
									<input type="hidden" name="breakTime_end" value="--:--">
							</div>
							<!--.input-group  -->
						</div>
						<!-- col-md-8 -->
					</div>

					<!-- 휴무일 -->
					<div class="row">
						<div class="col-md-12 form-group">
							<hr>
							<label for="dayoff">휴무일</label>
							<div class="input-group" id="dayoff">
								<select class="form-control" id="dayoff_cate"  style="width: 40%">
									<option value="연중무휴">연중무휴</option>
									<option value="매월">매월</option>
									<option value="매주">매주</option>
								</select> 								
								<select class="form-control" id="dayoff_weekCnt" style="width: 30%" disabled>
									<option value="-" >-</option>
									<option value="1">첫째주</option>
									<option value="2">둘째주</option>
									<option value="3">셋째주</option>
									<option value="4">넷째주</option>
									<option value="13">첫째, 셋째주</option>
									<option value="24">둘째, 넷째주</option>
								</select> <select class="form-control" id="dayoff_Day"  style="width: 30%" disabled>
									<option value="-" >-</option>
									<option value="월">월요일</option>
									<option value="화">화요일</option>
									<option value="수">수요일</option>
									<option value="목">목요일</option>
									<option value="금">금요일</option>
									<option value="토">토요일</option>
									<option value="일">일요일</option>
								</select>
								<input type="hidden" name=dayoff_cate value="연중무휴">
								<input type="hidden" name=dayoff_weekCnt value="-">
								<input type="hidden" name=dayoff_Day value="-">
							</div>
							<!--.input-group  -->
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->
					<!-- 선불정보 입력란 -->
					<div class="row">
						<div class="col-md-12 form-group">
							<hr>
							<label for="adPayCheck">예약금 설정
								<button type="button" class="btn btn-danger btn-circle" id="queBtn">
									<i class="fa fa-question-circle"></i>
								</button>
							</label>
							<div class="radioSelect">
								<label class="radio-inline"> <input type="radio" class="adPaySel" id="adPay_true" name="adPaySel_radio" value="true"> 설정함
								</label>
								<label class="radio-inline"> <input type="radio" class="adPaySel" id="adPay_false" name="adPaySel_radio" value="false" >
									설정안함
								</label> 
								<input class="breaktime" type="hidden" name="adPaySel" value="false">
							</div>
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->

					<div class="row" id="adPay_input" style="display: none;">
						<!-- 선택하면 활성화되는 란 -->
						<div class="col-md-6">
							<p>예약금 지불 최소인원</p>
							<div class="input-group">
								<input type="number" class="form-control" name="adPayCond" value="0"><span
									class="input-group-addon">명</span>
							</div>
						</div>
						<!-- col-md-4 -->
						<div class="col-md-6">
							<p>예약금액</p>
							<div class="input-group">
								<input type="number" class="form-control" name="adPay" value="0"><span
									class="input-group-addon">원</span>
							</div>
						</div>
						<!-- col-md-4 -->
					</div>
					<!-- .row close -->
					<!-- **0918 추가 : 메뉴지정예약선택란 -->
					<div class="row">
						<div class="col-md-12 form-group">
							<hr>
							<label for="inputMenuRev">메뉴 지정 예약 </label>
							<div>
								<input type="hidden" id="menuReserv" name="menuReserv"  value="false"> 
								<input type="checkbox" id="inputMenuRev" name="menuReserv"  value="true"> 메뉴예약 필요<br>
								<p>(※ 재료준비, 조리시간 필요 등의 이유로 메뉴별 예약이 필요한 경우 선택해 주세요.)</p>								
							</div>
						</div>
						<!-- col-md-8 -->
					</div>
					<!-- .row close -->
				</div>
				<!-- panel-body -->
				<div class="panel-footer">
					<button type="submit" class="btn btn-primary btn-lg btn-block"
						id="reginfoBtn">저장하기</button>
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

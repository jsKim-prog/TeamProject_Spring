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
	<div class="col-md-8 col-md-offset-2">
		<div class="panel panel-info">
			<div class="panel-heading">메뉴등록</div>
			<!-- .panel-heading -->
			<form id="menuregForm" method="post" action="/restaurant/regmenufile" enctype="multipart/form-data" onsubmit="return valregForm(this)">			
			<div class="panel-body">
				<!-- resnum 전송위한 hidden -->								
				<input type="hidden" id="menu_resNum" name="resNum" value="${loginResNum}">
				<div class="row" style="width: 90%; margin-left: 20px;" >
                    <div class="panel panel-default" >
                        <div class="panel-heading">
                            <div class="imagebox" id="imageBox" style="height: 237px; display :flex; align-items: center; justify-content: center; text-align: center;">
                                <div class="inbox" id="nullBox">
                                <h5>메뉴이미지 <br><small>최대 파일크기 : 5MB<br>한 메뉴당 한 장의 이미지만 등록가능합니다.</small></h5>
                                </div>
                                <div class="inbox" id="preview" style=" height: 100%;"></div>
                            </div>
                        </div>
                            <div class="panel-footer">
                                <input class="btn btn-primary btn-block"  id="imgreg" value="이미지 등록하기">
                                <div class="preupdiv" style="display: none;">
                                <input type="file" name="menuImg" id="fileinput"  multiple ></div>
                            </div>
                    </div>
				</div>
				<!--.row  -->
				<input type="hidden" id="menu" name="menu" >
				<div class="row" style="width: 90%; margin-left: 20px;">
					<div class="form-group">
						<label for="menuName">메뉴명</label><input type="text"
							class="form-control" id="menuName" name="menuName" required/>
					</div>
				</div>
				<!--.row  -->
				<div class="row" style="width: 90%; margin-left: 20px;">
					<div class="form-group">
						<label for="mainIngredient">주재료</label><input type="text"
							class="form-control" id="mainIngredient" name="mainIngredient" required/>
					</div>
				</div>
				<!--.row  -->
				<div class="row" style="width: 90%; margin-left: 20px;">
					<div class="form-group">
						<label for="menuAcoount">메뉴소개</label>
						<textarea rows="2" class="form-control" id="menuAcoount"
							name="menuAcoount" placeholder="20자 이내의 짧은 소개문구" required></textarea>
					</div>
				</div>
				<!--.row  -->
				<div class="row" style="width: 90%; margin-left: 20px;">
					<div class="form-group">
						<label for="unitCost">가격</label>
						<div class="input-group">
							<input type="number" class="form-control" id="unitCost"
								name="unitCost" required/> <span class="input-group-addon">원</span>
						</div>
					</div>
				</div>
				<!--.row  -->
				<div class="row" style="width: 90%; margin-left: 20px;">
					<div class="form-group">
						<label for="serving">판매단위(권장 섭취인원)</label>
						<div class="input-group">
							<input type="number" class="form-control" id="serving"
								name="serving" required/> <span class="input-group-addon">인분</span>
						</div>
					</div>
				</div>
				<!--.row  -->
			</div>
			<!-- .panel-body -->
			<div class="panel-footer">
			<button type="button" class="btn btn-primary btn-lg btn-block" id="saveMenuBtn">저장하기</button>
			</div>
			<!-- .panel-footer -->
			</form>
		</div>
		<!--.panel panel-Info  -->
	</div>
	<!-- .col-md-12 close -->
</div>
<!-- .row -->


<script type="text/javascript" src="/resources/js/restregmenufile.js"></script>
<%@ include file="../includes/footer2.jsp"%>


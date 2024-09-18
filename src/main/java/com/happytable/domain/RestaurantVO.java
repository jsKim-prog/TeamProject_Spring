package com.happytable.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class RestaurantVO {
	private String resID; //레스토랑 id
	private String resPW; //레스토랑 pw
	private String resNum; //고유번호
	private String resName; //레스토랑 이름
	private String resAddr; //주소
	private String co_Num; //사업자번호
	private String certify; //인증정보(선택사항)
	private String summary; //홍보문구	
	private Date regDate; //가입일
	private String resPhone; //전화번호
	
	private boolean checkLogin; //로그인여부
	private int cntOper; //**09/14추가 = 영업정보 등록 개수
	private int cntTable; //**09/14추가 =테이블 (리스트) 등록개수
	private int cntMenu; //**09/14추가 = 메뉴(리스트) 등록개수
	
}

package com.happytable.domain;


import lombok.Data;

@Data
public class OperationsVO {
	
	private String resNum;
	private String openTime;
	private String endTime;
	private boolean breakTime;
	private String breakTime_start;
	private String breakTime_end;
	private String dayoff_cate; //휴일정보(AlwaysOpen, Monthly, Weekly)
	private String dayoff_weekCnt; //휴일정보(매월 선택시-n주)
	private String dayoff_Day; //휴일정보(요일 : 월, 화, 수, 목, 금, 토, 일)
	
	private boolean adPaySel; //예약선불금 선택여부
	private int adPay; //(단체예약시) 예약선불금 금액
	private int adPayCond; //(단체예약시) 예약선불금 입금 최소 인원(예 : 5명 이상은 선불금 지급 필수)
	private boolean menuReserv; //메뉴지정예약여부**0918 추가
	
	private boolean reg; //등록여부
	private int regCnt; //등록개수

}

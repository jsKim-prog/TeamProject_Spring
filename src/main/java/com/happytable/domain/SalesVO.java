package com.happytable.domain;

import lombok.Data;

@Data
public class SalesVO {
	
	private String resNum;
	private String tableType;
	private int headCount;
	private int tableNum; //테이블 번호
	
	private boolean reg; //등록여부
	private int regCnt; // 등록개수


}

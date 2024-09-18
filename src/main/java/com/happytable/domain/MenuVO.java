package com.happytable.domain;

import lombok.Data;

@Data
public class MenuVO {
	
	private String resNum;
	private String menuName;
	private String menuAcoount; //설명 
	private String mainIngredient; //주재료
	private int serving; //n인분
	private int unitCost; //단가
	private String menuImg; //메뉴이미지파일명
	private int menuNum; //단일 메뉴 번호
	
	private boolean reg; //등록여부
	private int regCnt; //등록개수

}

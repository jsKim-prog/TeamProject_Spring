package com.happytable.domain;

import lombok.Data;

@Data
public class MenuImageVO { //메뉴등록 이미지 - tb_menuimg
	
	public String resNum;
	public int menuNum;
	public String originName;
	public String folderName;
	public String saveName;
	public String uuid; //중복방지용 id(날짜)
	
	//public String uploadPath; --resnum별 관리로 삭제
	
	//public Date regdate; --sysdate로 따로 받지 않음
	
}

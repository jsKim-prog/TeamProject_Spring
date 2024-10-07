package com.happytable.mapper;

import java.util.List;

public interface PortingResnumMapper { //서비스 사이트 등록완료된 resnum 관리_ tb_resnum
	
	//등록
	public int insert(String resNum);
	
	//삭제
	public int delete(String resNum);
	
	//조회(전체)
	public List<String> readAll();
	
	//조회(등록여부)
	public int countResNum(String resNum);

}

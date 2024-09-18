package com.happytable.mapper;

import com.happytable.domain.OperationsVO;

public interface OperationsMapper { //tb_oper 레스토랑 운영정보
	
	//c
	public int insert(OperationsVO oper);
	//r
	public OperationsVO read(String resNum);
	//u
	public int update(OperationsVO oper);
	//d
	public int delete(String resNum);
	
	//등록여부 확인 
	public int checkOper(String resNum);

}

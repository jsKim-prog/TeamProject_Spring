package com.happytable.service;

import com.happytable.domain.OperationsVO;

public interface OperationsService {
	
	public boolean register(OperationsVO oper); //**09/14수정-rest tb에 개수 동시등록
	
	public OperationsVO get(String resNum);
	
	public boolean modify(OperationsVO oper);
	
	public boolean remove(String resNum);
	
	public int countOper(String resNum);

}

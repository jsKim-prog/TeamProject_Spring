package com.happytable.service;

import java.util.List;

import com.happytable.domain.SalesVO;

public interface SalesService {
	//c : 매장 테이블 정보 등록
	public int register(SalesVO sales); 
	
	//r : 리스트로 매장별 전체 테이블 정보 호출
	public List<SalesVO> getList(String resNum);
	
	//r: tableNum으로 개별 테이블 정보 호출
	public SalesVO get(String resNum, int tableNum);
	
	//u: resnum의 tableNum으로 개별 수정
	public boolean modify(SalesVO sales);
	
	//d : delete one - tableNum으로 개별 테이블 삭제
	public boolean remove(String resNum, int tableNum);
	
	//d: delete all - resNum으로 전체 테이블 정보 삭제(회원탈퇴)
	public int removeAll(String resNum);
	
	//매장별 테이블 등록 개수 산출
	public int countTable(String resNum);

}

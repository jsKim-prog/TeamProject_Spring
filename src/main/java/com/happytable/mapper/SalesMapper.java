package com.happytable.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.happytable.domain.SalesVO;

public interface SalesMapper { //tb_sales : 테이블 정보
	
	//c
	public int insert(SalesVO sales);
	//r : 리스트로 호출
	public List<SalesVO> readList(String resNum);
	//r_one : tableNum으로 개별 테이블 정보 호출
	public SalesVO read(@Param("resNum") String resNum, @Param("tableNum") int tableNum) ;
	
	//u : resnum의 tableNum으로 개별 수정
	public int update(SalesVO sales);
	//d : delete one - tableNum으로 개별 테이블 삭제
	public int delete(@Param("resNum") String resNum, @Param("tableNum") int tableNum);
	
	//d : delete all - resNum으로 전체 테이블 정보 삭제(회원탈퇴)
	public int deleteAll(String resNum);
	
	//매장별 테이블 등록 개수
	public int countTable(String resNum);

}

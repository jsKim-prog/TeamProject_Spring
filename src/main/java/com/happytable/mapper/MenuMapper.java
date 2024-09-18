package com.happytable.mapper;

import java.util.List;

import com.happytable.domain.MenuVO;

public interface MenuMapper { //tb_menu
	
	//c 메뉴등록
	public int insert(MenuVO menu);
	
	//r _ one :메뉴 상세정보 
	public MenuVO read(int menuNum);
	
	//r_all : 메뉴 리스트
	public List<MenuVO> menuListByResNum(String resNum);
	
	//u : 메뉴수정
	public int update(MenuVO menu);
	
	//d_one: 단일메뉴삭제
	public int delete(int menuNum);
	
	//d_all : 매장전체 메뉴 삭제(회원탈퇴)
	public int deleteAll(String resNum);
	
	//매장별 메뉴개수
	public int countMenu(String resNum);

}

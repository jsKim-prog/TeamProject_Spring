package com.happytable.service;

import java.util.List;

import com.happytable.domain.MenuPageDTO;
import com.happytable.domain.MenuVO;

public interface MenuService {
	//c : 매장별 메뉴 등록(등록개수 받기)
	public int register(MenuVO menu);
	
	//r : 매장별 전체 메뉴리스트 호출
	public List<MenuVO> getList(String resNum);
	
	//r: menuNum으로 개별 메뉴 정보 호출(상세정보)
	public MenuVO get(int menuNum);
	
	//u: 메뉴수정
	public boolean modify(MenuVO menu);
	
	//d : delete one - 단일메뉴삭제
	public boolean remove(MenuVO menu);
	
	//d: delete all - 매장전체 메뉴 삭제(회원탈퇴)
	public int removeAll(String resNum);
	
	//매장별 등록 메뉴개수 산출
	public int countMenu(String resNum);
	
	//**09/14: Controller 이용을 위한 객체를 활용한 리스트 넘기기
	public MenuPageDTO getMenuList(String resNum);

}

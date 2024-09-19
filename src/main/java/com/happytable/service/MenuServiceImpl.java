package com.happytable.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happytable.domain.MenuPageDTO;
import com.happytable.domain.MenuVO;
import com.happytable.mapper.MenuMapper;
import com.happytable.mapper.RestaurantMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class MenuServiceImpl implements MenuService{
	@Setter(onMethod_ = @Autowired)
	private MenuMapper mappme;
	@Setter(onMethod_ = @Autowired)
	private RestaurantMapper mappRest;

	@Transactional
	@Override
	public int register(MenuVO menu) { //**09/14수정-rest tb에 개수 동시등록
		log.info("MenuServiceImpl.register() 서비스 실행.....");
		int menuCnt = mappme.insert(menu); // 1. menu_tb에 등록 
		int total = mappme.countMenu(menu.getResNum()); //2. menu_tb의 등록메뉴 개수 가져오기
		mappRest.updateMenuCnt(menu.getResNum(), total); //3. restaurnat_tb에 업데이트
		return menuCnt;
	}

	@Override
	public List<MenuVO> getList(String resNum) {
		log.info("MenuServiceImpl.getList() 서비스 실행.....");
		return mappme.menuListByResNum(resNum);
	}

	@Override
	public MenuVO get(int menuNum) {
		log.info("MenuServiceImpl.get() 서비스 실행.....");
		return mappme.read(menuNum);
	}

	@Override
	public boolean modify(MenuVO menu) {
		log.info("MenuServiceImpl.modify() 서비스 실행.....");
		return mappme.update(menu) == 1;
	}

	@Override
	public boolean remove(int menuNum) {
		log.info("MenuServiceImpl.remove() 서비스 실행.....");
		return mappme.delete(menuNum) == 1;
	}

	@Override
	public int removeAll(String resNum) {
		log.info("MenuServiceImpl.removeAll() 서비스 실행.....");
		return mappme.countMenu(resNum);
	}

	@Override
	public int countMenu(String resNum) {
		log.info("MenuServiceImpl.countMenu() 서비스 실행.....");
		return 0;
	}

	@Override
	public MenuPageDTO getMenuList(String resNum) {
		log.info("DTO 활용한 리스트 넘기기 서비스 실행.....");		
		return new MenuPageDTO(mappme.countMenu(resNum), mappme.menuListByResNum(resNum));
	}
	
	

}

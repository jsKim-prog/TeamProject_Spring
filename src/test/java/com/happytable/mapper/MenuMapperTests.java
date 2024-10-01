package com.happytable.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.happytable.domain.MenuImageVO;
import com.happytable.domain.MenuVO;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j2
public class MenuMapperTests {
	@Setter(onMethod_ = @Autowired)
	private MenuMapper mappMenu;
	@Setter(onMethod_ = @Autowired)
	private MenuImageMapper mappMImg;
	
	
	
	
	@Test //등록메뉴 전체 지우기
	public void delall() {
		int cnt = mappMenu.deleteAll("10000014kkk");
		log.info("삭제개수 : "+cnt);
		
	}
	
	@Test //메뉴등록-> menunum 받기
	public void insertTest() {
		MenuVO menu = new MenuVO();
		menu.setResNum("10000105tes");
		menu.setMenuName("메뉴테스트");
		menu.setMenuAcoount("시퀀스테스트용");
		menu.setMainIngredient("재료1, 재료2");
		menu.setServing(1);
		menu.setUnitCost(1000);
		menu.setMenuImg("-");
		
		mappMenu.insert(menu);
		int resultNum = menu.getMenuNum();
		log.info("----------메뉴등록 후 받은 menuNUM:"+resultNum);
		
		
	}
	
	@Test //메뉴 개수 확인
	public void countTest() {
		String resNum ="10000105tes";
		int rst= mappMenu.countMenu(resNum);
		log.info("------------"+resNum+" : "+ rst); //1
	}
	
	@Test //리스트 정렬 확인(이미지 동시확인)
	public void getList() {
		String resNum ="10000105tes";
		List<MenuVO> menu = mappMenu.menuListByResNum(resNum);
		List<MenuImageVO> menuImg = mappMImg.readAll(resNum);
		
		log.info("------------menu리스트:"+menu);
		log.info("------------menu이미지 리스트:"+menuImg);
		
	}

}

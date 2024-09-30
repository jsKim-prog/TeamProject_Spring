package com.happytable.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.happytable.domain.MenuVO;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j2
public class MenuServeiceTests {
	@Setter(onMethod_ = @Autowired)
	private MenuService serMenu;
	@Setter(onMethod_ = @Autowired)
	private RestaurantService serRest;
	@Setter(onMethod_ = @Autowired)
	private MenuImageService serMimg;
	
	@Test //메뉴전체 삭제(이미지 포함)
	public void delalltest() {
		MenuVO del = new MenuVO();
		String resNum = "10000105tes";
		del.setResNum(resNum);
		int result = serMenu.removeAll(resNum);
		log.info("삭제메뉴개수 : "+result); //삭제 메뉴 개수 : 10
		log.info("rst cnt : "+serRest.get(resNum)); //cntmenu 0
		log.info("이미지 cnt : "+serMimg.countImg(resNum)); //이미지 cnt : 0
	}
	
	@Test //개수확인 테슽
	public void countTest() {
		String resNum ="10000105tes";
		int rst= serMenu.countMenu(resNum);
		log.info("------------"+resNum+" : "+ rst); //1
	}


}

package com.happytable.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j2
public class PortingResNumTests {
	@Setter(onMethod_ = @Autowired)
	private PortingResnumService serPorting;
	
	@Test //전체 리스트 조회
	public void getListTest() {
		List<String> resnums = serPorting.getAll();
		log.info("----------등록된 resnum list"+resnums);
	}
	
	@Test //등록여부 조회
	public void checkRegTest() {
		String resNum = "10000105tes";
		int cnt = serPorting.checkResNum(resNum);
		log.info("=======resnum 등록여부 : "+resNum + " / "+ cnt); // =======resnum 등록여부 : 10000105tes / 1
	}
	
	@Test // 삭제
	public void deleteTest() {
		String resNum = "10000105tes";
		boolean result = serPorting.remove(resNum);
		log.info("=======resnum 삭제결과 : "+resNum + " / "+ result);  //=======resnum 삭제결과 : 10000105tes / true
	}
	
	@Test //등록
	public void portingTest() {
		String resNum = "10000105tes";
		boolean result = serPorting.porting(resNum);
		log.info("=======resnum 포팅결과 : "+resNum + " / "+ result); //=======resnum 포팅결과 : 10000105tes / true
	}
	

}

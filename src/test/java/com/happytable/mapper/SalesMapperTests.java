package com.happytable.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.happytable.domain.RestaurantVO;
import com.happytable.domain.SalesVO;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j2
public class SalesMapperTests {
	
	@Setter(onMethod_ = @Autowired)
	private SalesMapper mapper;
	
	
	//restaurantMapper
	@Test
	public void testMapper(){
		log.info(mapper);
	}
	
	@Test
	public void testInsert() {
		SalesVO vo = new SalesVO();
		vo.setResNum("10000002tes");
		vo.setTableNum(2);
		vo.setTableType("room");
		vo.setHeadCount(20);
		
		int result = mapper.insert(vo);
		log.info("등록결과 : "+result); //등록결과 : 1
	}
	
	@Test
	public void testReadList() {
		List<SalesVO> list = mapper.readList("10000002tes");
		list.forEach(lists->log.info(lists));
		
	}
	
	@Test
	public void testUpdate() {
		SalesVO vo =  mapper.read("10000002tes", 1);
		vo.setHeadCount(20);
		int rst = mapper.update(vo);
		log.info("수정결과:" + rst); //수정결과:1
		}
	
	
	
	@Test
	public void testDelete() {
		log.info("삭제개수 : "+mapper.delete("10000002tes", 2)); //삭제개수 : 1
	}
	
	@Test
	public void testDeleteAll() {
		log.info("삭제개수 : "+mapper.deleteAll("10000014kkk"));  //삭제개수 : 2
	}
	
	@Test
	public void testCount() {
		log.info("등록 테이블 개수 : "+ mapper.countTable("10000002tes")); //등록 테이블 개수 : 2
	}
	
	

}

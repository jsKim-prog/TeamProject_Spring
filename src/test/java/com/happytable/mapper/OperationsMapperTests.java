package com.happytable.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.happytable.domain.OperationsVO;
import com.happytable.domain.RestaurantVO;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j2
public class OperationsMapperTests {
	
	@Setter(onMethod_ = @Autowired)
	private OperationsMapper mapper;
	
	
	//restaurantMapper
	@Test
	public void testMapper(){
		log.info(mapper);
	}
	
	@Test
	public void testInsert() { //**추후 테스트
		OperationsVO vo = new OperationsVO();
		vo.setOpenTime("10:00");
		vo.setEndTime("18:00");
		vo.setBreakTime(false);
		vo.setDayoff_cate("M"); 
		vo.setDayoff_weekCnt("1, 3");
		vo.setDayoff_Day("일");
		vo.setAdPay(100000);
		vo.setAdPayCond(10);
		vo.setResNum("10000002tes");
		vo.setBreakTime_start("-");
		vo.setBreakTime_end("-");
		
		
		int result = mapper.insert(vo);
		log.info("등록결과 : "+result);  //등록결과 : 1
	}
	
	@Test
	public void testRead() {
		log.info("레스토랑 운영정보-10000002tes"+mapper.read("10000002tes"));
		//레스토랑 운영정보-10000002tesOperationsVO(resNum=10000002tes, openTime=2024-01-01 10:00:00, endTime=2024-01-01 18:00:00, breakTime=false, breakTime_start=-, breakTime_end=-, dayoff_cate=M, dayoff_weekCnt=1, 3, dayoff_Day=일, adPay=100000, adPayCond=10)
	}
	
	@Test
	public void testUpdate() {
		OperationsVO vo = mapper.read("10000014kkk");
		vo.setDayoff_weekCnt("13");
		
		int rst = mapper.update(vo);
		log.info("수정결과:" + rst); //수정결과:1
		}
	
	
	
	@Test
	public void testDelete() {
		log.info("삭제개수 : "+mapper.delete("10000002tes")); //삭제개수 : 1
	}
	
	

}

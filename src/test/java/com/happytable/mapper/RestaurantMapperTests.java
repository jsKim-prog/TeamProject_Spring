package com.happytable.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.happytable.domain.RestaurantVO;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j2
public class RestaurantMapperTests {
	
	@Setter(onMethod_ = @Autowired)
	private RestaurantMapper mapper;
	@Setter(onMethod_ = @Autowired)
	private OperationsMapper mappOper;
	@Setter(onMethod_ = @Autowired)
	private SalesMapper mappSal;
	@Setter(onMethod_ = @Autowired)
	private MenuMapper mappMenu;
	
	//restaurantMapper
	@Test
	public void testMapper(){
		log.info(mapper);
	}
	
	@Test
	public void testInsert() {
		RestaurantVO vo = new RestaurantVO();
		vo.setResID("test2");
		vo.setResPW("test2");
		vo.setResName("테스트식당2");
		vo.setResAddr("서울 금천구 가산동");
		vo.setCo_Num("111-11-11111");
		vo.setSummary("테스트용식당, 맛은 보장 못하는데요.");
		vo.setCertify("");
		vo.setResPhone("010-123-4567");
		
		int result = mapper.insert(vo);
		log.info("등록결과 : "+result); //등록결과 : 1
	}
	
	@Test
	public void testReadnum() {
		log.info("레스토랑 정보-10000002tes"+mapper.readByResnum("10000002tes"));
		//RestaurantVO(resID=test, resPW=test, resNum=10000002tes, resName=테스트식당, resAddr=수원시 권선구, co_Num=111-11-11111, certify=위생인증, summary=테스트용식당, 맛은 보장 못하는데요., regDate=2024-09-02)
	}
	
	@Test
	public void testUpdate() {
		RestaurantVO vo = mapper.readByResnum("10000046aaa");
		vo.setResName("테스트식당 수정");
		int rst = mapper.update(vo);
		log.info("수정결과:" + rst); //수정결과:1
		}
	
	@Test
	public void testList() {
		log.info("=============");
		List<RestaurantVO> list = mapper.resList();
		list.forEach(rests->log.info(rests));
	}
	
	@Test
	public void testDelete() {
		log.info("삭제개수 : "+mapper.delete("10000003tes")); //삭제개수 : 1
	}
	
	@Test
	public void testlogin() {
		 String resNum = mapper.login("test", "test");
		log.info("로그인 매장 : " + resNum);//로그인 매장 : 10000002tes
	}
	
	@Test //계정존재유무
	public void testLoginCheck() {
		int rst = mapper.loginChech("kkk", "kkk");
		log.info("계정개수 : "+rst); //계정개수 : 1
	}
	
	@Test //등록정보 cnt 업데이트
	public void testCnt() {
		List<RestaurantVO> rests = mapper.resList();
		for(RestaurantVO temp:rests) {
			String resnum = temp.getResNum();
			int cntOper = mappOper.checkOper(resnum);
			int cntTable = mappSal.countTable(resnum);
			int cntMenu = mappMenu.countMenu(resnum);
			mapper.updateOperCnt(resnum, cntOper);
			mapper.updateTableCnt(resnum, cntTable);
			mapper.updateMenuCnt(resnum, cntMenu);
			log.info("업데이트 결과:"+temp);
		}
	}

}

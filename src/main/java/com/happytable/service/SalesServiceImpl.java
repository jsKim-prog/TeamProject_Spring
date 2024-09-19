package com.happytable.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happytable.domain.SalesVO;
import com.happytable.mapper.RestaurantMapper;
import com.happytable.mapper.SalesMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class SalesServiceImpl implements SalesService{
	@Setter(onMethod_ = @Autowired)
	private SalesMapper mappsal;
	@Setter(onMethod_ = @Autowired)
	private RestaurantMapper mappRest;
	

	@Transactional
	@Override
	public int register(SalesVO sales) {  //**09/14수정-rest tb에 개수 동시등록
		log.info("SalesServiceImpl.register() 서비스 실행.....");
		int tableCnt = mappsal.insert(sales); //1. sales_tb에 등록
		int total = mappsal.countTable(sales.getResNum()); //2. sales_tb 등록개수 불러오기
		mappRest.updateTableCnt(sales.getResNum(), total); //3. restaurant_tb 등록개수 업데이트
		return tableCnt ;
	}

	@Override
	public List<SalesVO> getList(String resNum) {
		log.info("SalesServiceImpl.getList() 서비스 실행.....");
		return mappsal.readList(resNum);
	}

	@Override
	public SalesVO get(String resNum, int tableNum) {
		log.info("SalesServiceImpl.get() 서비스 실행.....");
		return mappsal.read(resNum, tableNum);
	}

	@Override
	public boolean modify(SalesVO sales) {
		log.info("SalesServiceImpl.modify() 서비스 실행.....");
		return mappsal.update(sales) == 1;
	}

	@Override
	public boolean remove(String resNum, int tableNum) {
		log.info("SalesServiceImpl.remove() 서비스 실행.....");
		return mappsal.deleteAll(resNum) == 1;
	}

	@Override
	public int removeAll(String resNum) {
		log.info("SalesServiceImpl.removeAll() 서비스 실행.....");
		return mappsal.deleteAll(resNum);
	}

	@Override
	public int countTable(String resNum) {
		log.info("SalesServiceImpl.countTable() 서비스 실행.....");
		return mappsal.countTable(resNum);
	}
	
	

}

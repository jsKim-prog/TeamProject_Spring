package com.happytable.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happytable.domain.SalesPageDTO;
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

	@Transactional //리스트-개수변경 고려하여 rest-tb 연동
	@Override
	public int modify(SalesVO sales) {
		log.info("SalesServiceImpl.modify() 서비스 실행.....");
		int modCnt = mappsal.update(sales); //변경개수 1
		int total = mappsal.countTable(sales.getResNum()); //총 등록개수(리스트 길이)
		mappRest.updateTableCnt(sales.getResNum(), total); //restaurant_tb 등록개수 업데이트
		return modCnt ;
	}

	@Transactional
	@Override
	public int remove(String resNum, int tableNum) {
		log.info("등록테이블 단일삭제 서비스 실행.....");
		int delCnt = mappsal.delete(resNum, tableNum) ; //삭제개수 1
		int total = mappsal.countTable(resNum);
		mappRest.updateTableCnt(resNum, total);
		return delCnt;
	}

	@Transactional
	@Override
	public int removeAll(String resNum) {
		log.info("등록테이블 전체 삭제 서비스 실행.....");
		int delCnt = mappsal.deleteAll(resNum);
		mappRest.updateTableCnt(resNum, 0);
		return delCnt;
	}

	@Override
	public int countTable(String resNum) {
		log.info("SalesServiceImpl.countTable() 서비스 실행.....");
		return mappsal.countTable(resNum);
	}

	@Override
	public SalesPageDTO getTableList(String resNum) {
		// DTO로 리스트 한번에 넘기기
		return new SalesPageDTO(mappsal.countTable(resNum), mappsal.readList(resNum));
	}
	
	

}

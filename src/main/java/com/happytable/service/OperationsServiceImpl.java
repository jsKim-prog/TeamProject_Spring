package com.happytable.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happytable.domain.OperationsVO;
import com.happytable.mapper.OperationsMapper;
import com.happytable.mapper.RestaurantMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class OperationsServiceImpl implements OperationsService{
	@Setter(onMethod_ = @Autowired)
	private OperationsMapper mappop;
	@Setter(onMethod_ = @Autowired)
	private RestaurantMapper mappRest;

	@Transactional //**09/14수정-rest tb에 개수 동시등록
	@Override
	public boolean register(OperationsVO oper) {
		log.info("Operations 등록 서비스 실행.....");
		int operCnt = mappop.insert(oper);
		int regCnt = mappRest.updateOperCnt(oper.getResNum(), operCnt);
		return operCnt == regCnt;
	}

	@Override
	public OperationsVO get(String resNum) {
		log.info("OperationsServiceImpl.get() 서비스 실행.....");
		return mappop.read(resNum);
	}

	@Override
	public boolean modify(OperationsVO oper) {
		log.info("OperationsServiceImpl.modify() 서비스 실행.....");
		return mappop.update(oper) ==1;
	}

	@Transactional
	@Override
	public boolean remove(String resNum) {
		log.info("OperationsServiceImpl.remove() 서비스 실행.....");
		int cnt = mappop.delete(resNum);
		int cntOper=mappop.checkOper(resNum);
		int restCnt = mappRest.updateOperCnt(resNum, cntOper);
		return cnt==restCnt;
	}

	@Override
	public int countOper(String resNum) {
		log.info("operation 등록여부 확인.....");
		return mappop.checkOper(resNum);
	}
	
	

}

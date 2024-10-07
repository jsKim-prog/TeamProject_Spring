package com.happytable.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happytable.mapper.PortingResnumMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class PortingResnumServiceImpl implements PortingResnumService{
	@Setter(onMethod_ = @Autowired)
	private PortingResnumMapper mappResnum;
	
	@Override
	public boolean porting(String resNum) {
		log.info("서비스 사이트 resNum 포팅 서비스 실행......");
		return mappResnum.insert(resNum)==1;
	}

	@Override
	public boolean remove(String resNum) {
		log.info("서비스 사이트 resNum 등록해제 서비스 실행......");
		return mappResnum.delete(resNum)==1;
	}

	@Override
	public List<String> getAll() {
		log.info("서비스 사이트 resNum 조회 서비스 실행......");
		return mappResnum.readAll();
	}

	@Override
	public int checkResNum(String resNum) {
		log.info("서비스 사이트 resNum 등록여부 서비스 실행......");
		return mappResnum.countResNum(resNum) ;
	}

}

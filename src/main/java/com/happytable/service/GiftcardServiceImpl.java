package com.happytable.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happytable.domain.GiftCardVO;
import com.happytable.mapper.GiftcardMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;
@Service
@Log4j2
public class GiftcardServiceImpl implements GiftcardService{
	@Setter(onMethod_ = @Autowired)
	private GiftcardMapper mappGift;

	@Override
	public int create(GiftCardVO gift) {
		log.info("상품권 등록 서비스 실행......");
		return mappGift.insert(gift);
	}

	@Override
	public GiftCardVO get(GiftCardVO gift) {
		log.info("상품권 건별 확인 서비스 실행......");
		return mappGift.read(gift);
	}

	@Override
	public List<GiftCardVO> getAll(String resNum) {
		log.info("가게별 상품권 리스트 서비스 실행......");
		return mappGift.readAll(resNum);
	}

	@Override
	public int modify(GiftCardVO gift) {
		log.info("상품권 수정 서비스 실행......");
		return mappGift.update(gift);
	}

	@Override
	public int remove(GiftCardVO gift) {
		log.info("상품권 단건삭제 서비스 실행......");
		return mappGift.delete(gift);
	}

	@Override
	public int removeAll(String resNum) {
		log.info("가게별 상품권 전체삭제 서비스 실행......");
		return mappGift.deleteAll(resNum);
	}

	@Override
	public int countGiftcard(String resNum) {
		log.info("상품권 개수 확인 서비스 실행......");
		return mappGift.countGiftcard(resNum);
	}

}

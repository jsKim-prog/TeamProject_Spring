package com.happytable.mapper;

import java.util.List;

import com.happytable.domain.GiftCardVO;

public interface GiftcardMapper {
	
	//등록
	public int insert(GiftCardVO gift);
	
	//정보읽기(건당)
	public GiftCardVO read(GiftCardVO gift);
	
	//정보읽기(가게전체)
	public List<GiftCardVO> readAll(String resNum);
	
	//수정
	public int update(GiftCardVO gift);
	
	//삭제(건당)
	public int delete(GiftCardVO gift);
	
	//삭제(가게전체)
	public int deleteAll(String resNum);
	
	//가게별 상품권 개수 확인
	public int countGiftcard(String resNum);

}

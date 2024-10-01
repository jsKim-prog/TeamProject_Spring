package com.happytable.service;

import java.util.List;

import com.happytable.domain.GiftCardVO;

public interface GiftcardService {
	// 등록
	public int create(GiftCardVO gift);

	// 정보읽기(건당)
	public GiftCardVO get(GiftCardVO gift);

	// 정보읽기(가게전체)
	public List<GiftCardVO> getAll(String resNum);

	// 수정
	public int modify(GiftCardVO gift);

	// 삭제(건당)
	public int remove(GiftCardVO gift);

	// 삭제(가게전체)
	public int removeAll(String resNum);

	// 가게별 상품권 개수 확인
	public int countGiftcard(String resNum);

}

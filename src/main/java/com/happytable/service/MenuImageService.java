package com.happytable.service;

import java.util.List;

import com.happytable.domain.MenuImageVO;

public interface MenuImageService {
	// 등록
	public int upload(MenuImageVO menuimg);

	// 변경
	public int modify(MenuImageVO menuimg);

	// 삭제(단일메뉴 이미지)
	public int remove(int menuNum);

	// 일괄삭제(가게 메뉴 전체 삭제)
	public int removeAll(String resNum);

	// 가져오기(다운로드)
	public MenuImageVO getImage(int menuNum);
	
	//가게별 이미지 리스트
	public List<MenuImageVO> getImgList(String resNum);

	// 메뉴이미지 개수cnt(resnum별)
	public int countImg(String resNum);

}

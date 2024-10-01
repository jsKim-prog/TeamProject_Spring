package com.happytable.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happytable.domain.MenuImageVO;
import com.happytable.mapper.MenuImageMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class MenuImageServiceImpl implements MenuImageService{
	@Setter(onMethod_ = @Autowired)
	private MenuImageMapper mappImg;

	@Override
	public int upload(MenuImageVO menuimg) {
		log.info("메뉴이미지 등록 서비스 실행.....");
		return mappImg.insert(menuimg);
	}

	@Override
	public int modify(MenuImageVO menuimg) {
		log.info("메뉴이미지 수정 서비스 실행.....");
		return mappImg.update(menuimg);
	}

	@Override
	public int remove(int menuNum) {
		log.info("메뉴이미지 삭제 서비스 실행.....");
		return mappImg.delete(menuNum);
	}

	@Override
	public int removeAll(String resNum) {
		log.info("전체 메뉴이미지 일괄삭제 서비스 실행.....");
		return mappImg.deleteAll(resNum);
	}

	@Override
	public MenuImageVO getImage(int menuNum) {
		log.info("메뉴이미지 가져오기 서비스 실행.....");
		return mappImg.read(menuNum);
	}

	@Override
	public int countImg(String resNum) {
		log.info("가게별 이미지 개수 확인 서비스 실행.....");
		return mappImg.countImg(resNum);
	}

	@Override
	public List<MenuImageVO> getImgList(String resNum) {
		log.info("가게별 메뉴이미지 리스트 가져오기 서비스 실행.....");
		return mappImg.readAll(resNum);
	}

}

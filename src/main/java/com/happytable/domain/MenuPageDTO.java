package com.happytable.domain;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
public class MenuPageDTO { //Menu List 전달을 위한 DTO **09/27(이미지 포함)
	@Setter(onMethod_ = @Autowired)
	private int menuCnt; //개수
	@Setter(onMethod_ = @Autowired)
	private List<MenuVO> menus;
	@Setter(onMethod_ = @Autowired)
	private List<MenuImageVO> mImgs; //메뉴이미지 리스트

	

}

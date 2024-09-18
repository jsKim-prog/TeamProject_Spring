package com.happytable.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class MenuPageDTO { //Menu List 전달을 위한 DTO **09/14
	
	private int menuCnt; //개수
	private List<MenuVO> menus;
	

}

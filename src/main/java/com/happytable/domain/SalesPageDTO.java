package com.happytable.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class SalesPageDTO { //table List 전달을 위한 DTO **09/22
	
	private int tableCnt; //개수
	private List<SalesVO> tables;
	

}

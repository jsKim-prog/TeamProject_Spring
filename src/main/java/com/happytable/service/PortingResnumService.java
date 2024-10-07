package com.happytable.service;

import java.util.List;

public interface PortingResnumService {

	// 등록
	public boolean porting(String resNum);

	// 삭제
	public boolean remove(String resNum);

	// 조회(전체)
	public List<String> getAll();

	// 조회(등록여부)
	public int checkResNum(String resNum);

}

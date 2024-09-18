package com.happytable.service;

import java.util.List;

import com.happytable.domain.RestaurantVO;

public interface RestaurantService {
	// c : 기업회원가입
	public int register(RestaurantVO rest);

	// r: 기업회원정보 확인 -
	public RestaurantVO get(String resNum);

	// u: 기업정보 변경
	public boolean modify(RestaurantVO rest);

	// d: 기업정보 삭제(회원탈퇴)
	public boolean remove(String resNum);

	// R_all : 모든 레스토랑 리스트
	public List<RestaurantVO> getList();

	// 중복확인 : 아이디 개수 확인
	public int idcheck(String resID);

	// 로그인
	public String login(String resID, String resPW);

	// 로그인(계정확인용) : id+pw ->count(resNum)=> int(**09/07 추가)
	public int loginChech(String resID, String resPW);

	// 마이페이지 불러오기
	//public MyResturantDTO getAllInfo(String resNum);
	
	//**09/14추가 : 등록정보 개수 업데이트 -- 각 하위 등록정보service에서 업데이트 될 때 추가


}

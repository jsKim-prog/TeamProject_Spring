package com.happytable.controller;

import java.util.List;

import org.apache.logging.log4j.core.pattern.AbstractStyleNameConverter.Red;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.happytable.domain.MenuPageDTO;
import com.happytable.domain.MenuVO;
import com.happytable.domain.OperationsVO;
import com.happytable.domain.RestaurantVO;
import com.happytable.domain.SalesVO;
import com.happytable.service.MenuService;
import com.happytable.service.OperationsService;
import com.happytable.service.RestaurantService;
import com.happytable.service.SalesService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@SessionAttributes({"loginMember2", "loginResNum", "loggedIn2"}) //session객체에 저장될 내용(사용자 이름, 고유번호, 로그인 여부)
@RequestMapping("/restaurant/*")
@AllArgsConstructor
public class RestaurantPageController { // jsp 페이지를 불러오는 경로만 정의

	private RestaurantService serviceRest;
	private OperationsService serviceOper;
	private SalesService serviceSal;
	private MenuService serviceMenu;

	@GetMapping("/register") // http://localhost/restaurant/register
	public void register() {
		log.info("RestaurantController.register() 실행-------");
	}



	// 회원가입
	@PostMapping("/register")
	public String regiRest(RestaurantVO rest, RedirectAttributes rttr) {
		String result = "";
		int cnt = serviceRest.register(rest);
		if (cnt == 1) { // 등록성공
			result = "redirect:/restaurant/restlogin";
			rttr.addFlashAttribute("result", "success");
		} else {
			result = "redirect:/restaurant/register";
			rttr.addFlashAttribute("result", "error");
		}

		return result;
	}

	@PostMapping("/login") // member 페이지 로그인용
	public String login(RestaurantVO rest, Model model, RedirectAttributes rttr) { //req : 세션생성용
		String id = rest.getResID();
		String pw = rest.getResPW();
		log.info("test : 로그인 계정:" + id + "/" + pw);
		int check = serviceRest.loginChech(id, pw);

		if (check == 1) { // 계정있으면
			String resNum = serviceRest.login(id, pw);
			RestaurantVO restVO = serviceRest.get(resNum);
			//session생성
			model.addAttribute("loginMember2", restVO.getResName());//레스토랑 이름
			model.addAttribute("loginResNum", restVO.getResNum()); //resNum
			model.addAttribute("loggedIn2", true);

			return "redirect:/";
		} else {
			rttr.addFlashAttribute("loginError", "아이디와 비밀번호를 확인하세요");
			return "redirect:/member/login";
		}

	}
	
	@GetMapping("/restlogin") // http://localhost/restaurant/restlogin
	public void restlogin() {
		log.info("RestaurantController.restlogin() 실행-------");
	}

	// 레스토랑 로그인->마이페이지
	@GetMapping("/myrestaurant")
	public void getPostAllInfo(@ModelAttribute("loginResNum") String resNum, Model model) {
		log.info("test : 받은 resnum:" + resNum);
		RestaurantVO myrest = serviceRest.get(resNum); //**09/19수정->restaurant_tb의 cnt 결과만으로 판단하도록
		int opercnt = myrest.getCntOper();
		int salCnt = myrest.getCntTable();
		int menuCnt = myrest.getCntMenu();
		OperationsVO oper = null;
		List<MenuVO> menus = null;
		List<SalesVO> tables = null;

		if (opercnt != 0) {
			oper = serviceOper.get(resNum);
		}
		if (menuCnt != 0) {
			menus = serviceMenu.getList(resNum);
		}
		if (salCnt != 0) {
			tables = serviceSal.getList(resNum);
		}

		model.addAttribute("myrest", myrest);
		model.addAttribute("oper", oper);
		model.addAttribute("sales", tables);
		model.addAttribute("menus", menus);

	}

	// reginfo-영업정보 페이지
	@GetMapping("/reginfo") // http://localhost/restaurant/reginfo
	public void reginfo() {
		log.info("영업정보등록 get() 실행-------");
	}

	@PostMapping("/reginfo") 
	public String regPostInfo(OperationsVO oper, Model model) {
		log.info("영업정보등록 post() 실행-------");
		log.info("받은 영업정보 test: " + oper);
		boolean result = serviceOper.register(oper); //**09/14수정-rest tb에 개수 동시등록
		String resNum = oper.getResNum();
		if (result) {
			oper.setReg(true);
			model.addAttribute("oper", serviceOper.get(resNum));
			return "redirect:/restaurant/myrestaurant";
		} else {
			oper.setReg(false);
			return "redirect:/restaurant/reginfo";
		}
	}

	// 테이블 정보 등록 페이지
	@GetMapping("/regtable") // http://localhost/restaurant/reginfo
	public void regtable() {
		log.info("테이블정보등록 get() 실행-------" );

	}

	@PostMapping("/regtablesuccess")
	public String regPostTable(SalesVO table, Model model) {
		log.info("테이블정보등록 post() 실행-------");
		log.info("받은 테이블정보 resNum: " + table.getResNum()); //test : 받은 resnum:resNum=10000014kkk
		String resNum = table.getResNum();
		model.addAttribute("sales", serviceSal.getList(resNum));
		return "redirect:/restaurant/myrestaurant";
	}

	// 메뉴등록 페이지(리스트)
	@GetMapping("/menulist") // http://localhost/restaurant/menulist
	public void menulist(@ModelAttribute("loginResNum")String resNum, Model model) {
		log.info("메뉴리스트 get() 실행-------"+resNum);
		MenuPageDTO menus = serviceMenu.getMenuList(resNum);
		model.addAttribute("menus", menus.getMenus());
		model.addAttribute("menuCnt", menus.getMenuCnt());
	}
	
	//메뉴등록 페이지(단일메뉴) -페이지 연결
	@GetMapping("/regmenu")
	public void regmenu() {
		log.info("단일메뉴등록 get() 실행-------");
	}
	
	//메뉴 상세보기 페이지
	@GetMapping("/getmenu")
	public void getmenu(@RequestParam("menuNum") int menuNum, Model model) {
		log.info("메뉴상세보기 실행-------"+menuNum);
		model.addAttribute("menu", serviceMenu.get(menuNum));
	}
	
	//U-기본정보 변경
	@PostMapping("/modrest")
	public String modRest(RestaurantVO rest, RedirectAttributes rttr) {
		log.info("기본정보변경 실행-------"+rest.getResNum());
		boolean result = serviceRest.modify(rest);
		if(result) { //변경성공시
			rttr.addFlashAttribute("result", "success");
			
		}else {
			rttr.addFlashAttribute("result", "변경오류. 관리자에게 문의하세요.");
		}
		log.info("rttr:"+rttr.getFlashAttributes()); //rttr:{result=success}
		
		return "redirect:/restaurant/myrestaurant";
	}
	
	//U-영업정보 변경
	@PostMapping("/modoper")
	public String modOper(OperationsVO oper, RedirectAttributes rttr) {
		log.info("영업정보변경 실행-------"+oper.getResNum());
		boolean result = serviceOper.modify(oper);
		if(result) { //변경성공시
			rttr.addFlashAttribute("result", "success");
			
		}else {
			rttr.addFlashAttribute("result", "변경오류. 관리자에게 문의하세요.");
		}
		log.info("rttr:"+rttr.getFlashAttributes()); //rttr:{result=success}
		
		return "redirect:/restaurant/myrestaurant";
	}
	
	//D-영업정보 삭제
	@PostMapping("/deloper")
	public String delOper(OperationsVO oper, RedirectAttributes rttr) {
		log.info("영업정보삭제 실행-------"+oper.getResNum());
		boolean result = serviceOper.remove(oper.getResNum());
		if(result) { //삭제성공시
			rttr.addFlashAttribute("result", "delsuccess");
			
		}else {
			rttr.addFlashAttribute("result", "삭제오류. 관리자에게 문의하세요.");
		}
		log.info("rttr:"+rttr.getFlashAttributes()); //rttr:{result=success}
		
		return "redirect:/restaurant/myrestaurant";
	}
	
}

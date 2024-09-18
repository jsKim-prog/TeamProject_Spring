package com.happytable.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.happytable.domain.MenuPageDTO;
import com.happytable.domain.MenuVO;
import com.happytable.domain.RestaurantVO;
import com.happytable.domain.SalesVO;
import com.happytable.service.MenuService;
import com.happytable.service.OperationsService;
import com.happytable.service.RestaurantService;
import com.happytable.service.SalesService;

import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/restaurant/*")
public class RestaurantController {
	@Setter(onMethod_ = @Autowired)
	private RestaurantService serviceRest;
	@Setter(onMethod_ = @Autowired)
	private OperationsService serviceOper;
	@Setter(onMethod_ = @Autowired)
	private SalesService serviceSal;
	@Setter(onMethod_ = @Autowired)
	private MenuService serviceMenu;
	

	
	//아이디 중복체크
	@PostMapping(value ="/idcheck", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> idCheck(@RequestBody RestaurantVO vo) {
		String resID = vo.getResID();
		log.info("받은 아이디 : "+resID);
		int cnt = serviceRest.idcheck(resID);
		log.info("중복검색결과 : "+cnt);		

		return (cnt>0)? new ResponseEntity<>("false", HttpStatus.OK) :
			new ResponseEntity<>("true", HttpStatus.OK);
		//0개보다 많이 검색되면 false 값을 result로 보낸다.
	}
	
	
	//로그인(restlogin)
	@PostMapping(value = "/restlogin", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> restAjaxLogin(@RequestBody RestaurantVO rest){
		String id = rest.getResID();
		String pw = rest.getResPW();
		log.info("test : 로그인 계정:" + id + "/" + pw);
		int check = serviceRest.loginChech(id, pw);
		
		if(check == 1) {
			String resNum = serviceRest.login(rest.getResID(), rest.getResPW());
			log.info("resNum" + resNum);
			return new ResponseEntity<>(resNum, HttpStatus.OK);
		}else {
			String resNum = "NotFoundAccount";
			log.info("resNumTest" + resNum);
			return new ResponseEntity<>(resNum, HttpStatus.OK); //204(콘텐츠 없음)
		}		
	}
	
	//테이블 등록정보받기(리스트형 json)
	//**@Controller는 List를 지원하지 않지만, RestController는 List 지원!!!!
	@PostMapping(value = "/regtable", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> tableAjaxReg(@RequestBody List<SalesVO> tables){
		log.info("test 받은 list data:"+ tables);
		int regCnt = 0; //등록개수
		int total = tables.size(); //리스트 전체 개수
		
		for(SalesVO table:tables) { //리스트 순회하면서 객체별로 db등록
			int result = serviceSal.register(table);
			if(result>0) {
				regCnt += result;
				table.setReg(true);
			}else {
				table.setReg(false);
			}			
		} //--for()
		log.info("---등록개수 : "+ regCnt+" / 리스트개수:"+ total);
		if(total==regCnt) { //전체 등록성공
			return new ResponseEntity<>("success", HttpStatus.OK);
			
		}else {
			return new ResponseEntity<>("error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	//메뉴등록
	@PostMapping(value = "/newmenu", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> menuAjaxReg(@RequestBody MenuVO menu){
		log.info("test 받은 menu:"+menu);
		int cnt = serviceMenu.register(menu);
		log.info("test menu 등록결과:"+cnt);
		
		return (cnt==1)? new ResponseEntity<>("success", HttpStatus.OK):
			new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	//메뉴리스트 가져오기
	@GetMapping(value = "/getmenus/{resNum}", consumes = "application/json", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<MenuPageDTO> getMenuList(@PathVariable("resNum") String resNum){
		log.info("test 메뉴리스트 가져오기 받은 resNum:"+resNum);
		return new ResponseEntity<>(serviceMenu.getMenuList(resNum), HttpStatus.OK);
	}
	

	
	

}

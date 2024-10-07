---------------------------- tb_restaurant : 레스토랑 테이블
create table tb_restaurant(
resID varchar2(10) constraint res_id_uq unique,
resPW varchar2(20) not null,
resNum varchar2(20) constraint res_num_pk primary key,
resName varchar2(50) not null,
resAddr varchar2(200) not null,
co_Num varchar2(20) not null,
certify varchar2(20),
summary varchar2(200) not null,
regDate Date default sysdate,
resPhone varchar2(20),
cntOper number default 0,
cntTable number default 0,
cntMenu number default 0
);

select * from tb_restaurant;
--table 변경/추가내역 : create 부분에 수정내용 반영해둠
alter table tb_restaurant add regDate Date default sysdate; 
alter table tb_restaurant modify co_Num varchar2(20); 
alter table tb_restaurant add resPhone varchar2(20);
alter table tb_restaurant add cntOper number default 0 ;
alter table tb_restaurant add cntTable number default 0 ;
alter table tb_restaurant add cntMenu number default 0 ;

--resNum sequence
CREATE SEQUENCE res_seq
START WITH 10000000
INCREMENT BY 1
MINVALUE 10000000
MAXVALUE 99999999
CYCLE
CACHE 20;
drop sequence res_seq;

----------------------------tb_oper : 레스토랑 운영정보 
create table tb_oper(
resNum varchar2(20) primary key,
openTime varchar2(10) not null,
endTime varchar2(10) not null,
breakTime number(2),
breakTime_start varchar2(10),
breakTime_end varchar2(10),
dayoff_cate varchar2(20),
dayoff_weekCnt varchar2(10),
dayoff_Day varchar2(10),
adPaySel number(2),
adPay number(10),
adPayCond number(3),
menuReserv varchar2(10) default 'false'
);

select * from tb_oper;
drop table tb_oper; 
truncate table tb_oper;
-- fk 추가
alter table tb_oper add constraint op_num_fk foreign key (resNum) references tb_restaurant (resNum);
alter table tb_oper modify dayoff_weekCnt varchar2(10); --create 반영됨
alter table tb_oper modify dayoff_cate varchar2(20);
insert into tb_oper (resNum, openTime, endTime, adPaySel, adPay, adPayCond, breakTime, breakTime_start, breakTime_end, dayoff_cate, dayoff_weekCnt, dayoff_Day) values ('10000002tes', '09:00', '22:00', 1, 100000, 10, 1, '15:30', '17:30', '매주', '-', '수') ;

--**0918 column 추가 --create 에 반영됨
alter table tb_oper add menuReserv varchar2(10) default 'false';
--alter table tb_oper drop column menuReserv;

---------------------------- tb_sales : 레스토랑 테이블 정보
create table tb_sales(
resNum varchar2(20),
tableNum number,
tableType varchar2(10),
headCount number(3)
);

select * from tb_sales;
drop table tb_sales;
-- fk 추가
alter table tb_sales add constraint sal_num_fk foreign key (resNum) references tb_restaurant (resNum);
--alter table tb_sales modify tableNum number;
--index 생성(pk가 없어 검색속도 향상위한 인덱스)
create index sales_index on tb_sales (resNum);

--tableNum  sequence **09/21
CREATE SEQUENCE seq_table
START WITH 10000000
INCREMENT BY 1
MINVALUE 10000000
MAXVALUE 99999999
CYCLE
CACHE 20;
drop sequence seq_table;


truncate table tb_sales; --더미데이터 초기화용

---------------------------- tb_menu : 레스토랑 메뉴 정보
create table tb_menu(
menuNum number(10) primary key,
resNum varchar2(20),
menuName varchar2(100),
menuAcoount varchar2(200), 
mainIngredient varchar2(200),
serving number(2),
unitCost number(10),
menuImg varchar2(200)
);

select * from tb_menu;
drop table tb_menu;
-- fk 추가
alter table tb_menu add constraint menu_num_fk foreign key (resNum) references tb_restaurant (resNum);
create sequence seq_menu;
alter table tb_menu modify menuAcoount varchar2(50);
alter table tb_menu modify menuName varchar2(100); --9/18 입력내용길이조절
alter table tb_menu modify menuAcoount varchar2(200);
alter table tb_menu modify mainIngredient varchar2(200);
alter table tb_menu modify menuImg varchar2(200);

---------------------------- tb_menuimage : 메뉴이미지 관리테이블
create table tb_menuimg(
resNum varchar2(20),
menuNum number(10) primary key,
originName varchar2(100),
saveName varchar2(100), 
folderName varchar2(100),
uuid varchar2(100),
regdate Date default sysdate,
moddate Date default sysdate
);

alter table tb_menuimg add constraint meimg_resnum_fk foreign key (resNum) references tb_restaurant (resNum);
alter table tb_menuimg add constraint meimg_menunum_fk foreign key (menuNum) references tb_menu (menuNum) on delete cascade;
alter table tb_menuimg add moddate Date default sysdate;

select * from tb_menuimg;

---drop table tb_menuimg;

---------------------------- tb_giftcard : 상품권 관리 테이블(**09/30)
create table tb_giftcard(
resNum varchar2(20),
gcNum varchar2(100) primary key,
gcName varchar2(100),
gcType varchar2(50),
amount number,
service varchar2(100),
needMile number
);

select * from tb_giftcard;
alter table tb_giftcard add constraint gc_resnum_fk foreign key (resNum) references tb_restaurant (resNum);
alter table tb_giftcard rename column dicount to amount;

--gcNum  sequence **09/30
CREATE SEQUENCE seq_gcNum
START WITH 10000000
INCREMENT BY 1
MINVALUE 10000000
MAXVALUE 99999999
CYCLE
CACHE 20;

--drop sequence seq_gcNum;


select * from tb_resnum;

------------------------------------------test용 영역
SELECT DECODE(TO_CHAR(TRUNC(sysdate,'MONTH'), 'D'), 7,TRUNC(sysdate,'MONTH'), NEXT_DAY(TRUNC(sysdate,'MONTH'),'토')) FIRST, DECODE(TO_CHAR(TRUNC(sysdate,'MONTH'), 'D'), 7,TRUNC(sysdate,'MONTH')+14, NEXT_DAY(TRUNC(sysdate,'MONTH'),'토')+14) THIRD FROM dual;
--매월 1, 3주 토요일 휴무계산-가로 출력

select to_date('18:00', 'HH24:MI') from dual;


update tb_restaurant set resPW = 'aaaa', resName = 'aaaa', resAddr = '경기도 어딘가', co_Num = '111-000-0000', 
certify = '추후구현', summary = 'aaaaaa' resPhone = '010-111-1111' where resNum = '10000046aaa' ;


package com.happytable.domain;

import lombok.Data;

@Data
public class GiftCardVO { //tb_giftcard
	private String resNum;
	private String gcNum;
	private String gcName;
	private String gcType;
	private int amount;
	private String service;
	private int needMile;

}

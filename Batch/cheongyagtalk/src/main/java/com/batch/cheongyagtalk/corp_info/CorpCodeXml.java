package com.batch.cheongyagtalk.corp_info;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.Setter;

@XmlRootElement(name = "list")
@XmlAccessorType(XmlAccessType.FIELD)
@Getter
@Setter
public class CorpCodeXml {

    @XmlElement(name = "corp_code")
    private String corpCode;

    @XmlElement(name = "corp_name")
    private String corpName;

    @XmlElement(name = "corp_eng_name")
    private String corpEngName;

    @XmlElement(name = "stock_code")
    private String stockCode;

    @XmlElement(name = "modify_date")
    private String modifyDate;
}

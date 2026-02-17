package com.sns.platform.cheongyagtalk_api.subscription.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SubsMonthlyScheduleDto {
    private String corpCode;
    private String corpName;
    private String subsStartDt; // YYYYMMDD
    private String subsEndDt;   // YYYYMMDD
}

package com.sns.platform.cheongyagtalk_api.subscription.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "subs_info")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubsInfo {

    @Id
    @Column(name = "corp_code", length = 8, nullable = false)
    private String corpCode;

    @Column(name = "corp_name", length = 200)
    private String corpName;

    @Column(name = "mkt_dcd", length = 1, nullable = false)
    private String mktDcd;

    @Column(name = "subs_start_dt", length = 8, nullable = false)
    private String subsStartDt; // YYYYMMDD

    @Column(name = "subs_end_dt", length = 8, nullable = false)
    private String subsEndDt;   // YYYYMMDD

    @Column(name = "paym_dt", length = 8)
    private String paymDt;      // YYYYMMDD

    @Column(name = "allot_dt", length = 8)
    private String allotDt;     // YYYYMMDD

    @Column(name = "iss_qnt")
    private Long issQnt;

    @Column(name = "iss_amt")
    private Long issAmt;

    @Column(name = "fv")
    private Long fv;

    @Column(name = "iss_prc")
    private Long issPrc;
}

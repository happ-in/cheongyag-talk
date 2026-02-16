package com.sns.platform.cheongyagtalk_api.subscription.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class SubsCorpId implements Serializable {

    @Column(name = "corp_code", length = 8, nullable = false)
    private String corpCode;

    @Column(name = "stock_corp_name", length = 200, nullable = false)
    private String stockCorpName;
}

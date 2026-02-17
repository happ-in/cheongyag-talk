package com.sns.platform.cheongyagtalk_api.subscription.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subs_corp")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubsCorp {

    @EmbeddedId
    private SubsCorpId id;

    // FK: corp_code -> subs_info.corp_code
    // 복합키 안에 corp_code가 있으므로 MapsId로 연결
    @MapsId("corpCode")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "corp_code", nullable = false, insertable = false, updatable = false)
    private SubsInfo subsInfo;

    @Column(name = "hold_qnt")
    private Long holdQnt;

    @Column(name = "hold_amt")
    private Long holdAmt;
}

package com.sns.platform.cheongyagtalk_api.subscription.repository;

import com.sns.platform.cheongyagtalk_api.subscription.dto.SubsMonthlyScheduleDto;
import com.sns.platform.cheongyagtalk_api.subscription.entity.SubsInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubsInfoRepository extends JpaRepository<SubsInfo, String> {
    @Query(value = "select si.corpCode, si.corpName, si.subsStartDt, si.subsEndDt" +
            "  from SubsInfo si" +
            " where si.subsStartDt between :start_dt AND :end_dt" +
            "    or si.subsEndDt between  :start_dt AND :end_dt")
    List<SubsMonthlyScheduleDto> findBySubsStartDtAndSubsEndDt(@Param("start_dt") String startDt, @Param("end_dt") String endDt);
}

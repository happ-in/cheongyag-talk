package com.sns.platform.cheongyagtalk_api.subscription.service;

import com.sns.platform.cheongyagtalk_api.subscription.dto.SubsMonthlyScheduleDto;
import com.sns.platform.cheongyagtalk_api.subscription.repository.SubsInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubsInfoService {
    private final SubsInfoRepository subsInfoRepository;

    public SubsInfoService(SubsInfoRepository subsInfoRepository) {
        this.subsInfoRepository = subsInfoRepository;
    }

    public List<SubsMonthlyScheduleDto> getSubsMonthlySchedule(String startDt, String endDt) {
        return subsInfoRepository.findBySubsStartDtAndSubsEndDt(startDt, endDt);
    }
}

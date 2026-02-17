package com.sns.platform.cheongyagtalk_api.subscription.controller;

import com.sns.platform.cheongyagtalk_api.subscription.service.SubsInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SubsInfoController {

    private final SubsInfoService subsInfoService;

    @GetMapping("/subs/montly")
    public ResponseEntity<?> getSubsMontlySchedule(@RequestParam String startDt, @RequestParam String endDt) {
        return ResponseEntity.ok(subsInfoService.getSubsMonthlySchedule(startDt, endDt));
    }
}

package com.sns.platform.cheongyagtalk_api.subscription.repository;

import com.sns.platform.cheongyagtalk_api.subscription.entity.SubsCorp;
import com.sns.platform.cheongyagtalk_api.subscription.entity.SubsCorpId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubsCorpRepository extends JpaRepository<SubsCorp, SubsCorpId> {
}

package com.batch.cheongyagtalk;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class CheongyagtalkApplication {

	public static void main(String[] args) {
		SpringApplication.run(CheongyagtalkApplication.class, args);
	}

}

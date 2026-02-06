package com.batch.cheongyagtalk.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient () {
        return WebClient.builder().build();
    }

//    @Bean
//    public WebClient.Builder webClientBuilder() {
//
//        HttpClient httpClient = HttpClient.create()
//                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5_000)
//                .responseTimeout(Duration.ofSeconds(30))
//                .doOnConnected(conn ->
//                        conn.addHandlerLast(new ReadTimeoutHandler(30, TimeUnit.SECONDS))
//                                .addHandlerLast(new WriteTimeoutHandler(30, TimeUnit.SECONDS))
//                );
//
//        return WebClient.builder()
//                .clientConnector(new org.springframework.http.client.reactive.ReactorClientHttpConnector(httpClient))
//                .defaultHeader("User-Agent", "cheongyagtalk-batch/1.0");
//    }
}

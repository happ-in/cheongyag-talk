package com.batch.cheongyagtalk.corp_info;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.configuration.annotation.*;
import org.springframework.batch.core.job.Job;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.Step;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.infrastructure.item.database.JdbcBatchItemWriter;
import org.springframework.batch.infrastructure.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.infrastructure.item.xml.StaxEventItemReader;
import org.springframework.batch.infrastructure.item.xml.builder.StaxEventItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableBatchProcessing
public class CorpInfoJob {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Bean
    public Job corpCodeJob(
            JobRepository jobRepository,
            Step downloadAndUnzipStep,
            Step parseAndInsertStep
    ) {
        return new JobBuilder("corpCodeJob", jobRepository)
                .start(downloadAndUnzipStep)
                .next(parseAndInsertStep)
                .build();
    }

    @Bean
    public Step downloadAndUnzipStep(
            JobRepository jobRepository,
            PlatformTransactionManager transactionManager,
            com.batch.cheongyagtalk.corp_info.DownloadAndUnzipTasklet tasklet
    ) {
        return new StepBuilder("downloadAndUnzipStep", jobRepository)
                .tasklet(tasklet, transactionManager)
                .build();
    }

    @Bean
    public Step parseAndInsertStep(
            JobRepository jobRepository,
            PlatformTransactionManager transactionManager,
            StaxEventItemReader<CorpCodeXml> corpCodeReader,
            JdbcBatchItemWriter<CorpCodeXml> corpCodeWriter
    ) {
        return new StepBuilder("parseAndInsertStep", jobRepository)
                .<CorpCodeXml, CorpCodeXml>chunk(1000)
                .reader(corpCodeReader)
                .writer(corpCodeWriter)
                .faultTolerant()
                .skipLimit(50)
                .skip(Exception.class)
                .build();
    }

    /**
     * ExecutionContext에 넣어둔 xmlPath를 읽어서 ItemReader에 주입
     */
    @Bean
    @StepScope
    public StaxEventItemReader<CorpCodeXml> corpCodeReader(
            @Value("#{jobExecutionContext['xmlPath']}") String xmlPath
    ) {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setClassesToBeBound(CorpCodeXml.class);

        // DART CORPCODE.xml 기준: <result> 아래에 <list>...</list> 반복
        return new StaxEventItemReaderBuilder<CorpCodeXml>()
                .name("corpCodeReader")
                .resource(new FileSystemResource(xmlPath))
                .addFragmentRootElements("list")
                .unmarshaller(marshaller)
                .build();
    }

    @Bean
    public JdbcBatchItemWriter<CorpCodeXml> corpCodeWriter(DataSource dataSource) {
        // Upsert(중복 시 갱신)까지 넣고 싶으면 ON CONFLICT 사용
        String sql = """
        insert into corp_info (
            corp_code,
            stock_code,
            corp_name,
            corp_eng_name,
            created_on,
            modified_on
        )
        values (
            :corpCode,
            nullif(:stockCode, ''),
            :corpName,
            :corpEngName,
            now(),
            to_timestamp(:modifyDate, 'YYYYMMDD')
        )
        on conflict (corp_code) do update
        set
            stock_code = excluded.stock_code,
            corp_name = excluded.corp_name,
            corp_eng_name = excluded.corp_eng_name,
            modified_on = excluded.modified_on
        """;

        return new JdbcBatchItemWriterBuilder<CorpCodeXml>()
                .dataSource(dataSource)
                .sql(sql)
                .beanMapped()
                .build();
    }
}

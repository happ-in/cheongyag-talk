package com.batch.cheongyagtalk.corp_info;

import org.jspecify.annotations.Nullable;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.StepContribution;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.infrastructure.repeat.RepeatStatus;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Component
@StepScope
public class DownloadAndUnzipTasklet implements Tasklet {

    private final WebClient webClient;

    public DownloadAndUnzipTasklet(WebClient webClient) {
        this.webClient = webClient;
    }

    @Override
    public @Nullable RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {

        String url = "https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=5fcd3663cd9fceab25ea2365cf594fa0b30b1510";

        Path workDir = Paths.get("/corpcode");
        Files.createDirectories(workDir);

        Path zipPath = workDir.resolve("corpcode.zip");

        Flux<DataBuffer> data = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToFlux(DataBuffer.class)
                ;

        try (OutputStream os = Files.newOutputStream(zipPath)) {
            DataBufferUtils.write(data, os).blockLast();
        }

        // 2) ZIP 해제해서 첫 번째 .xml 파일 추출
        Path extractedXml = unzipFirstXml(zipPath, workDir);

        // 3) 다음 Step에서 쓰도록 ExecutionContext에 저장
        chunkContext.getStepContext()
                .getStepExecution()
                .getJobExecution()
                .getExecutionContext()
                .putString("xmlPath", extractedXml.toString());

        return RepeatStatus.FINISHED;
    }

    private Path unzipFirstXml(Path zipPath, Path workDir) throws IOException {
        Path xmlPath = null;

        try (InputStream fis = Files.newInputStream(zipPath);
             ZipInputStream zis = new ZipInputStream(fis)) {

            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                if (entry.isDirectory()) continue;

                String name = Paths.get(entry.getName()).getFileName().toString();
                if (!name.toLowerCase().endsWith(".xml")) continue;

                xmlPath = workDir.resolve(name);

                try (OutputStream os = Files.newOutputStream(xmlPath
                        , StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING)) {
                    zis.transferTo(os);
                }

                zis.closeEntry();
                break; // 첫 번째 xml만
            }
        }

        if (xmlPath == null) {
            throw new FileNotFoundException("ZIP 안에서 .xml 파일을 찾지 못했습니다: " + zipPath);
        }
        return xmlPath;
    }
}

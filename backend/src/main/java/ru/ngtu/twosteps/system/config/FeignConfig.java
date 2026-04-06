package ru.ngtu.twosteps.system.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
import ru.ngtu.twosteps.analytics.AnalyticsClient;

/**
 * @author Egor Bokov
 */
@Configuration
@EnableFeignClients(clients = {AnalyticsClient.class})
public class FeignConfig {
}

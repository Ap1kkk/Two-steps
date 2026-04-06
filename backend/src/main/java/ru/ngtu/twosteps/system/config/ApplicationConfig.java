package ru.ngtu.twosteps.system.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import ru.ngtu.twosteps.system.config.properties.FileServiceConfigProperties;

/**
 * @author Egor Bokov
 */
@Configuration
@EnableConfigurationProperties({
        FileServiceConfigProperties.class
})
public class ApplicationConfig {
}

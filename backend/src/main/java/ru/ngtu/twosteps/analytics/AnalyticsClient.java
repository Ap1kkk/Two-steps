package ru.ngtu.twosteps.analytics;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ru.ngtu.twosteps.routes.dto.GetRecommendationRoutesDto;
import ru.ngtu.twosteps.routes.dto.RecommendationRoutesDto;
import ru.ngtu.twosteps.statisctics.GetStatisticsDto;
import ru.ngtu.twosteps.statisctics.StatisticsDto;

/**
 * @author Egor Bokov
 */
@FeignClient(value = "analytics-client", url = "${clients.analytics.url}")
public interface AnalyticsClient {

    @PostMapping(value = "/statistic")
    StatisticsDto getStatistics(@RequestBody GetStatisticsDto dto);

    @PostMapping(value = "/recommendations/")
    RecommendationRoutesDto getRecommendations(@RequestBody GetRecommendationRoutesDto dto);
}

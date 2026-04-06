package ru.ngtu.twosteps.statisctics;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.ngtu.twosteps.analytics.AnalyticsClient;
import ru.ngtu.twosteps.auth.AuthService;
import ru.ngtu.twosteps.user.model.User;

/**
 * @author Egor Bokov
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final AnalyticsClient analyticsClient;
    private final AuthService authService;

    public StatisticsDto getStatistics(StatisticsPeriod period) {
        User currentUser = authService.getCurrentUser();

        GetStatisticsDto dto = GetStatisticsDto
                .builder()
                .userId(currentUser.getId())
                .period(period)
                .build();
        return analyticsClient.getStatistics(dto);
    }
}

package ru.ngtu.twosteps.routes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.ngtu.twosteps.routes.jpa.RouteFilter;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetRecommendationRoutesDto {
    private Long userId;
    private RouteFilter filter;
}

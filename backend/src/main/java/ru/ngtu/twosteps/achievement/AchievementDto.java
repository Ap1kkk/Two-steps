package ru.ngtu.twosteps.achievement;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AchievementDto {
    private Long id;
    private String name;
    private String description;
    private Long progress;
    private Long goal;
}

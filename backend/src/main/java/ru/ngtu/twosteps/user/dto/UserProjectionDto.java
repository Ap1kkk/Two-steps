package ru.ngtu.twosteps.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.ngtu.twosteps.category.Category;
import ru.ngtu.twosteps.region.Region;
import ru.ngtu.twosteps.user.activity.UserActivity;
import ru.ngtu.twosteps.user.avatar.UserAvatar;
import ru.ngtu.twosteps.user.model.User;
import ru.ngtu.twosteps.user.model.UserGender;
import ru.ngtu.twosteps.user.model.UserRole;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * DTO for {@link User}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProjectionDto {
    private Long id;
    private String username;
    private String email;
    private UserGender gender;
    private UserActivity activity;
    private Region region;
    private UserAvatar avatar;
    private LocalDate birthday;
    private UserRole role;
    private ZonedDateTime createdAt;
    private List<Category> preferences;
}
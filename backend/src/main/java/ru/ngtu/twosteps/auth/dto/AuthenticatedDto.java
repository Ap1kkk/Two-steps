package ru.ngtu.twosteps.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.ngtu.twosteps.user.model.User;

/**
 * @author Egor Bokov
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedDto {
    private String token;
    private User user;
}
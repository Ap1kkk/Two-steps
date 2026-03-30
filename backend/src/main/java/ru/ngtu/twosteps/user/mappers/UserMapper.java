package ru.ngtu.twosteps.user.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.ngtu.twosteps.region.Region;
import ru.ngtu.twosteps.region.RegionRepository;
import ru.ngtu.twosteps.system.exceptions.classes.data.EntityNotFoundException;
import ru.ngtu.twosteps.user.activity.UserActivity;
import ru.ngtu.twosteps.user.activity.UserActivityRepository;
import ru.ngtu.twosteps.user.dto.CreateCredentialsDto;
import ru.ngtu.twosteps.user.dto.FinishRegistrationDto;
import ru.ngtu.twosteps.user.model.User;

import java.time.ZonedDateTime;

/**
 * @author Egor Bokov
 */
@Component
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;
    private final RegionRepository regionRepository;
    private final UserActivityRepository userActivityRepository;

    public User map(CreateCredentialsDto source) {
        return User
                .builder()
                .username(source.getUsername())
                .email(source.getEmail())
                .role(source.getRole())
                .password(passwordEncoder.encode(source.getPassword()))
                .createdAt(ZonedDateTime.now())
                .build();
    }

    public User map(User target, FinishRegistrationDto dto) {
        Long regionId = dto.getRegionId();
        Region region = regionRepository.findById(regionId)
                .orElseThrow(() -> new EntityNotFoundException(Region.class, regionId));

        Long activityId = dto.getActivityId();
        UserActivity userActivity = userActivityRepository.findById(activityId)
                .orElseThrow(() -> new EntityNotFoundException(UserActivity.class, activityId));

        target.setRegion(region);
        target.setBirthday(dto.getBirthday());
        target.setGender(dto.getGender());
        target.setActivity(userActivity);

        return null;
    }
}

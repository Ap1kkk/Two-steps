package ru.ngtu.twosteps.achievement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
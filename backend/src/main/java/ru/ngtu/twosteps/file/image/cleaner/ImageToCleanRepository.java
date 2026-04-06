package ru.ngtu.twosteps.file.image.cleaner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Egor Bokov
 */
@RepositoryRestResource(exported = false)
public interface ImageToCleanRepository extends JpaRepository<ImageToClean, Long> {
}
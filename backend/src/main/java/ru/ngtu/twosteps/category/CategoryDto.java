package ru.ngtu.twosteps.category;

import lombok.Value;

/**
 * DTO for {@link Category}
 */
@Value
public class CategoryDto {
    Long id;
    String name;
}
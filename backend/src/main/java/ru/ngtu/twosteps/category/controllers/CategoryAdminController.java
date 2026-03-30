package ru.ngtu.twosteps.category.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.ngtu.twosteps.category.Category;
import ru.ngtu.twosteps.category.CategoryDto;
import ru.ngtu.twosteps.category.CategoryService;

/**
 * @author Egor Bokov
 */
@RestController
@RequestMapping("/api/v1/admin/category")
@RequiredArgsConstructor
public class CategoryAdminController {

    private final CategoryService categoryService;

    @PostMapping
    public Category create(@RequestBody CategoryDto dto) {
        return categoryService.create(dto);
    }

    @PutMapping
    public Category update(@RequestBody CategoryDto dto) {
        return categoryService.update(dto);
    }

    @DeleteMapping
    public void delete(@RequestParam Long id) {
        categoryService.delete(id);
    }
}

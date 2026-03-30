package ru.ngtu.twosteps.system.exceptions.classes.validation;

/**
 * Used in {@link ValidationViolationDto} as a reason of violation
 */
public interface ValidationErrorType {
    String getType();
}

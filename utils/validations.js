const validateTodo = (data) => {
    const errors = {};

    // Check if title is provided
    if (!data.title || typeof data.title !== 'string') {
        errors.title = 'Title is required and must be a string.';
    }

    // Ensure completed is a boolean if provided
    if (data.completed !== undefined && typeof data.completed !== 'boolean') {
        errors.completed = '`completed` must be a boolean.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

module.exports = {
    validateTodo,
};

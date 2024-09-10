const RESPONSES = {
    ERROR: {
        PARAM_REQUIRED: (param) => `param <${param}> is required`,
        PARAM_TYPE: (param, type) => `param <${param}> must be type <${type}>`,
        PARAM_PATTERN: (param, pattern) =>
            `param <${param}> must follow pattern: ${pattern}`,
        RESOURCE_NOT_FOUND: (resourse, identifier_name, identifier_value) =>
            `resource <${resourse}> with <${identifier_name}:${identifier_value}> not found`,
        CREATE_RESOURCE_CONFLICT: (
            resource,
            identifier_name,
            identifier_value
        ) =>
            `resource <${resource}> with <${identifier_name}:${identifier_value}> already exists`,
        DB_ERROR: (resource) =>
            `can not create resource <${resource}> because of internal server error. please contact support.`,
    },
}
export default RESPONSES

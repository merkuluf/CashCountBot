export const isValidUsername = (username: string) =>
    /^@[A-Za-z0-9]{4,13}$/.test(username)

export function isStringDigit(str) {
    return /^\d+$/.test(str)
}

export const isCurrency = (str) => /^[A-Z]{3}$/.test(str)

export function varIsInt(variable) {
    return Number.isInteger(variable)
}

export const isValidUsername = (username) =>
    /^@[A-Za-z0-9]{4,13}$/.test(username)

export function displayNameIsValid(input) {
    // Check if input is a string
    if (typeof input !== 'string') {
        return false
    }

    // Regex to match one or two words consisting of only Russian or English letters
    // Each word should be at least 1 character long, and the total character count should be between 5 and 20
    const regex = /^([A-Za-zА-Яа-яёЁ]+)(\s[A-Za-zА-Яа-яёЁ]+)?$/

    // Check if the input matches the regex
    if (!regex.test(input)) {
        return false
    }

    // Check the total length of the input (including space if present)
    return input.length >= 5 && input.length <= 20
}

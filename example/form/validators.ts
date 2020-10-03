export function isNotEmpty(value: string) {
    console.log("isNotEmpty", value)
    return !!value && value !== ""
}
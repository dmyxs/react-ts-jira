export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: any) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}

export const resetRouter = () => window.location.href = window.location.origin
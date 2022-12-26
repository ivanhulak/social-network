export const updateObjectInArray = (items, objectPropName, itemId, objectProp) => {
    return items.map(u => {
        if (u[objectPropName] === itemId) {
            return { ...u, ...objectProp }
        }
        return u;
    })
}
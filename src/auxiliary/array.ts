const removeAt = (array: any[], index: number): any[] => {
    if (index < 0 || index >= array.length) {
        return array;
    }

    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
}

export { removeAt };
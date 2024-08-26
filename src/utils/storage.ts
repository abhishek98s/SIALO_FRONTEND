export const getLocalStorageItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value;
};

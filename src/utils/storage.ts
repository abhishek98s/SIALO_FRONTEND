export const getLocalStorageItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value;
};

export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const clearLocalStorage = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
}

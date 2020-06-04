export function getfromStorage(key) {
    if(!key) {
        return null;
    }
    try {
        return localStorage.getItem(key);
    } catch(err) {
        return null;
    }
}
export function setStorageData({key,val}) {
    if(!key) {
        return false;
    }
    try {
        localStorage.setItem(key,val);
    } catch(err) {
        return false;
    }
    return true;
}
export function removefromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch(err) {
        return false;
    }
    return true;
}
/**
 * 时间戳转时间
 * @param {String} tm 毫秒级时间
 */
export const stampToTime = tm => {
    return new Date(parseInt(tm)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

export const formatEnTime = enTime => {
    var date = new Date(enTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return `${y}-${m}-${d}`;
}

export const validVal = val => {
    if (val != undefined && val != null && val != '') {
        return true;
    } else {
        return false;
    }
}
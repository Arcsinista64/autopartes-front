
/**
 * Converts a filter object into a query parameter string
 * @param object An object containing all filter values possible
 */
function format(object: any): string {
    let str = '?';
    for (const key in object) {
        if (object[key]) {
            let value = object[key];
            if (value instanceof Array) {
                if (value.length > 0 && value.every(val => val)) {
                    value = value.join(',');
                    str += '&' + key + '=' + encodeURIComponent(value);
                }
            } else if (value) {
                str += '&' + key + '=' + encodeURIComponent(value);
            }
        }
    }
    return str;
}

export default format;

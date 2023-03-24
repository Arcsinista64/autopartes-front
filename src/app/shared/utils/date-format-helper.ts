function dateFormat(date: Date): string | null{
    if (date) {
        const dateText = date.toLocaleDateString().split('/', 3); // Day Month Year
        const day = dateText[0];
        const month = dateText[1];
        const year = dateText[2];
        return year + '-' + month + '-' + day;
    }
    return null;
}

export default dateFormat;
// get dates between given two days
const getDatesBetween = (fromDay: Date, toDay: Date) => {

    const dateArray: Date[] = [];
    let tempDate = fromDay;
    while (toDay > tempDate) {
        dateArray.push(tempDate);
        tempDate = new Date(tempDate);
        tempDate.setDate(tempDate.getDate() + 1);
    };

    return dateArray;

};

export {
    getDatesBetween
}
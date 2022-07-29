module.exports = data => {
    let [date, time] = data.toLocaleString().split(' ');
    date = date.split('/');
    const dateTime = `${date[2]}-${date[1]}-${date[0]}T${time}`;
    return dateTime;
}
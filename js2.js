function result(){
    let currentDate = new Date();
    let pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - 4);
    
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[pastDate.getDay()];
}

console.log(result());
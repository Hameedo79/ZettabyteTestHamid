const reports = {
    '12/25/21': 400000,
    '12/26/21': 200000,
    '12/27/21': 450000,
    '12/28/21': 500000,
    '12/29/21': 420000,
    '12/30/21': 420000,
    '12/31/21': 700000
}

function result(reports) {
    const arr = [];
    for (const [key, value] of Object.entries(reports)) {
        let obj = { date: key, profit: value };
        arr.push(obj);
    }
    return arr;
}

console.log(result(reports));
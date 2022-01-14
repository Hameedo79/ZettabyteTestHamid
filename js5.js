const students = [
    { firstName: 'Kai', lastName: 'Lyons' },
    { firstName: 'Belle', lastName: 'Norton' },
    { firstName: 'Finnley', lastName: 'Rennie' },
    { firstName: 'Tatiana', lastName: 'Dickerson' },
    { firstName: 'Peyton', lastName: 'Gardner' },
];

const groups = 3;

function result(students, groups) {


    students.sort(
        function (a, b) {
            return a.firstName > b.firstName ? 1 : -1;
        });

    const group = [];
    let group2 = [];
        let x = 0;
    for (let i = 0; i < students.length; i++) {
        x += 1;
        group2.push(students[i]);

        if (x % 2 == 0 || students.length - x == 0) {

            group.push(group2);
            group2 = [];
        }
    }
    return group;
}


console.log(result(students, groups));



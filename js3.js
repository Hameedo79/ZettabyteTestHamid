const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
    for (let i in data) {
        data[i] = data[i] * 3;
    }

    const sorted = Object.entries(data)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    return sorted;
}

console.log(result(data));
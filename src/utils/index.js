export function getLinkNodeInArray(array, searchName) {
    let res;

    search(array, searchName)

    function search(array, searchName) {
        if (array.findIndex(item => item.name == searchName) >= 0) {
            res = {
                index: array.findIndex(item => item.name == searchName),
                array: array
            };
        } else {
            array.forEach(elem => {
                return search(elem.children, searchName)
            })
        }
    }

    return res;
}

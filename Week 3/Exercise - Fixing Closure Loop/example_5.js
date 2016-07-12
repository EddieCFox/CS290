
function buildList(list) {
    var result = [];

    function createClosure(item, i) {
        return function() {alert(item + ' ' + list[i])};
    }

    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push(createClosure(item, i));
    
    }

    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

console.log(testList());



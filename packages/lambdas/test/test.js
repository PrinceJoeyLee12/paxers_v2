const obj = {
    name: 'Prince Joey Lee',
    course: 'COMPE',
    id: '193ikesasd'
}

function test() {
    const { id, ...rest } = obj
    const restObj = rest
    console.log('ID', id)
    console.log(rest)
    console.log(rest)
    console.log({...restObj})
}
test()
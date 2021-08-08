const template = async() => {return new Promise((resolve) => {
    resolve(require('./get-email-template'))
}) }

console.log(`${template.then((result) => {
    return result
}).catch((err) => {
    return err
})}`)
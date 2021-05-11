const Tail = require('tail').Tail
const path = require('path')

const root_path = process.cwd().split(path.sep, 3).join('/')
console.log(`root: ${root_path}/.chia/mainnet/log/debug.log`)
const tail = new Tail(`${root_path}/.chia/mainnet/log/debug.log`)

const listen = () => {
    tail.on("line", function (data) {
        const splited = data.split(': INFO').map(text => text.trim())
        if (splited.length > 0) {
            console.log(splited[0].split(' '), splited[1])
        } else {
            console.log(data.split(': INFO').map(text => text.trim()))
        }
    })
    tail.on("error", function (error) {
        console.log('ERROR: ', error)
    })
}

const unlisten = () => {
    tail.unwatch()
    console.log('unlisten.')
}

module.exports = {
    listen,
    unlisten,
}
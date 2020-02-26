const mongoose = require('mongoose').set('debug', true)

const options = {
  autoReconnect: true
}

const url = 'mongodb://localhost:27017/drop'

module.exports = {
  connect: () => {
    mongoose.connect(url, options)
    let db = mongoose.connection
    db.on('error', () => console.log('链接数据库错误'))
    db.once('open', () => console.log('链接数据库成功'))
  }
}
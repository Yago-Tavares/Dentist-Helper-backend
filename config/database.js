const  mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://dentist.helper:projetop1@ds251632.mlab.com:51632/dentist-helper', (err) => {
    if (err) console.log('Some problem with the connection ' + err)
    else console.log('The mongoose connection is ready')
})

// module.exports = mongoose.connect('mongodb://localhost:27017/dentist-helper', (err) => {
//     if (err) console.log('Some problem with the connection ' + err)
//     else console.log('The mongoose connection is ready')
// })
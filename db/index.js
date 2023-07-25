const mongoose = require( 'mongoose')

async function connect(){

  await mongoose.connect(process.env.DB).then(()=> console.log(`MongoDB successfully connected to DB`))
  
}

module.exports = connect;
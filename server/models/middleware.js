const middleware = {}

middleware.findStudent = async (req, res) => {
  //get params
  const firstName = req.params.firstName;
  console.log(firstName)
  //create query
  const query = { firstName }
  //perform findOne on collection (how do we get the collection from the server.js file?)
  try {
    const result = await res.locals.collection.findOne(query);
    console.log(res.locals.collection)
    return res.json(result);
  }
  catch {
    console.log('in catch of findStudent');
    return res.status(504);
  }
}

//export something
module.exports = middleware;




// const { MongoClient } = require("mongodb");

// var db;

// // Connection URI
// const uri =
// "mongodb+srv://etoh:jyc!34564@nodemongo.urcuz.mongodb.net/RLBF?retryWrites=true&w=majority";
// // Create a new MongoClient

// MongoClient.connect(uri, function(err, database) {
//   if (err) console.log('error ', err);
//   db = database;
// })


// MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
//   if(err) throw err;

//   db = database;

//   // Start the application after the database connection is ready
//   app.listen(3000);
//   console.log("Listening on port 3000");
// });

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });

//     console.log("Connected successfully to server");
//   } 
//   catch {
//     console.log(error)
//   }
//   // finally {
//   //   // Ensures that the client will close when you finish/error
//   //   await client.close();
//   // }
// }
// run().catch(console.dir);

// module.export = db;
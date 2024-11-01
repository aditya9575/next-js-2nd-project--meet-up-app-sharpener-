//This will be the url of this *->/api/new-meetup and if a request is sent to this url it will trigger a function here that we define 

import { MongoClient } from "mongodb";

async function handler (req, res){
 if(req.method === "POST"){
   const data = req.body;

  //  const {title , image , address , description } = data;

  const client = await MongoClient.connect("mongodb+srv://adityamehto19:3n24LmlbnAQJrnHA@cluster0.o10tm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0")
  // client.db will give access to the database 
  const db = client.db() 

  const meetupsCollection = db.collection("meetups");

const result =  await  meetupsCollection.insertOne(data);
console.log(result);

// client.close will close the connection to the database
client.close();

//now we use the response object to send back a response
res.status(201).json({message: "Meetup Inserted!"})

}
}

export default handler


// mongodb+srv://adityamehto19:3n24LmlbnAQJrnHA@cluster0.o10tm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0
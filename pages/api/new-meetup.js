const { MongoClient } = require("mongodb");

    const uri = 'mongodb+srv://luzzani:Luzz1722ma@cluster0.zpauy.mongodb.net/meetups?retryWrites=true&w=majority'
    
    const client = new MongoClient(uri);
     
    export default async function handler(req, res) {
      if (req.method === "POST") {
        const data = req.body;
     
        await client.connect();
        const database = client.db("nextjs_meetups");
     
        const meetupsCollections = database.collection("meetups");
        
        const result = await meetupsCollections.insertOne(data);

        console.log(result);
     
        client.close();
     
        res.status(201).json({
          message: "Ok",
        });
      }
    }
 
    /*    
if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://luzzani:Luzz1722ma@cluster0.zpauy.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db;

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
    */


import Head from "next/head";
const { MongoClient } = require("mongodb");
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Explore a landscape</title>
        <meta
          name="description"
          content="Explore and share incredible landscapes"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

const uri =
  "mongodb+srv://luzzani:Luzz1722ma@cluster0.zpauy.mongodb.net/meetups?retryWrites=true&w=majority";

export async function getStaticProps() {
  const client = new MongoClient(uri);

  await client.connect();
  const database = client.db("nextjs_meetups");

  const meetupsCollections = database.collection("meetups");

  const meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

/*
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    
    return {
        props:{
            meetups: DUMMY_MEETUPS
        } 
    }
}
*/
export default HomePage;

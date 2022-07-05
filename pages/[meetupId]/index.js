const { MongoClient, ObjectId } = require("mongodb");
import Head from 'next/head';
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (<>
    <Head>
      <title>{props.meetupData.title}</title>
      <meta
          name="description"
          content={props.meetupData.description}
        ></meta>
    </Head>
    <MeetupDetail
      image={props.meetupData.image
      }
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
      </>
  );
}

const uri =
  "mongodb+srv://luzzani:Luzz1722ma@cluster0.zpauy.mongodb.net/meetups?retryWrites=true&w=majority";

export async function getStaticPaths() {
  const client = new MongoClient(uri);

  await client.connect();
  const database = client.db("nextjs_meetups");

  const meetupsCollections = database.collection("meetups");

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = new MongoClient(uri);

  await client.connect();
  const database = client.db("nextjs_meetups");

  const meetupsCollections = database.collection("meetups");

  const selectedMeetup = await meetupsCollections.findOne({_id: ObjectId(meetupId)});

  client.close();

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description
      },
    },
  };
}

export default MeetupDetails;

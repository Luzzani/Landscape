import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
            const response = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(enteredMeetupData),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data);

            router.push('/')
    }

    return<>
    <Head>
        <title>Add a Landscape</title>
        <meta
          name="description"
          content="add amazing landscapes and share with everyone"
        ></meta>
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </> 
}

export default NewMeetupPage;
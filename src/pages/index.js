// this loads on our localhost:3000 this is the app starting page

import { useEffect, useState } from "react";

// hosting part
import Head from "next/head";

import MeetupList from "../../components/meetups/MeetupList";

import { MongoClient } from "mongodb";



const HomePage = (props) => {

//  const [loadedMeetups, setLoadedMeetups] =  useState();
//   useEffect(()=>{
// setLoadedMeetups(DUMMY_MEETUPS)
//   },[])
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"/>
      </Head>
      <MeetupList meetups={props.meetups}/>

    </>

    
  )
}

// this is used for frequent data changes
// export async function getServerSideProps(context) {

// const req = context.req;
// const res = context.res;

//   return{
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps(){

  const client = await MongoClient.connect("mongodb+srv://adityamehto19:3n24LmlbnAQJrnHA@cluster0.o10tm.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0")
  // client.db will give access to the database 
  const db = client.db() 

  const meetupsCollection = db.collection("meetups");

const meetups = await meetupsCollection.find().toArray();

client.close();

  return{
    props:{
      meetups: meetups.map(meetup => ({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString(),
      }))
    },
    revalidate: 1
  };
}

export default HomePage
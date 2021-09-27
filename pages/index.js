import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://i1-ngoisao.vnecdn.net/2021/02/18/Anh-7-5455-1613627242.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=nbuAB8LnvvMVXt6O4NJbdw",
//     address: "Dalat Highland",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://i1-vnexpress.vnecdn.net/2021/03/19/NhaTrang-KhoaTran-27-1616120145.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=hOr20X9n4sVP0c2zRwS3EA",
//     address: "Nhatrang City",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup Application</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://vuongtrian:8qI0gqNKUWRS4mal@cluster0.91prj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

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
    revalidate: 10,
  };
}

export default HomePage;

import { Button } from "@chakra-ui/react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function MyApp({session}) {
useEffect(() => {
    console.log("session object is", session);
  }, []);
  if(session) {
    return (
      <div>
        <p>Welcome, {session?.user?.name}! <br />
           Your Twitter account ID is: {session?.user?.id}</p>
        <Button colorScheme={"blue"} onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div>
      <Button  colorScheme={"blue"} onClick={() => signIn('twitter')}>Sign in with Twitter</Button>
    </div>
  );


}

export default MyApp;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
      props: {
        session
      }
    }
  }

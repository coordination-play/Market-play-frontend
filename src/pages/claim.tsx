import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function MyApp({session}) {
//const { data: session } = useSession();
useEffect(() => {
    console.log("session object is", session);
  }, []);
  if(session) {
    return (
      <div>
        <p>Welcome, {session?.user?.name}! <br />
           Your Twitter email is: {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
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

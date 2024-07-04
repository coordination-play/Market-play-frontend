import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";


export default NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            version: '2.0', // Use Twitter OAuth 2.0
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = token.sub;
            session.user.username = token.screen_name;
            session.user.email= token.email;
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',

    }
});

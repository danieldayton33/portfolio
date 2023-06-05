import NextAuth, { type NextAuthOptions, Session } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || '',
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
            authorization:
                'https://accounts.spotify.com/authorize?scope=user-read-email',
        }),
    ],
    callbacks: {
        async signIn(user) {
            // const dbUser = await checkIfUserExists(user.email);
            // conosle.log(dbUser);
            return true;
        },
        async jwt({ token, user, account, profile }) {
            return {
                accessToken: account?.access_token,
                ...token,
            };
        },
        // @ts-ignore
        async session({
            session,
            token,
        }: {
            session: Session & {
                user: {
                    accessToken?: string;
                };
            };
            token: JWT & {
                accessToken?: string;
            };
        }) {
            if (token && session.user) {
                session.user.accessToken = <string>token.accessToken;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

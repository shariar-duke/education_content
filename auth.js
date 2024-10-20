import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { User } from "./model/user-model";

import bcrypt from "bcryptjs";

// Function to refresh the access token
async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID, // Fixed to client_id
        client_secret: process.env.GOOGLE_CLIENT_SECRET, // Fixed to client_secret
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedToken = await response.json(); // Corrected syntax

    if (!response.ok) {
      throw refreshedToken; // Throws error if the response is not OK
    }

    return {
      ...token, // Spread existing token properties
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // Set new expiry time
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // Use old refresh token if none is returned
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError", // Descriptive error
    };
  }
}

// NextAuth configuration
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    // Credentials provider for custom user authentication
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials?.email });
          console.log(user);

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatch) {
              return user;
            } else {
              console.error("Password mismatch");
              throw new Error("Check your password");
            }
          } else {
            console.error("User not found");
            throw new Error("User not found");
          }
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
      },
    }),
    // Google provider for OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Use environment variable
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Use environment variable
      authorization: {
        params: {
          prompt: "consent", // Request consent every time
          access_type: "offline", // Required for refresh token
          response_type: "code",
        },
      },
    }),
  ],

  // Callbacks for handling JWT and session
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign-in
      if (account && user) {
        console.log("JWT token:", JSON.stringify(token)); // Corrected logging
        console.log("JWT account:", JSON.stringify(account)); // Corrected logging

        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000, // Fixed key: "accessTokenExpires"
          refreshToken: account.refresh_token,
          user, // Attach user info to the token
        };
      }

      // Return previous token if access token is still valid
      if (Date.now() < token.accessTokenExpires) {
        console.log(`At ${new Date(Date.now())} using old access token`);
        // Fixed key: "accessTokenExpires"
        return token;
      }

      console.log(`Token Expired at ${new Date(Date.now())}`);
      // Access token has expired, refresh it
      return refreshAccessToken(token);
    },

    // Session callback
    async session({ session, token }) {
      session.user = token.user; // Attach user info from the token
      session.accessToken = token.accessToken; // Use correct "accessToken" key
      session.error = token.error; // Attach any token errors
      console.log(`Returning ${session}`);
      return session;
    },
  },
});

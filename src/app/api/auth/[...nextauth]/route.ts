import NextAuth from "next-auth/next";
import { Option } from "./option";

const handler = NextAuth(Option);

export { handler as GET, handler as POST }

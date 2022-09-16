import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';
import { config } from '@/config';

const client = new FaunaClient(config.fauna);

export default NextAuth({
  debug: config.app.isProduction,
  providers: [EmailProvider(config.email)],
  adapter: FaunaAdapter(client),
});

import NextAuth from 'next-auth';
import EmailProvider, { SendVerificationRequestParams } from 'next-auth/providers/email';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import path from 'path';
import { config } from '@/config';

const client = new FaunaClient(config.fauna);

const transporter = nodemailer.createTransport({
  ...config.email.server,
  secure: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({ identifier, url }: SendVerificationRequestParams) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });
  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `"⚡ Magic NextAuth" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Your sign-in link for Magic NextAuth',
    html: emailTemplate({
      signin_url: url,
      email: identifier,
    }),
  });
};

export default NextAuth({
  debug: config.app.isProduction,
  providers: [EmailProvider({maxAge: config.email.maxAge, sendVerificationRequest})],
  adapter: FaunaAdapter(client),
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
});

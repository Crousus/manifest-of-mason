import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {z} from "zod";
import {PrismaClient} from "@prisma/client";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";

const prisma = new PrismaClient();

const blacklist = process.env.BLACKLIST?.split(',');

const emailRegex = /^[a-zA-Z0-9._%+-]+@(student\.unisg\.ch)$/;

export const tokenRouter = createTRPCRouter({
    token: publicProcedure
        .input(z.object({email: z.string()}))
        .query(async ({input}) => {

            if (!emailRegex.test(input.email)) {
                return {status: 'error', message: 'Only @student.unisg.ch emails are allowed'};
            }

            if (blacklist?.includes(input.email)) {
                return {status: 'error', message: 'Due to disputes this mail is blacklisted'};
            }

            const accessToken = crypto.randomBytes(48).toString('hex')

            try {
                const user = await prisma.user.upsert({
                    where: {email: input.email},
                    update: {email: input.email, access_token: accessToken},
                    create: {
                        email: input.email,
                        access_token: accessToken,
                        uses: 0,
                    },
                });

                await sendEmail(input.email, 'Your token', `Your token is: ${accessToken}`)

                return {status: 'success', message: 'Check your email for your token'};
            } catch (error) {
                console.log(error)
                return {status: 'error', message: "Something went wrong. Please try again later"};
            }
        }),
});

async function sendEmail(to: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,     // your Gmail address from environment variables
            pass: process.env.EMAIL_PASSWORD  // your Gmail password from environment variables
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
}

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Extract Bearer token from Authorization header
    const authHeader = req.headers.authorization?.split(' ');

    if (!authHeader || authHeader.length != 2 || authHeader[0] != "Bearer") {
        return res.status(401).send("Invalid Authorization. Please use a bearer token");
    }

    const accessToken = authHeader[1];

    // Check for user existence in the database
    const user = await prisma.user.findUnique({
        where: { access_token: accessToken }
    });

    if (!user) {
        return res.status(401).send("Invalid token");
    }

        // Update the user's uses count
    await prisma.user.update({
        where: { id: user.id },
        data: { uses: user.uses + 1 }
    });

    // Fetch a random quote from the Quote model
    const totalQuotes = await prisma.quote.count();
    const randomIndex = Math.floor(Math.random() * totalQuotes);

    const randomQuote = await prisma.quote.findFirst({
        skip: randomIndex
    });

    const quoteText = randomQuote?.quote || "No quotes found";

    res.status(200).json({message: quoteText});
}

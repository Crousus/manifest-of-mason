import { PrismaClient } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // Extract Bearer token from Authorization header
    const authHeader = req.headers.authorization?.split(' ');

    if (!authHeader || authHeader.length != 2 || authHeader[0] != "Bearer") {
        return res.status(401).send("Invalid Authorization. Please use a bearer token");
    }

    const accessToken = authHeader[1];

    // Check for user existence in the database
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const user = await prisma.user.findUnique({
        where: { access_token: accessToken }
    });

    if (!user) {
        return res.status(401).send("Invalid token");
    }

        // Update the user's uses count
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    await prisma.user.update({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        where: { id: user.id },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        data: { uses: user.uses + 1 }
    });

    // Fetch a random quote from the Quote model
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const totalQuotes = await prisma.quote.count();
    const randomIndex = Math.floor(Math.random() * totalQuotes);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const randomQuote = await prisma.quote.findFirst({
        skip: randomIndex
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const quoteText = randomQuote?.quote ?? "No quotes found";

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(200).json({message: quoteText});
}

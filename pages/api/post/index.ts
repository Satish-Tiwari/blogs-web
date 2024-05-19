import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// POST /api/post
// title* (required)
// content (optional)
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { title, content } = req.body as { title: string; content?: string };

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const session = await getServerSession(req, res, authOptions)
    console.warn({session});
    if (!session?.user?.email) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const result = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: { connect: { email: session.user.email } },
            },
        });

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

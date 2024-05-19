import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  if(!postId) throw new Error("Post Id is required!");
  const id:string = !Array.isArray(postId) ? postId : postId[0]
  const post = await prisma.post.update({
    where: { id: id },
    data: { published: true },
  });
  res.json(post);
}
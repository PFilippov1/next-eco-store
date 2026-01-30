'use server';
import prisma from '../../lib/prisma';

export async function createComment(formData: FormData) {
  const commentText = formData.get('comment') as string;

  try {
    // Prisma returns the created object if everything is ok
    const newComment = await prisma.comments.create({
      data: {
        comment: commentText,
      },
    });

    return { success: true, data: newComment };
  } catch {
    return { success: false, error: 'Error while saving' };
  }
}
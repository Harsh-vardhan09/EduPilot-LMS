import ImageKit from '@imagekit/nodejs';
import dummybooks from '../books.json';
import { getUploadAuthParams } from '@imagekit/next/server';
import { books } from './schema';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql });

const uploadToImageKit = async (
  imageUrl: string,
  fileName: string,
  folder: string
) => {
  const imagekit = new ImageKit({
    privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY!,
  });

  const result = await imagekit.files.upload({
    file: imageUrl,
    fileName,
    folder,
  });
  return result.url;
};

const seed = async () => {
  console.log('seeding data');
  try {
    for (const book of dummybooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.png`,
        '/books/covers'
      ) as string;

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        '/books/videos'
      ) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }

    console.log('database seeded successfully');
  } catch (error) {
    console.log('error seeding data' + error);
  }
};
seed();

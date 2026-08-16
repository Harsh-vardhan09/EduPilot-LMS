import config from '@/lib/config';
import { getUploadAuthParams } from '@imagekit/next/server';
import { NextResponse } from 'next/server';

export async function GET() {
    
  try {
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: config.env.imagekit.privateKey!,
      publicKey: config.env.imagekit.publicKey!,
    });
    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey: config.env.imagekit.publicKey,
    });
  } catch (error) {
    console.log(error);
  }
}

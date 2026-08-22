'use client'

import config from '@/lib/config'
import { ImageKitProvider, Video } from '@imagekit/next'
import React from 'react'

const BookVideo = ({videoUrl}:{videoUrl:string}) => {
  return (
    <ImageKitProvider publicKey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint}>
            <Video urlEndpoint={config.env.imagekit.urlEndpoint} src={videoUrl} controls={true} className="w-full rounded-xl" />
    </ImageKitProvider>
  )
}

export default BookVideo
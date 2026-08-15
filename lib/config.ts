const config={
    env:{
        apiEndpoint:process.env.NEXT_PUBLIC_API_ENDPOINT,
        imagekit:{
            publicKey:process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
            urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL,
            privateKey:process.env.NEXT_IMAGEKIT_PRIVATE_KEY
        }
    }
}

export default config
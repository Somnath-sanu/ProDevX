/* eslint-disable @typescript-eslint/no-unused-vars */
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  try {
    const blob = await request.blob();
    /**
     * The request.blob() method is used to extract the binary data (like images, files, etc.) from an HTTP request.
     * When you upload a file through your form, the file is sent as binary data in the request body
        request.blob() reads this binary data and returns a Blob object
        A Blob (Binary Large Object) represents raw binary data and is commonly used for handling files like images
     * 
            // 1. Client side (UploadImages.ts)
                fetch('/api/upload?filename=...', {
              method: 'POST',
                 body: file,  // file is sent as binary data
                })

                // 2. Server side (route.ts)
                    const blob = await request.blob();  // Extracts the binary file data
                    const response = await put(filename, blob, {  // Uploads to Vercel Blob storage
            access: 'public',
                addRandomSuffix: false,

                    For example, when you upload an image:

                        The image file is sent in the request body
            request.blob() extracts that image data
                The blob is then uploaded to Vercel's Blob storage using the put function
                });
    */

    const response = await put(`${filename}`, blob, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}

import { MAX_SIZE } from "@/lib/utils";
import { nanoid } from "nanoid";
import path from "path";

export async function uploadFile(file: File): Promise<string> {
  if (file.size > MAX_SIZE) {
    throw new Error(`${file.name} is larger than 4.5 MB.`);
  }
  const filename = `blog_images/${path.extname(file.name)}-${nanoid(10)}`;
  const response = await fetch(
    `/api/upload?filename=${encodeURIComponent(filename)}`,
    {
      method: "POST",
      body: file,
    },
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const data = await response.json();
  return data.url;
}

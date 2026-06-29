import { MAX_SIZE } from "@/lib/utils";
import { nanoid } from "nanoid";
import path from "path";

export const uploadImages = async (files: FileList): Promise<string[]> => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const filename = `project_showcase/${nanoid(10)}-${path.extname(file.name)}`;
    if (file.size > MAX_SIZE) {
      throw new Error(`${file.name} is larger than 4.5 MB.`);
    }
    const response = await fetch(
      `/api/upload?filename=${encodeURIComponent(filename)}`,
      {
        method: "POST",
        body: file,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  });

  return Promise.all(uploadPromises);
};

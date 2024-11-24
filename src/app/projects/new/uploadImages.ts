import { nanoid } from "nanoid";
import path from "path";

export const uploadImages = async (files: FileList): Promise<string[]> => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const filename = `project_showcase/${nanoid(10)}-${path.extname(file.name)}`;
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

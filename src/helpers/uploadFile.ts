import { access, unlink } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function saveImageToDisk(
  file: File,
  currentProfilePic?: string | null
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}_${file.name}`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "profilePic",
      filename
    );

    // Only attempt to delete if currentProfilePic exists and is not empty
    if (currentProfilePic && currentProfilePic.trim() !== "") {
      const currentFilePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "profilePic",
        currentProfilePic?.split("/")[3]
      );
      try {
        access(currentFilePath, () => {
          // console.log('file exists')
        });
        unlink(currentFilePath, () => {
          // console.log('file deleted')
        });
      } catch {
        // File doesn't exist — continue
      }
    }

    await writeFile(filePath, buffer);

    return `/uploads/profilePic/${filename}`;
  } catch (error) {
    throw new Error(`File has not been saved ${error}`);
  }
}

export async function saveFileToDiskWithPath(
  file: File,
  pathToSave: string,
  currentProfilePic?: string | null
): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}_${file.name}`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      pathToSave,
      filename
    );

    // Only attempt to delete if currentProfilePic exists and is not empty
    if (currentProfilePic && currentProfilePic.trim() !== "") {
      const currentFilePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        pathToSave,
        currentProfilePic?.split("/")[3]
      );
      try {
        access(currentFilePath, () => {
          // console.log('file exists')
        });
        unlink(currentFilePath, () => {
          // console.log('file deleted')
        });
      } catch {
        // File doesn't exist — continue
      }
    }

    await writeFile(filePath, buffer);

    return `/uploads/${pathToSave}/${filename}`;
  } catch (error) {
    throw new Error(`File has not been saved ${error}`);
  }
}

"use server";
import { saveImageToDisk } from "@/helpers/uploadFile";
import UserModel from "@/models/user-model";
import { currentUser, EmailAddress } from "@clerk/nextjs/server";
export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();

    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });

    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }

    const newUserPayload = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      userName: clerkUser?.username,
      email: clerkUser?.emailAddresses[0]?.emailAddress || "",
      profilePicture: clerkUser?.imageUrl || "",
      createdAt: clerkUser?.createdAt || "",
    };

    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const onProfilePictureUpdate = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return { success: false, error: "Missing image or user ID" };
    }

    const getProfilePic = await UserModel.findOne({ _id: userId }).select(
      "profilePicture"
    );

    console.log(getProfilePic, "getprofilePic")
    const currentProfilePic = getProfilePic?.profilePicture || null;

    const imageUrl = await saveImageToDisk(file, currentProfilePic);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error, "error");
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

"use client";
import { useMessage } from "@/context/notification-context";
import { IUserType } from "@/interfaces";
import { createNewChat, createNewGroup } from "@/server-actions/chat";
import { Button, Form, Input, Upload } from "antd";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useSelector } from "react-redux";

const GroupForm = ({ users }: { users: IUserType[] }) => {
  const { currentUserData } = useSelector((state: any) => state.user);
  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();
  const [loading, setLoading] = useState<boolean>();
  const notification = useMessage();
  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      setLoading(true);

      const formData = new FormData();

      const payload = {
        groupName: values.groupName,
        groupBio: values.groupDescription,
        users: [...selectedUsersIds, currentUserData?._id],
        createdBy: currentUserData?._id,
        isGroupChat: true,
        groupProfilePicture: {},
      };

      if (selectedProfilePicture) {
        formData.append("file", selectedProfilePicture as File);
      }
      formData.append("groupName", values.groupName);
      formData.append("groupBio", values.groupDescription);
      formData.append(
        "users",
        JSON.stringify([...selectedUsersIds, currentUserData?._id])
      );
      formData.append("createdBy", currentUserData?._id);
      formData.append("isGroupChat", "true");
      const response = await createNewGroup(formData);
      if (response.error) throw new Error(response.error);
      notification("Group created successfully", "success");
      router.refresh();
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-5">
        <span className="text-sm text-gray-500">
          select users to add to the group
        </span>
        {users?.map((user) => {
          if (user._id === currentUserData?._id) return null;
          return (
            <div key={user._id} className="flex gap-5 items-center">
              <input
                type="checkbox"
                checked={selectedUsersIds.includes(user._id)}
                name={user._id}
                id={user._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsersIds([...selectedUsersIds, user._id]);
                  } else {
                    setSelectedUsersIds(
                      selectedUsersIds.filter((id) => id !== user._id)
                    );
                  }
                }}
              />
              <img
                src={user.profilePicture}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <label className="text-gray-500 text-sm" htmlFor={user._id}>
                {user.name}
              </label>
            </div>
          );
        })}
      </div>
      <div className="">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="groupName"
            label="Group Name"
            rules={[
              {
                required: true,
                message: "Please enter group name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="groupDescription" label="Group Description">
            <Input.TextArea />
          </Form.Item>

          <Upload
            name="groupProfilePicture"
            beforeUpload={(file) => {
              setSelectedProfilePicture(file);
              return false;
            }}
            maxCount={1}
            accept="image/*"
            listType="picture-card"
          >
            <span className="p-5 text-xs">Group Profile Picture</span>
          </Upload>
          <div className="flex justify-end gap-5">
            <Button>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              <span className="text-primary">Create Group</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GroupForm;

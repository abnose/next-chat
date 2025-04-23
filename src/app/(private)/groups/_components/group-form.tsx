"use client";
import { IUserType } from "@/interfaces";
import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const GroupForm = ({ users }: { users: IUserType[] }) => {
  const { currentUserData } = useSelector((state: any) => state.user);
  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();

  const onFinish = () => {};

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
            <Button type="primary" htmlType="submit">
              <span className="text-primary">Create Group</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GroupForm;

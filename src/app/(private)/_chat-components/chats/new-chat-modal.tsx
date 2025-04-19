import { Modal } from "antd";
import React from "react";

const NewChatModal = ({
  showNewChatModal,
  setShowNewChatModal,
}: {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      title={null}
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-primary text-center text-xl font-bol uppercase">
          Create New Chat
        </h1>
      </div>
    </Modal>
  );
};

export default NewChatModal;

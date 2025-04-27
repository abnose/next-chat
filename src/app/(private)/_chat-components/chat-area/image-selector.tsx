import { Modal, Upload } from "antd";

const ImageSelector = ({
  showImageSelector,
  setShowImageSelector,
  selectedImage,
  setSelectedImage,
  onSend,
  loading,
}: {
  showImageSelector: boolean;
  setShowImageSelector: any;
  selectedImage: any;
  setSelectedImage: any;
  onSend: any;
  loading: boolean;
}) => {
  return (
    <Modal
      title="Select Image"
      open={showImageSelector}
      onCancel={() => setShowImageSelector(false)}
      centered
      okText={"Send"}
      okButtonProps={{ disabled: !selectedImage, loading }}
      onOk={() => {
        onSend(selectedImage);
        setShowImageSelector(false);
      }}
    >
      <div className="py-2">
        <Upload
          maxCount={1}
          accept="image/*"
          listType="picture"
          onRemove={() => {
            setSelectedImage(null);
          }}
          beforeUpload={(file) => {
            setSelectedImage(file);
            //   onSend(file);
            //   setShowImageSelector(false);
            return false;
          }}
        >
          {!selectedImage && (
            <span className="text-gray-500">Click To Select An Image</span>
          )}
        </Upload>
      </div>
    </Modal>
  );
};

export default ImageSelector;

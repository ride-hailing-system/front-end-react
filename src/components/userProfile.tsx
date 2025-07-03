import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfile = ({
  firstName,
  lastName,
  photoUrl,
}: {
  firstName: string;
  lastName: string;
  photoUrl: string;
}) => {
  return (
    <div className='flex items-center'>
      {photoUrl ? (
        <Avatar src={photoUrl} size={40} style={{ marginRight: 8 }} />
      ) : (
        <Avatar icon={<UserOutlined />} size={40} style={{ marginRight: 8 }} />
      )}
      <span className='ml-3 text-nowrap'>{`${firstName} ${lastName}`}</span>
    </div>
  );
};

export default UserProfile;

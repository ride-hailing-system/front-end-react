import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const UserProfile = ({
  _id,
  firstName,
  lastName,
  photoUrl,
}: {
  _id?: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
}) => {
  return (
    <Link
      className='flex items-center hover:underline hover:cursor-pointer !text-black'
      to={`/users/${_id ? _id : `${firstName}-${lastName}`}`}
    >
      {photoUrl ? (
        <Avatar src={photoUrl} size={40} style={{ marginRight: 8 }} />
      ) : (
        <Avatar icon={<UserOutlined />} size={40} style={{ marginRight: 8 }} />
      )}
      <span className='ml-3 font-light text-nowrap'>{`${firstName} ${lastName}`}</span>
    </Link>
  );
};

export default UserProfile;

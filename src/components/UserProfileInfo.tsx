import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const UserProfileInfo = ({
  firstName,
  lastName,
  photoUrl,
  phoneNumber,
  email,
  link,
  avatarSize = 40,
  nameStyle,
}: {
  firstName: string;
  lastName: string;
  photoUrl: string;
  phoneNumber?: string;
  email?: string;
  link?: string;
  avatarSize?: number;
  nameStyle?: string;
}) => {
  return link ? (
    <Link className='flex items-center !text-black' to={link}>
      {photoUrl ? (
        <Avatar src={photoUrl} size={avatarSize} style={{ marginRight: 8 }} />
      ) : (
        <Avatar
          icon={<UserOutlined />}
          size={avatarSize}
          style={{ marginRight: 8 }}
        />
      )}
      <span
        className={`ml-3 font-light text-nowrap hover:underline hover:cursor-pointer`}
      >{`${firstName} ${lastName}`}</span>
    </Link>
  ) : (
    <span className='flex items-center !text-black'>
      {photoUrl ? (
        <Avatar src={photoUrl} size={avatarSize} style={{ marginRight: 8 }} />
      ) : (
        <Avatar
          icon={<UserOutlined />}
          size={avatarSize}
          style={{ marginRight: 8 }}
        />
      )}
      <span className='flex flex-col gap-1'>
        <span className={` ${nameStyle}`}>{`${firstName} ${lastName}`}</span>
        {phoneNumber && (
          <span className='ml-3 flex items-center gap-2'>
            <Icon
              icon='mdi:phone-outline'
              width={20}
              height={20}
              className='text-gray-700'
            />
            <span className='text-sm'>{phoneNumber}</span>
          </span>
        )}
        {email && (
          <span className='ml-3 flex items-center gap-2'>
            <Icon
              icon='mdi:email-outline'
              width={20}
              height={20}
              className='text-gray-700'
            />
            <span className='text-sm'>{email}</span>
          </span>
        )}
      </span>
    </span>
  );
};

export default UserProfileInfo;

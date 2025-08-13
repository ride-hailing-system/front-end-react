import { useState, useMemo, useEffect } from 'react';
import { Input } from 'antd';
import { Icon } from '@iconify/react';
import { useLazyQuery } from '@apollo/client';
import { ApolloErrorFormatter } from '../graphql/apolloErrorFormatter';
import toast from 'react-hot-toast';
import { GET_USER_BY_PHONENUMBER } from '../graphql/queries/user';
import { FormatPhoneNumber } from '../utils/formatPhoneNumber';

export type onPhoneNumberInputChangeProps = {
  formatted: string;
  raw: string | undefined;
};

const PhoneNumberInput = ({
  onChange,
  onPressEnter,
  onChecking,
  disabled,
  value = '',
}: {
  onChange: ({ formatted, raw }: onPhoneNumberInputChangeProps) => void;
  onPressEnter: (v: any) => void;
  onChecking: (v: boolean) => void;
  disabled: boolean;
  value: string | undefined;
}) => {
  const [val, setVal] = useState<string | undefined>(value);
  const raw = useMemo(() => val?.replace(/\D/g, ''), [val]);
  const isValid = raw?.length === 9;

  const [getUser, { loading }] = useLazyQuery(GET_USER_BY_PHONENUMBER, {
    onCompleted: (data) => {
      onPressEnter(data.getUserByPhoneNumber);
      if (!data.getUserByPhoneNumber) {
        toast.error(`User not found.`);
      }
    },
    onError: (error: any) => {
      toast.error(ApolloErrorFormatter(error, true).toString());
    },
  });

  useEffect(() => {
    onChecking(loading);
  }, [loading]);

  useEffect(() => {
    const { formatted } = FormatPhoneNumber(value);
    setVal(formatted);
  }, [value]);

  return (
    <>
      <Input
        size="large"
        placeholder="XXX XX XX XX"
        prefix={<span>+251</span>}
        suffix={
          <Icon
            icon="fluent:phone-48-regular"
            className="text-gray-400"
            width={20}
            height={20}
          />
        }
        value={val}
        onChange={(e) => {
          const { formatted, raw } = FormatPhoneNumber(e.target.value);
          setVal(formatted);
          onChange({ formatted: `+251${raw}`, raw });
        }}
        onPressEnter={async () => {
          await getUser({
            variables: { phoneNumber: `+251${raw}` },
          });
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        maxLength={12}
        status={isValid || raw?.length === 0 ? undefined : 'error'}
        disabled={disabled}
        allowClear
      />
    </>
  );
};

export default PhoneNumberInput;

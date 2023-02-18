import {
  Descriptions, Image, Result, Skeleton, Tag
} from 'antd';
import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { userStatusAsResponse } from '../../utils/responseAsStatus';

function UserDetails({ id }) {
  // fetch user-details API data
  const [loading, error, response] = useFetchData(`/api/v1/get-user/${id}`);

  return (
    <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
      {error ? (
        <Result
          title='Failed to fetch'
          subTitle={error}
          status='error'
        />
      ) : (
        <Descriptions title='User Information' bordered>
          <Descriptions.Item label='Avatar' span={3}>
            {response?.data?.avatar ? (
              <Image
                className='!w-[100px] !h-[100px]'
                src={response?.data?.avatar}
                crossOrigin='anonymous'
                alt='user-image'
              />
            ) : 'N/A'}
          </Descriptions.Item>

          <Descriptions.Item label='Full Name'>
            {response?.data?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label='User Name' span={2}>
            {response?.data?.userName}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>
            {response?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label='Phone' span={2}>
            {response?.data?.phone}
          </Descriptions.Item>

          <Descriptions.Item label='Role'>
            <Tag
              className='w-[60px] text-center uppercase'
              color={response?.data?.role === 'admin' ? 'magenta' : 'purple'}
            >
              {response?.data?.role}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label='Status' span={2}>
            <Tag
              className='w-[70px] text-center uppercase'
              color={userStatusAsResponse(response?.data?.status).color}
            >
              {userStatusAsResponse(response?.data?.status).level}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label='Verified'>
            <Tag
              className='w-[50px] text-center uppercase'
              color={response?.data?.verified ? 'success' : 'error'}
            >
              {response?.data?.verified ? 'Yes' : 'No'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label='Registration Date' span={2}>
            {response?.data?.createdAt?.split('T')[0]}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Skeleton>
  );
}

export default React.memo(UserDetails);

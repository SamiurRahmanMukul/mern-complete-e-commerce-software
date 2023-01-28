import React from 'react';
import Avatar from '../../assets/images/avatar.png';
import { getSessionUser } from '../../utils/authentication';

function LoginBox() {
  const user = getSessionUser();

  return (
    <div className='logo-box'>
      <img
        crossOrigin='anonymous'
        className='w-[50px] h-auto rounded-full'
        src={user?.avatar || Avatar}
        alt='avatar-img'
      />
      <h2 className='user-name'>
        {user?.fullName}
      </h2>
    </div>
  );
}

export default LoginBox;

import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  window.document.title = 'MYM Mart — Error';

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <Result
        className='font-text-font font-medium'
        status='404'
        title='404 - Error Page!'
        subTitle='Sorry, the page you visited does not exist.'
        extra={(
          <Link to='/dashboard/main'>
            <Button
              type='primary'
              shape='round'
              size='large'
            >
              Back To Dashboard
            </Button>
          </Link>
        )}
      />
    </div>
  );
}

export default Error;

import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
  window.document.title = 'MYM-Mart — Not Found';

  return (
    <div className='flex h-screen justify-center items-center'>
      <Result
        status='404'
        title='404 - Not Found!'
        subTitle='Sorry, the page you visited does not exist.'
        extra={(
          <Link to='/'>
            <Button
              type='primary'
              shape='round'
              size='large'
            >
              Back To Home
            </Button>
          </Link>
        )}
      />
    </div>
  );
}

export default NotFound;

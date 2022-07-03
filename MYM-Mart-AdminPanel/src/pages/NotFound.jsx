import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  window.document.title = "MYM-Mart — Not Found";

  return (
    <div className="flex h-screen justify-center items-center">
      <Result
        status="404"
        title="404 - Not Found!"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/admin">
            <Button type="primary">Back To Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;

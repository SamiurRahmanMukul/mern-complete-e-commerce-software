import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Result
      className="h-screen pt-20"
      status="404"
      title="404 - Not Found!"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/admin">
          <Button type="primary">Back To Dashboard</Button>
        </Link>
      }
    />
  );
};

export default NotFound;

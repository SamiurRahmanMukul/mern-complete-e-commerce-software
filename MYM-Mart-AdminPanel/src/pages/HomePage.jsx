import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const HomePage = () => {
  window.document.title = "MYM-Mart — Home";

  return (
    <div className="flex h-screen justify-center items-center">
      <Result
        icon={<SmileOutlined />}
        title="Welcome to MYM-Mart AdminPanel!"
        extra={
          <Link to="/admin">
            <Button type="primary">Go To Dashboard</Button>
          </Link>
        }
      />
    </div>
  );
};

export default HomePage;

import { Button, Input, Select, Tag } from "antd";
import Avatar from "../../assets/images/avatar.png";
const { Option } = Select;
const { Search } = Input;

const Users = () => {
  return (
    <div className="min-h-[68vh]">
      <div className="flex flex-row flex-wrap items-center justify-between mb-2">
        <div>
          <Button type="primary" size="middle" className="mr-2 mb-2">
            ADD NEW USER
          </Button>

          <Select defaultValue="Select Role By Sort">
            <Option value="jack">Admin</Option>
            <Option value="lucy">Users</Option>
          </Select>
        </div>

        <Search placeholder="input search text" allowClear enterButton="Search" size="middle" className="w-auto" />
      </div>

      <table className="w-full">
        {/* TABLE HEAD */}
        <thead className="bg-primaryColor">
          <tr>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Image</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Name</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Email</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Phone</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Address</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Status</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Role</th>
            <th className="text-left p-1 text-textColorWhite text-[14px] font-medium">Actions</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          <tr>
            <td className="text-left p-1">
              <img src={Avatar} alt="category_image" className="w-[25px] h-[25px] rounded-full" />
            </td>
            <td className="text-left p-1 text-[16px] capitalize">Samiur Rahman</td>
            <td className="text-left p-1 text-[16px]">mukul@mail.com</td>
            <td className="text-left p-1 text-[16px]">01641-861442</td>
            <td className="text-left p-1 text-[16px] capitalize">ABC Road, Dhaka</td>
            <td className="text-left p-1 text-[16px] capitalize">
              <Tag color="green" className="text-md uppercase">
                Login
              </Tag>
            </td>
            <td className="text-left p-1 text-[16px] capitalize">
              <Tag color="magenta" className="text-md uppercase">
                Admin
              </Tag>
            </td>
            <td className="text-left p-1">
              <Button type="primary" size="small">
                UPDATE
              </Button>
              <Button type="default" size="small" danger className="ml-2">
                DELETE
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;

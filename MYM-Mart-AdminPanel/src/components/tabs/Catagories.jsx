import { Button, Input, Skeleton } from "antd";
import useFetchApiData from "../../hooks/useFetchApiData";
const { Search } = Input;

const Catagories = () => {
  const url = process.env.REACT_APP_API_BASE_URL + "/api/v1/categories";
  const { loading, data, error } = useFetchApiData(url);

  return (
    <div className="min-h-[68vh]">
      <div className="flex flex-row items-center justify-between mb-2">
        <Button type="primary" size="middle">
          ADD NEW CATEGORY
        </Button>

        <Search placeholder="input search text" allowClear enterButton="Search" size="middle" className="w-[40%]" />
      </div>

      {loading === true ? (
        <Skeleton
          paragraph={{
            rows: 10,
          }}
          avatar
          active
        />
      ) : error ? (
        <h1 className="mt-10 text-center text-4xl text-errorColor">{error?.message}</h1>
      ) : (
        <table className="w-full">
          {/* TABLE HEAD */}
          <thead className="bg-primaryColor">
            <tr>
              <th className="text-left p-1 text-textColorWhite text-[16px] font-medium">Image</th>
              <th className="text-left p-1 text-textColorWhite text-[16px] font-medium">Category Name</th>
              <th className="text-left p-1 text-textColorWhite text-[16px] font-medium">Catagories Products</th>
              <th className="text-left p-1 text-textColorWhite text-[16px] font-medium">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          {data &&
            data.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td className="text-left p-1">
                    <img src={item?.image} alt="category_image" className="w-[40px] h-[40px] rounded-full" />
                  </td>
                  <td className="text-left p-1 text-[18px] capitalize">{item?.name}</td>
                  <td className="text-left p-1">
                    <Button type="default" size="middle">
                      VIEW PRODUCTS
                    </Button>
                  </td>
                  <td className="text-left p-1">
                    <Button type="primary" size="middle">
                      UPDATE
                    </Button>
                    <Button type="default" size="middle" danger className="ml-2">
                      DELETE
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      )}
    </div>
  );
};

export default Catagories;

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Modal, Skeleton } from "antd";
import { useEffect, useState } from "react";
import useFetchApiData from "../../hooks/useFetchApiData";
import openNotificationWithIcon from "../../utils/andNotification";
import { getSessionToken } from "../../utils/helperCommon";
const { confirm } = Modal;
const { Search } = Input;

const Catagories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryUploadedFile, setCategoryUploadedFile] = useState(null);
  const [categoryUploadedTitle, setCategoryUploadedTitle] = useState(null);
  const [categoryUploadedError, setCategoryUploadedError] = useState(null);
  const [categoryReload, setCategoryReload] = useState(false);

  // category list api data fetch
  const url = process.env.REACT_APP_API_BASE_URL + "/api/v1/categories";
  const { loading, data, error } = useFetchApiData(url, categoryReload);

  // make a function to handle create new category
  const handleAddNewCategory = async () => {
    if (categoryUploadedFile === null) {
      setCategoryUploadedError("Uploaded file filed is required");
    } else if (categoryUploadedTitle === null) {
      setCategoryUploadedError("Category title filed is required");
    } else {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getSessionToken());

        var formdata = new FormData();
        formdata.append("name", categoryUploadedTitle);
        formdata.append("image", categoryUploadedFile);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/api/v1/categories/new", requestOptions);
        const JsonData = await response.json();

        if (JsonData.statusCode === 201) {
          openNotificationWithIcon("success", "Category Create", JsonData.message);
          setCategoryUploadedError(null);
          setCategoryUploadedFile(null);
          setCategoryUploadedTitle(null);
          setCategoryReload(!categoryReload);
          setIsModalVisible(false);
        } else {
          setCategoryUploadedError(JsonData.message);
        }
      } catch (err) {
        setCategoryUploadedError(err.message);
      }
    }
  };
  const handleAddNewCategoryModalCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setCategoryUploadedError(null);
    }, 5000);
  }, [categoryUploadedError]);

  // make a function to handle delete category
  const handleDeleteCategory = (id) => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getSessionToken());

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(process.env.REACT_APP_API_BASE_URL + "/api/v1/categories/" + id, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.statusCode === 200) {
              openNotificationWithIcon("success", "Category Delete", result.message);
              setCategoryReload(!categoryReload);
            } else {
              openNotificationWithIcon("error", "Category Delete", result.message);
            }
          })
          .catch((err2) => {
            openNotificationWithIcon("error", "Category Delete", err2.message);
          });
      },
    });
  };

  return (
    <>
      <div className="min-h-[68vh]">
        <div className="flex flex-row items-center justify-between mb-2">
          <Button type="primary" size="middle" onClick={() => setIsModalVisible(true)}>
            ADD NEW CATEGORY
          </Button>

          <Search placeholder="input search text" allowClear enterButton="Search" size="middle" className="w-[40%]" />
        </div>

        {loading === true ? (
          <Skeleton
            paragraph={{
              rows: 6,
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
                      <Button type="default" size="middle" danger className="ml-2" onClick={() => handleDeleteCategory(item.id)}>
                        DELETE
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        )}
      </div>

      {/* ADD NEW CATEGORY MODAL */}
      <Modal title="Add New Category" visible={isModalVisible} onOk={handleAddNewCategory} onCancel={handleAddNewCategoryModalCancel}>
        {categoryUploadedError && <Alert message={categoryUploadedError} type="error" className="!text-center mb-4" />}

        {categoryUploadedFile && <img src={URL.createObjectURL(categoryUploadedFile)} alt="upload_img" className="w-[200px] h-[180px] ml-[28%] mb-2" />}

        <Input type="file" name="category_img" accept="image/jpg, image/jpeg, image/png" onChange={(e) => setCategoryUploadedFile(e.target.files[0])} />

        <Input type="text" name="category_title" placeholder="Input here category title" className="mt-4" value={categoryUploadedTitle} onChange={(e) => setCategoryUploadedTitle(e.target.value)} />
      </Modal>
    </>
  );
};

export default Catagories;

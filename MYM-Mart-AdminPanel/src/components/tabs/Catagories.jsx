import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Modal, Pagination, Skeleton } from "antd";
import { useEffect, useState } from "react";
import useFetchApiData from "../../hooks/useFetchApiData";
import openNotificationWithIcon from "../../utils/common/andNotification";
import { getSessionToken } from "../../utils/helpers/helperAuthentication";
import jwtEncodeUrl from "../../utils/helpers/helperJwtEncoder";
const { confirm } = Modal;
const { Search } = Input;

const Catagories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdatedModalVisible, setIsUpdatedModalVisible] = useState(false);
  const [categoryUploadedFile, setCategoryUploadedFile] = useState(null);
  const [categoryUploadedTitle, setCategoryUploadedTitle] = useState(null);
  const [categoryUploadedError, setCategoryUploadedError] = useState(null);
  const [categoryUpdatedFile, setCategoryUpdatedFile] = useState(null);
  const [categoryUpdatedTitle, setCategoryUpdatedTitle] = useState(null);
  const [categoryUpdatedError, setCategoryUpdatedError] = useState(null);
  const [isSelectedUpdatedFile, setIsSelectedUpdatedFile] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchAgain, setFetchAgain] = useState(false);

  // category list api data fetch
  const url = process.env.REACT_APP_API_BASE_URL + `/categories?keyword=${searchKeyword}&limit=9&page=${pageNumber}`;
  const { loading, response, error } = useFetchApiData(url, fetchAgain);

  // make a function to handle create new category
  const handleAddNewCategory = async () => {
    if (categoryUploadedFile === null) {
      setCategoryUploadedError("Uploaded file filed is required");
    } else if (categoryUploadedTitle === null) {
      setCategoryUploadedError("Category title filed is required");
    } else {
      const url2 = process.env.REACT_APP_API_BASE_URL + "/categories/new";
      const token2 = await jwtEncodeUrl(url2);

      try {
        let myHeaders = new Headers();
        myHeaders.append("X_Ecommymmart", token2);
        myHeaders.append("Authorization", "Bearer " + getSessionToken());

        let formdata = new FormData();
        formdata.append("name", categoryUploadedTitle);
        formdata.append("image", categoryUploadedFile);

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        const res2 = await fetch(url2, requestOptions);
        const JsonData2 = await res2.json();

        if (JsonData2.statusCode === 201) {
          openNotificationWithIcon("success", "Category Create", JsonData2.message);
          setCategoryUploadedError(null);
          setCategoryUploadedFile(null);
          setCategoryUploadedTitle(null);
          setFetchAgain(!fetchAgain);
          setIsModalVisible(false);
        } else {
          setCategoryUploadedError(JsonData2.message);
        }
      } catch (err) {
        setCategoryUploadedError(err.message);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCategoryUploadedError(null);
      setCategoryUpdatedError(null);
    }, 5000);
  }, [categoryUploadedError, categoryUpdatedError]);

  // make a function to handle delete category
  const handleDeleteCategory = async (id) => {
    const url3 = process.env.REACT_APP_API_BASE_URL + "/categories/" + id;
    const token3 = await jwtEncodeUrl(url3);

    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        let myHeaders = new Headers();
        myHeaders.append("X_Ecommymmart", token3);
        myHeaders.append("Authorization", "Bearer " + getSessionToken());

        let requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(url3, requestOptions)
          .then((res3) => res3.json())
          .then((result) => {
            if (result.statusCode === 200) {
              openNotificationWithIcon("success", "Category Delete", result.message);
              setFetchAgain(!fetchAgain);
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

  // make a function to handle update category
  const handleUpdatedCategory = async (id) => {
    // get the category data from the server
    const url4 = process.env.REACT_APP_API_BASE_URL + "/categories/" + id;
    const token4 = await jwtEncodeUrl(url4);

    let myHeaders = new Headers();
    myHeaders.append("X_Ecommymmart", token4);
    myHeaders.append("Authorization", `Bearer ${token4}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const res4 = await fetch(url4, requestOptions);
      const jsonData4 = await res4.json();

      if (jsonData4.statusCode === 200 && jsonData4.data) {
        setCategoryUpdatedFile(jsonData4.data.image);
        setCategoryUpdatedTitle(jsonData4.data.name);
        setIsUpdatedModalVisible(true);
        setCategoryId(id);
      } else {
        openNotificationWithIcon("error", "Category Fetching", jsonData4.message);
      }
    } catch (err2) {
      console.log("error", err2);
      openNotificationWithIcon("error", "Category Fetching", err2.message);
    }
  };

  // make a function to confirm update category
  const handleConfirmUpdateCategory = async () => {
    const url5 = process.env.REACT_APP_API_BASE_URL + "/categories/" + categoryId;
    const token5 = await jwtEncodeUrl(url5);

    let myHeaders = new Headers();
    myHeaders.append("X_Ecommymmart", token5);
    myHeaders.append("Authorization", "Bearer " + getSessionToken());

    let formdata = new FormData();
    formdata.append("name", categoryUpdatedTitle);
    formdata.append("image", categoryUpdatedFile);

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response5 = await fetch(url5, requestOptions);
      const jsonData5 = await response5.json();

      if (jsonData5.statusCode === 200 && jsonData5.data) {
        openNotificationWithIcon("success", "Category Update", jsonData5.message);
        setCategoryUpdatedError(null);
        setCategoryUpdatedFile(null);
        setCategoryUpdatedTitle(null);
        setIsSelectedUpdatedFile(false);
        setFetchAgain(!fetchAgain);
        setCategoryId(null);
        setIsUpdatedModalVisible(false);
      } else {
        setCategoryUpdatedError(jsonData5.message);
      }
    } catch (err2) {
      console.log("error", err2);
      setCategoryUpdatedError(err2.message);
    }
  };

  // reset pageNumber state when category searching
  useEffect(() => {
    setPageNumber(1);
  }, [searchKeyword]);

  return (
    <>
      <div className="min-h-[68vh]">
        <div className="flex flex-row items-center justify-between mb-2">
          <Button type="primary" size="middle" onClick={() => setIsModalVisible(true)}>
            ADD NEW CATEGORY
          </Button>

          <Search placeholder="Type here to searching categories" allowClear enterButton="Search" size="middle" className="w-[40%]" onChange={(e) => setSearchKeyword(e.target.value)} />
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
          <h1 className="mt-10 text-center text-2xl text-errorColor">{error?.message}</h1>
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
            {response.data && response.data.length > 0 ? (
              response.data.map((item, index) => (
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
                      <Button type="primary" size="middle" onClick={() => handleUpdatedCategory(item.id)}>
                        UPDATE
                      </Button>
                      <Button type="default" size="middle" danger className="ml-2" onClick={() => handleDeleteCategory(item.id)}>
                        DELETE
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td className="text-center text-2xl text-errorColor py-4" colSpan={4}>
                    No category found!
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        )}

        {/* PAGINATION */}
        {response?.numOfPages && (
          <Pagination
            className="flex items-center justify-center my-2"
            defaultCurrent={pageNumber}
            total={response?.numOfPages * 10}
            onChange={(e) => {
              setPageNumber(e);
            }}
          />
        )}
      </div>

      {/* ADD NEW CATEGORY MODAL */}
      <Modal title="Add New Category" visible={isModalVisible} onOk={handleAddNewCategory} onCancel={() => setIsModalVisible(false)}>
        {categoryUploadedError && <Alert message={categoryUploadedError} type="error" className="!text-center mb-4" />}

        {categoryUploadedFile && <img src={URL.createObjectURL(categoryUploadedFile)} alt="upload_img" className="w-[200px] h-[180px] ml-[28%] mb-2" />}

        <Input type="file" name="category_img" accept="image/jpg, image/jpeg, image/png" onChange={(e) => setCategoryUploadedFile(e.target.files[0])} />

        <Input type="text" name="category_title" placeholder="Input here category title" className="mt-4" value={categoryUploadedTitle} onChange={(e) => setCategoryUploadedTitle(e.target.value)} />
      </Modal>

      {/* UPDATED CATEGORY MODAL */}
      <Modal
        title="Updated Category"
        visible={isUpdatedModalVisible}
        onOk={handleConfirmUpdateCategory}
        onCancel={() => {
          setIsUpdatedModalVisible(false);
          setIsSelectedUpdatedFile(false);
        }}>
        {categoryUpdatedError && <Alert message={categoryUpdatedError} type="error" className="!text-center mb-4" />}

        {categoryUpdatedFile && <img src={isSelectedUpdatedFile ? URL.createObjectURL(categoryUpdatedFile) : categoryUpdatedFile} alt="upload_img" className="w-[200px] h-[180px] ml-[28%] mb-2" />}

        <Input
          type="file"
          name="category_img"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => {
            setCategoryUpdatedFile(e.target.files[0]);
            setIsSelectedUpdatedFile(true);
          }}
        />

        <Input type="text" name="category_title" placeholder="Input here category title" className="mt-4" value={categoryUpdatedTitle} onChange={(e) => setCategoryUpdatedTitle(e.target.value)} />
      </Modal>
    </>
  );
};

export default Catagories;

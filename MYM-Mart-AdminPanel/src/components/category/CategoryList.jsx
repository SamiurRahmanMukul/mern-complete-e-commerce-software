import { SearchOutlined } from '@ant-design/icons';
import {
  Button, Empty, Input, Result, Select, Skeleton
} from 'antd';
import React, { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';

const { Option } = Select;

function CategoryList() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, error, response] = useFetchData(`${process.env.REACT_APP_API_BASE_URL}/categories?keyword=${searchKeyword}&limit=${limit}&page=${page}&sort=${sortType}`);

  // reset page number when searching
  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  return (
    <Skeleton loading={loading} active paragraph={{ rows: 10 }}>
      {error ? (
        <Result
          status='error'
          title='Fetching Error'
          subTitle={error}
        />
      ) : (
        <div>
          {/* SEARCH BOX & FILTERS */}
          <div className='search-and-filter-box'>
            <Input
              className='space-x-4'
              placeholder='Type here to Search Categories'
              prefix={<SearchOutlined />}
              size='large'
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <Select
              className='w-full sm:w-[240px]'
              placeholder='-- show rows --'
              size='large'
              onChange={(value) => setLimit(value)}
            >
              <Option value='10'>10 Rows</Option>
              <Option value='20'>20 Rows</Option>
              <Option value='30'>30 Rows</Option>
              <Option value='40'>40 Rows</Option>
              <Option value='50'>50 Rows</Option>
            </Select>

            <Select
              className='w-full sm:w-[240px]'
              placeholder='-- select type to sort --'
              size='large'
              onChange={(value) => setSortType(value)}
            >
              <Option value='asc'>Sort By Ascending</Option>
              <Option value='dsc'>Sort By Descending</Option>
            </Select>
          </div>

          {/* TRANSACTIONS LIST */}
          {response && !response.data.length > 0 ? (
            <Empty
              className='mt-10'
              description={(
                <span>Sorry! Categories data was not found.</span>
            )}
            />
          ) : (
            <div className='w-full shadow bg-white rounded my-3'>
              <div className='border-gray-200 w-full rounded bg-white overflow-x-auto'>
                <table className='w-full leading-normal '>
                  {/* TABLE HEADER */}
                  <thead className='table-thead border-gray border-gray-200 border-b-2'>
                    <tr className='border-b border-gray'>
                      <th
                        scope='col'
                        className='table-thead-th text-gray-dark border-gray border-gray-200 uppercase tracking-wider whitespace-nowrap'
                      >
                        IMAGE
                      </th>
                      <th
                        scope='col'
                        className='table-thead-th text-gray-dark border-gray border-gray-200 uppercase tracking-wider whitespace-nowrap'
                      >
                        CATEGORY NAME
                      </th>
                      <th
                        scope='col'
                        className='table-thead-th text-gray-dark border-gray border-gray-200 uppercase tracking-wider whitespace-nowrap'
                      >
                        CATEGORIES PRODUCTS
                      </th>
                      <th
                        scope='col'
                        className='table-thead-th text-gray-dark border-gray border-gray-200 uppercase tracking-wider whitespace-nowrap'
                      >
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  {/* DATA MAPPING ON TABLE BODY */}
                  {response && response.data.map((data) => (
                    <tbody key={data.id}>
                      <tr className='table-body-tr'>
                        <td className='table-body-td'>
                          <img
                            className='w-[40px] h-[40px] rounded-full'
                            alt='category_image'
                            src={data.image}
                          />
                        </td>
                        <td className='table-body-td'>{data.name}</td>
                        <td className='table-body-td'>
                          <Button type='dashed' size='middle'>VIEW PRODUCTS</Button>
                        </td>
                        <td className='table-body-td space-x-2'>
                          <Button type='primary' size='middle'>UPDATE</Button>
                          <Button type='default' size='middle' danger>DELETE</Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </Skeleton>
  );
}

export default CategoryList;

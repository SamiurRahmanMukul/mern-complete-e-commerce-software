import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import AddCategory from '../category/AddCategory';
import CategoriesProducts from '../category/CategoriesProducts';
import CategoryList from '../category/CategoryList';

const { TabPane } = Tabs;

function Categories() {
  const newTabIndex = useRef(0);

  // tab click to change active key
  const onChange = (key) => {
    setActiveKey(key);
  };

  // function to add new tab
  const add = (id) => {
    const newActiveKey = `NewTab${newTabIndex.current + 1}`;
    setPanes([
      ...panes,
      {
        title: 'Categories Products',
        content: <CategoriesProducts id={id} />,
        key: newActiveKey
      }
    ]);
    setActiveKey(newActiveKey);
  };

  // dynamic tab default pane
  const defaultPanes = Array.from({ length: 1 }).map((_, index) => {
    const x = String(index + 1);

    return {
      key: x,
      title: 'Categories List',
      content: <CategoryList add={add} />
    };
  });

  // tab initial states
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [panes, setPanes] = useState(defaultPanes);

  // function to removed tab
  const remove = (targetKey) => {
    const targetIndex = panes.findIndex((pane) => pane.key === targetKey);
    const newPanes = panes.filter((pane) => pane.key !== targetKey);

    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }

    setPanes(newPanes);
  };

  // function to tabs actions controller
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      className='min-h-[68vh]'
      type='editable-card'
      onEdit={onEdit}
      onChange={onChange}
      activeKey={activeKey}
      tabBarExtraContent={(
        <Button
          className='inline-flex items-center'
          icon={<PlusSquareOutlined />}
          type='default'
          size='large'
          onClick={() => { setActiveKey('100'); }}
        >
          Add Category
        </Button>
          )}
      size='large'
      hideAdd
    >
      {panes.map((pane) => (
        <TabPane key={pane.key} tab={pane.title} closable={pane.key !== '1'}>
          {pane.content}
        </TabPane>
      ))}

      {activeKey === '100' && (
        <TabPane key='100' tab='Add Category' closable={activeKey !== '100'}>
          <AddCategory />
        </TabPane>
      )}
    </Tabs>
  );
}

export default Categories;

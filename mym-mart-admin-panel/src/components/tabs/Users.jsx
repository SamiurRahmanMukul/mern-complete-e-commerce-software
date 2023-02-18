import { Tabs } from 'antd';
import React, { useRef, useState } from 'react';
import UserDetails from '../users/UserDetails';
import UsersList from '../users/UsersList';

function Users() {
  // function to create new tab pane
  const add = (id) => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([
      ...items,
      {
        key: newActiveKey,
        label: 'User Details',
        children: <UserDetails id={id} />
      }
    ]);
    setActiveKey(newActiveKey);
  };

  // default tab pane and component
  const defaultPanes = new Array(1).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: 'Users List',
    children: <UsersList add={add} />,
    closable: false
  }));

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  // function to removed a tab pane
  const remove = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  // function to edit tab components
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      className='m-2'
      onChange={(key) => setActiveKey(key)}
      activeKey={activeKey}
      type='editable-card'
      onEdit={onEdit}
      items={items}
      size='large'
      hideAdd
    />
  );
}

export default React.memo(Users);

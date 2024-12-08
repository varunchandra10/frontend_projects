import React from "react";
import { Input, Select, Space } from "antd";
import "./searchBar.css";

const { Option } = Select;
const { Search } = Input;

const SearchBar = ({
  placeholder = "Search...",
  onSearch,
  statusFilter = false,
  onStatusChange,
  permissionFilter = false,
  onPermissionChange,
}) => {
  return (
    <Space className="search-bar">
      <Search
        placeholder={placeholder}
        allowClear
        onSearch={onSearch}
        enterButton
      />
      {statusFilter && (
        <Select
          placeholder="Filter by Status"
          onChange={onStatusChange}
          allowClear
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      )}
      {permissionFilter && (
        <Select
          mode="multiple"
          placeholder="Filter by Permissions"
          onChange={onPermissionChange}
          allowClear
        >
          <Option value="Read">Read</Option>
          <Option value="Write">Write</Option>
          <Option value="Delete">Delete</Option>
        </Select>
      )}
    </Space>
  );
};

export default SearchBar;

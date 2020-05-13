import * as React from "react";
import arrayTreeFilter from "array-tree-filter";
import { CascaderOption, CascaderFieldNames } from "./Cascader";
import {
  EllipsisOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  FileOutlined,
  FolderOutlined,
  DoubleRightOutlined
} from "@ant-design/icons";
import { Popover, message, Button, Menu, Popconfirm, Input } from "antd";
const { SubMenu } = Menu;

interface MenusProps {
  value?: string[];
  activeValue?: string[];
  options?: CascaderOption[];
  prefixCls?: string;
  expandTrigger?: string;
  onSelect?: (
    targetOption: string[],
    index: number,
    e: React.KeyboardEvent<HTMLElement>
  ) => void;
  visible?: boolean;
  dropdownMenuColumnStyle?: React.CSSProperties;
  defaultFieldNames?: CascaderFieldNames;
  fieldNames?: CascaderFieldNames;
  expandIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  onItemDoubleClick?: (
    targetOption: string[],
    index: number,
    e: React.MouseEvent<HTMLElement>
  ) => void;
}

interface MenuItems {
  [index: number]: HTMLLIElement;
}
class Menus extends React.Component<MenusProps> {
  menuItems: MenuItems = {};

  delayTimer: number;
  state = {
    popVisible: false
  };
  static defaultProps: MenusProps = {
    options: [],
    value: [],
    activeValue: [],
    onSelect() {},
    prefixCls: "rc-cascader-menus",
    visible: false,
    expandTrigger: "click"
  };

  componentDidMount() {
    this.scrollActiveItemToView();
  }

  componentDidUpdate(prevProps: MenusProps) {
    if (!prevProps.visible && this.props.visible) {
      this.scrollActiveItemToView();
    }
  }
  setVisiblePOP() {
    this.setState({ popVisible: true });
  }
  getFieldName(name) {
    const { fieldNames, defaultFieldNames } = this.props;
    // 防止只设置单个属性的名字
    return fieldNames[name] || defaultFieldNames[name];
  }

  getOption(option: CascaderOption, menuIndex: number) {
    const { prefixCls, expandTrigger, expandIcon, loadingIcon } = this.props;
    const onSelect = this.props.onSelect.bind(this, option, menuIndex);
    const onItemDoubleClick = this.props.onItemDoubleClick.bind(
      this,
      option,
      menuIndex
    );
    let expandProps: any = {
      onClick: onSelect,
      onDoubleClick: onItemDoubleClick
    };
    let menuItemCls = `${prefixCls}-menu-item`;
    let expandIconNode = null;
    let iconBeforeText = <FileOutlined style={{ marginRight: "10px" }} />;
    const hasChildren =
      option[this.getFieldName("children")] &&
      option[this.getFieldName("children")].length > 0;
    if (hasChildren || option.isLeaf === false) {
      menuItemCls += ` ${prefixCls}-menu-item-expand`;
      if (!option.loading) {
        iconBeforeText = <FolderOutlined style={{ marginRight: "10px" }} />;
        expandIconNode = (
          <span className={`${prefixCls}-menu-item-expand-icon`}>
            <DoubleRightOutlined />
          </span>
        );
      }
    }
    if (expandTrigger === "hover" && (hasChildren || option.isLeaf === false)) {
      expandProps = {
        onMouseEnter: this.delayOnSelect.bind(this, onSelect),
        onMouseLeave: this.delayOnSelect.bind(this),
        onClick: onSelect
      };
    }
    if (this.isActiveOption(option, menuIndex)) {
      menuItemCls += ` ${prefixCls}-menu-item-active`;
      expandProps.ref = this.saveMenuItem(menuIndex);
    }
    if (option.disabled) {
      menuItemCls += ` ${prefixCls}-menu-item-disabled`;
    }

    let loadingIconNode = null;
    if (option.loading) {
      menuItemCls += ` ${prefixCls}-menu-item-loading`;
      loadingIconNode = loadingIcon || null;
    }

    let title = "";
    if ("title" in option) {
      // eslint-disable-next-line prefer-destructuring
      title = option.title;
    } else if (typeof option[this.getFieldName("label")] === "string") {
      title = option[this.getFieldName("label")];
    }

    return (
      <li
        key={option[this.getFieldName("value")]}
        className={menuItemCls}
        title={title}
        {...expandProps}
        role="menuitem"
        onMouseDown={e => e.preventDefault()}
      >
        {iconBeforeText}
        {option[this.getFieldName("label")]}
        {expandIconNode}
        {loadingIconNode}
      </li>
    );
  }

  getActiveOptions(values?: CascaderOption[]): CascaderOption[] {
    const { options } = this.props;
    const activeValue = values || this.props.activeValue;
    return arrayTreeFilter(
      options,
      (o, level) => o[this.getFieldName("value")] === activeValue[level],
      { childrenKeyName: this.getFieldName("children") }
    );
  }

  getShowOptions(): CascaderOption[][] {
    const { options } = this.props;
    const result = this.getActiveOptions()
      .map(activeOption => activeOption[this.getFieldName("children")])
      .filter(activeOption => !!activeOption);
    result.unshift(options);
    return result;
  }

  delayOnSelect(onSelect, ...args) {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (typeof onSelect === "function") {
      this.delayTimer = window.setTimeout(() => {
        onSelect(args);
        this.delayTimer = null;
      }, 150);
    }
  }

  scrollActiveItemToView() {
    // scroll into view
    const optionsLength = this.getShowOptions().length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < optionsLength; i++) {
      const itemComponent = this.menuItems[i];
      if (itemComponent && itemComponent.parentElement) {
        itemComponent.parentElement.scrollTop = itemComponent.offsetTop;
      }
    }
  }

  isActiveOption(option, menuIndex) {
    const { activeValue = [] } = this.props;
    return activeValue[menuIndex] === option[this.getFieldName("value")];
  }

  saveMenuItem = index => node => {
    console.log(index);
    this.menuItems[index] = node;
    console.log(node);
  };
  confirm = () => {
    console.log("hiiii");
    this.saveMenuItem(3);
  };
  getFolderName = e => {
    console.log(e.target.value);
  };

  render() {
    const { prefixCls, dropdownMenuColumnStyle } = this.props;
    console.log(this.state.popVisible, this.setVisiblePOP);
    const FolderText = (
      <>
        <b>New Folder</b>
        <Input
          placeholder="Enter Folder name"
          allowClear
          onChange={this.getFolderName}
        />
      </>
    );
    const FileText = (
      <>
        <b>New Query</b>
        <Input
          style={{ margin: "10px 0px 10px" }}
          placeholder="Enter Query Title"
          allowClear
        />
        <Input placeholder="Enter Query" allowClear />
      </>
    );
    const content = (
      <div>
        <ul style={{ listStyle: "none", marginLeft: "-39px" }}>
          <li className="popover-hovereffect">
            <FolderAddOutlined style={{ marginRight: "7px" }} /> Add Folder
          </li>
          <li className="popover-hovereffect">
            <FileAddOutlined style={{ marginRight: "7px" }} />
            Add Query
          </li>
        </ul>
      </div>
    );
    return (
      <div>
        {this.getShowOptions().map((options, menuIndex) => (
          <ul
            className={`${prefixCls}-menu`}
            key={menuIndex}
            style={dropdownMenuColumnStyle}
          >
            <div
              className="list-container"
              style={{ maxHeight: "220px", overflow: "auto" }}
            >
              {options.map(option => this.getOption(option, menuIndex))}
            </div>

            <div className="icons-list addicon-style">
              {/* <Popconfirm
                placement="bottom"
                title={'Add query'}
                // onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              > */}
              New{" "}
              {/* <Popover
                style={{ maxHeight: "30px", minHeight: "30px" }}
                placement="rightTop"
                content={content}
                trigger="click"
              > */}
              <span
                style={{
                  position: "absolute",
                  fontSize: "15px",
                  color: "#555",
                  right: "10px",
                  lineHeight: "24px"
                }}
              >
                <Popconfirm
                  placement="bottom"
                  title={FolderText}
                  cancelText={""}
                  onConfirm={this.confirm}
                  icon={null}
                  okText="Save"
                >
                  <FolderAddOutlined style={{ marginRight: "10px" }} />
                </Popconfirm>
                <Popconfirm
                  placement="bottom"
                  title={FileText}
                  cancelText={""}
                  // onConfirm={confirm}
                  okText="Save"
                  icon={null}
                >
                  <FileAddOutlined />
                </Popconfirm>
              </span>
              {/* <EllipsisOutlined
                  style={{
                    position: "absolute",
                    fontSize: "15px",
                    color: "#555",
                    right: "16px",
                    lineHeight: "24px"
                  }}
                /> */}
              {/* </Popover> */}
              {/* </Popconfirm> */}
            </div>
          </ul>
        ))}
      </div>
    );
  }
}

export default Menus;

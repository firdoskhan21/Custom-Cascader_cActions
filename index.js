import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import Cascader from "./src";
import "./assest/index.css";
import { Select, Divider, Input, Modal, Form, Table } from "antd";
import { PlusOutlined, DoubleRightOutlined } from "@ant-design/icons";

let index = 0;

class App extends React.Component {
  state = {
    items: ["jack", "lucy"],
    name: "",
    SelectedQuery: {},
    inputValue: "",
    visiblepopover: false,
    visible: false,
    options: [
      {
        value: "src1",
        label: "src1",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
                children: [
                  {
                    value: "xihu",
                    label: "West Lake"
                  }
                ]
              }
            ]
          },
          {
            value: "_fetch * from event where $Duration=1h limit 10",
            label: "1h event"
          }
        ]
      },
      {
        value: "123",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men"
              }
            ]
          }
        ]
      },
      {
        value: "456",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men"
              }
            ]
          }
        ]
      },
      {
        value: "222",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men"
              }
            ]
          }
        ]
      },
      {
        value: "_fetch * from event where $Duration=1h limit 30",
        label: "test1"
      },
      {
        value: "111",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men"
              }
            ]
          }
        ]
      }
    ]
  };

  // onChange = value => {
  //   console.log(value);
  // };
  openpopupMenu = () => {
    this.setState({ visiblepopover: !this.state.visiblepopover });
  };
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    var index = selectedOptions.length;
    console.log(selectedOptions[index - 1]);

    this.setState({});
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join("/ "),
      SelectedQuery: selectedOptions[index - 1]
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    const { options, SelectedQuery } = this.state;
    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street"
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "3",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "4",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "5",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "6",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "7",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "8",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "9",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      },
      {
        key: "10",
        name: "John",
        age: 42,
        address: "10 Downing Street"
      }
    ];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      }
    ];
    console.log(this.state.SelectedQuery);
    return (
      <>
        {/* <span class="ant-cascader-picker" tabindex="0">
          <span class="ant-cascader-picker-label" />
          <input
            autocomplete="off"
            tabindex="-1"
            placeholder="Please select"
            class="ant-input ant-cascader-input "
            readonly=""
            type="text"
            value=""
            onClick={this.openpopupMenu}
          />
          <span
            role="img"
            aria-label="down"
            class="anticon anticon-down ant-cascader-picker-arrow"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              class=""
              data-icon="down"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
            </svg>
          </span>
        </span>
        {visiblepopover ? (
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%"
            }}
          >
            <div>
              <div
                class="ant-cascader-menus ant-cascader-menus-placement-bottomLeft "
                style={{ left: "24px", top: "60px" }}
              >
                <div>
                  <ul class="ant-cascader-menu">
                    <li
                      class="ant-cascader-menu-item ant-cascader-menu-item-expand"
                      title="Zhejiang"
                      role="menuitem"
                    >
                      Zhejiang
                      <span class="ant-cascader-menu-item-expand-icon">
                        <span
                          role="img"
                          aria-label="right"
                          class="anticon anticon-right"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            class=""
                            data-icon="right"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
                          </svg>
                        </span>
                      </span>
                    </li>
                    <li
                      class="ant-cascader-menu-item ant-cascader-menu-item-expand"
                      title="Jiangsu"
                      role="menuitem"
                    >
                      Jiangsu
                      <span class="ant-cascader-menu-item-expand-icon">
                        <span
                          role="img"
                          aria-label="right"
                          class="anticon anticon-right"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            class=""
                            data-icon="right"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
                          </svg>
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : null} */}

        <Cascader
          options={options}
          onChange={this.onChange}
          transitionName="slide-up"
          changeOnSelect
        >
          <Input
            addonAfter={
              SelectedQuery.value ? (
                <DoubleRightOutlined onClick={this.showModal} />
              ) : null
            }
            style={{ width: "100%" }}
            value={this.state.inputValue}
            placeholder="Enter query"
            allowClear
          />
        </Cascader>
        <Modal
          title={SelectedQuery.label}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout={"vertical"}>
            <Form.Item label="Query">
              <Input
                placeholder="input placeholder"
                value={SelectedQuery.value}
              />
            </Form.Item>
          </Form>
          <Table
            style={{ maxHeight: "200px", overflow: "auto" }}
            size={"small"}
            dataSource={dataSource}
            pagination={false}
            columns={columns}
          />
        </Modal>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));

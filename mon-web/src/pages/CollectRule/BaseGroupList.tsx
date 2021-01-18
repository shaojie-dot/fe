import React from "react";
import { Form, Input, Button } from "antd";
import _ from 'lodash';
import { useDynamicList } from "@umijs/hooks";
import BaseList from "./BaseList";

interface CardProps {
  form: any;
  field: any;
  tempData: any[];
  initialValues: any;
  getFieldDecorator: any;
}

const Card = (props: any) => {
  return props?.tempData?.map((item: any) => {
    const name = `${props.groupName}[${props.groupKey}].${item.name}`;
    if (item.type !== "array") {
      return (
        <Form.Item label={item.label} key={name} required={item.required}>
          {props.getFieldDecorator(name, {
            initialValue: props?.initialValues?.name,
            rules: [
              {
                required: item.required,
                message: item.description,
              },
            ],
          })(<Input placeholder={item.example} />)}
        </Form.Item>
      );
    } else {
      return (
        <Form.Item label={item.label} key={name} required={item.required}>
          <BaseList
            key={name}
            data={{
              ...item,
              name,
            }}
            getFieldDecorator={props.getFieldDecorator}
            initialValues={props?.initialValues}
          />
        </Form.Item>
      );
    }
  });
};

export default (props: CardProps) => {
  const { list, getKey, push } = useDynamicList(props.field.default || [{}]);
  return (
    <div style={{ width: 800, margin: "auto", display: "flex" }}>
      <div style={{ width: 400, marginRight: 16 }}>
        {list?.map((_item: any, idx: number) => (
          <div
            key={getKey(idx)}
            style={{
              border: "1px solid #e8e8e8",
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Card
              key={getKey(idx)}
              groupKey={getKey(idx)}
              groupName={props.field.name}
              getFieldDecorator={props.getFieldDecorator}
              tempData={props.tempData}
              initialValues={props.initialValues}
              style={{
                border: "1px solid #e8e8e8",
                padding: 16,
                marginBottom: 16,
              }}
            />
          </div>
        ))}
        <Button style={{ marginTop: 16 }} block onClick={() => push({})}>
          新增
        </Button>
      </div>
    </div>
  );
};

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  byDefault: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const SelectComponent = ({ label, name, options, byDefault }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            defaultValue={byDefault}
            size="large"
            {...field}
            options={options}
          />
          {error && <p className="text-red-500">{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default SelectComponent;

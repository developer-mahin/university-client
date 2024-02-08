import { Form } from "antd";
import Input from "antd/es/input/Input";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  placeholder: string;
  label: string;
};

const InputValue = ({ type, name, placeholder, label }: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({ field }) => (
        <Form.Item label={label}>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            size="large"
          />
        </Form.Item>
      )}
    />
  );
};

export default InputValue;

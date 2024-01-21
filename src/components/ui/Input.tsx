import Input from "antd/es/input/Input";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  placeholder: string;
};

const InputValue = ({ type, name, placeholder }: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <Input
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            type={type}
            placeholder={placeholder}
            required
            className="px-5 py-3 border rounded-md w-full focus:outline-none mt-3"
          />
        </>
      )}
    />
  );
};

export default InputValue;

import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  byDefault?: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const SelectComponentWithWatch = ({
  label,
  name,
  options,
  byDefault,
  disabled,
  onValueChange,
  mode,
}: TSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            defaultValue={byDefault}
            size="large"
            {...field}
            disabled={disabled}
            options={options}
          />
          {error && <p className="text-red-500">{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default SelectComponentWithWatch;

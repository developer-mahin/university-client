import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
};

const CDatePicker = ({ label, name }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker size="large" style={{ width: "100%" }} {...field} />
          {error && <p className="text-red-500">{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default CDatePicker;

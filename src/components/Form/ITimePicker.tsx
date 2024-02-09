import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { Form, TimePicker } from "antd";

type TTimePickerProps = {
  name: string;
  label: string;
};

const ITimePicker = ({ name, label }: TTimePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <TimePicker
            size="large"
            className="w-full"
            {...field}
            defaultValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>
      )}
    />
  );
};

export default ITimePicker;

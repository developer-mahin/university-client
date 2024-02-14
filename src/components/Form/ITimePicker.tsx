import { Form, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

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
            format="HH:mm"
            defaultValue={dayjs("00:00", "HH:MM")}
          />
        </Form.Item>
      )}
    />
  );
};

export default ITimePicker;

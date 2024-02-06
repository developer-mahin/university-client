import { Spin } from "antd";

type TSpinnerPros = {
  size: "small" | "default" | "large" | undefined;
};

const Spinner = ({ size }: TSpinnerPros) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size={size} />
    </div>
  );
};

export default Spinner;

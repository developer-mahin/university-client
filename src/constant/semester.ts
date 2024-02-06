export const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const currentYear = new Date().getFullYear();
export const years = [0, 1, 2, 3, 4].map((item) => ({
  value: String(currentYear + item),
  label: String(currentYear + item),
}));

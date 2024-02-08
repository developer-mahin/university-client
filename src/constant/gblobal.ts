export const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genders = ["male", "female", "other"];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = genders.map((item) => ({
  value: item,
  label: item.charAt(0).toUpperCase() + item.slice(1),
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const monthsOption = monthsName.map((item) => ({
  value: item,
  label: item,
}));

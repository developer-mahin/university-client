// import AdminDashboard from "../pages/Admin/AdminDashboard";
// import CreateAdmin from "../pages/Admin/CreateAdmin";
// import CreateFaculty from "../pages/Admin/CreateFaculty";
// import CreateStudent from "../pages/Admin/CreateStudent";

const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: " <AdminDashboard /> ",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: " <CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "<CreateStudent />",
      },
    ],
  },
];

const newArray = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((item) => {
      acc.push({
        path: item.path,
        element: item.element,
      });
    });
  }

  return acc;
}, []);

console.log(newArray);

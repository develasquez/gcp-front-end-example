import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Simulaciones } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "simulaciones",
        path: "/simulaciones",
        element: <Simulaciones />,
      }
    ],
  },
];

export default routes;

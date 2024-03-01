import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
  } from "@heroicons/react/24/solid";
  
  export const msmeVendorCardData = [
    {
      color: "green",
      icon: ChartBarIcon,
      title: "Total MSME Vendors",
      value: "500",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: ChartBarIcon,
      title: "SC/ST Vendors",
      value: "400",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: ChartBarIcon,
      title: "Total Women MSME",
      value: "100",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];
  
  export default msmeVendorCardData;
  
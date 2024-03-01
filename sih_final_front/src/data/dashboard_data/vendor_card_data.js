import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
  } from "@heroicons/react/24/solid";
  
  export const vendorCardData = [

    {
      color: "orange",
      icon: ChartBarIcon,
      title: "Total Vendors",
      value: "500",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "orange",
      icon: ChartBarIcon,
      title: "From GeM",
      value: "400",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "orange",
      icon: ChartBarIcon,
      title: "From Other Portals",
      value: "100",
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];
  
  export default vendorCardData;
  
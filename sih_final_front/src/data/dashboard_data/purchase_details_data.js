import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
  } from "@heroicons/react/24/solid";
  
  export const purchaseCardData = [
    {
      color: "blue",
      icon: BanknotesIcon,
      title: "On GeM",
      value: "88 (Purchase Order)",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: UserIcon,
      title: "Central Procurement",
      value: "59 (Purchase Order)",
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "green",
      icon: UserPlusIcon,
      title: "On Other Portal",
      value: "20 (Purchase Order)",
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
  
  ];
  
  export default purchaseCardData;
  
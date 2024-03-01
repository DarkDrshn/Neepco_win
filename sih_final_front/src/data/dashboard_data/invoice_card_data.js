import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
  } from "@heroicons/react/24/solid";
  
  export const invoiceCardData = [
    {
      color: "teal",
      icon: BanknotesIcon,
      title: "Overdue",
      value: "2",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
   
  ];
  
  export default invoiceCardData;
  
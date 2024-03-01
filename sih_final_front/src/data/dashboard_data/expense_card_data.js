import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
  } from "@heroicons/react/24/solid";
  
  export const expenseCardData = [
    {
      color: "pink",
      icon: BanknotesIcon,
      title: "Overdue",
      value: "2",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: BanknotesIcon,
      title: "Paid",
      value: "250",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
    {
      color: "pink",
      icon: BanknotesIcon,
      title: "Pending",
      value: "100",
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
   
  ];
  
  export default expenseCardData;
  
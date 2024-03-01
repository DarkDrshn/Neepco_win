import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

import purchaseCardData from "@/data/dashboard_data/purchase_details_data";

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Input,
  Button,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import Purchase_Order_Table from "./purchase_table";

export function purchase_details() {
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h3" color="blue-gray">
          Purchase Orders
        </Typography>

        <div>
          <a href="/dashboardemp/createPurchaseOrder">
            <Button size="md" variant="outlined" className="rounded-full">
              Create Purchase Order
            </Button>
          </a>
        </div>
      </div>{" "}
      <div className="mt-8">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {purchaseCardData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          ))}
        </div>
        <div>All Purchase Order Details</div>
        <div>
          <Purchase_Order_Table />
        </div>
      </div>
    </div>
  );
}

export default purchase_details;

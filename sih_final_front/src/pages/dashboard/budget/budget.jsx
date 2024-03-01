import React from "react";
import { Button, Typography } from "@material-tailwind/react";

import All_budget from "./budget_table";
import { StatisticsCard } from "@/widgets/cards";

import budgetCardData from "@/data/dashboard_data/budget_card_data";

function Budget() {
  return (
    <>
      <div className="flex justify-between">

      <Typography variant="h3" color="blue-gray" >Budget Details</Typography>

        <div>
          <a href="/dashboardAdmin/budgetcreate">
            <Button size="md" variant="outlined" className="rounded-full">
              Create Budget
            </Button>
          </a>
        </div>
      </div>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {budgetCardData.map(({ icon, title, footer, ...rest }) => (
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

        <div>
          <All_budget />
        </div>
      </div>
    </>
  );
}

export default Budget;

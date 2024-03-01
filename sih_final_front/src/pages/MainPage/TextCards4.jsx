import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  // Avatar,
} from "@material-tailwind/react";

export function TextCards4() {
  return (
    <Card
      color="transparent"
      shadow={false}
      className=" m-auto mb-10 items-center w-full max-w-[26rem] "
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="m-0  flex items-center gap-4 pt-0 "
      >
        <div className="flex w-full flex-col  m-0">
          <div className="">
            <Typography variant="h3" className="text-center" color="blue-gray">
              What is Mediator?
            </Typography>
          </div>
          {/* <Typography color="blue-gray">Frontend Lead @ Google</Typography> */}
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0 m-0">
        <Typography className="text-center ">
          &quot;A mediator is a neutral third party trained to facilitate
          communication and negotiation between conflicting parties. They help
          individuals or groups in dispute reach mutually acceptable agreements
          by fostering constructive dialogue and creative problem-solving.
          Mediators are commonly used in various contexts, including family
          disputes, workplace conflicts, and legal matters, to avoid
          litigation.&quot;
        </Typography>
      </CardBody>
    </Card>
  );
}

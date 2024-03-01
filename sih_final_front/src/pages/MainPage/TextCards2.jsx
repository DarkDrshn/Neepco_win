import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  // Avatar,
} from "@material-tailwind/react";

export function TextCards2() {
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
        className="m-0  flex items-center gap-4 "
      >
        <div className="flex w-full flex-col  m-0">
          <div className="">
            <Typography variant="h3" className="text-center" color="blue-gray">
              When do you require an Advocate?
            </Typography>
          </div>
          {/* <Typography color="blue-gray">Frontend Lead @ Google</Typography> */}
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0 m-0">
        <Typography className="text-center ">
          &quot;You need an advocate when facing legal issues or disputes that
          require professional legal representation. Advocates provide legal
          advice, represent clients in court, draft legal documents, and
          negotiate settlements. They help individuals and organizations
          navigate complex legal matters, ensuring their rights are protected
          and legal objectives are met.&quot;
        </Typography>
      </CardBody>
    </Card>
  );
}

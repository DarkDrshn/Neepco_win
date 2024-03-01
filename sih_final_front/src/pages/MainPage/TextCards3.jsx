import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  // Avatar,
} from "@material-tailwind/react";

export function TextCards3() {
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
              How is Notary helpful?
            </Typography>
          </div>
          {/* <Typography color="blue-gray">Frontend Lead @ Google</Typography> */}
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0 m-0">
        <Typography className="text-center ">
          &quot;A Notary Public is helpful as they authenticate important
          documents, such as legal contracts and deeds, ensuring their validity
          and preventing fraud. Their official seal and signature provide
          credibility and legal recognition, facilitating secure transactions
          and reducing disputes. Notaries play a crucial role in legal and
          business documentation.&quot;
        </Typography>
      </CardBody>
    </Card>
  );
}

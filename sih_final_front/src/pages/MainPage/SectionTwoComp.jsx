import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function SectionTwo() {
  return (
    <Card shadow={false} className=" w-fit h-full pt-2">
      <CardBody className="p-0">
        <Typography variant="h5" color="blue-gray" className="">
          One stop platform for all your legal needs.
        </Typography>
        <Typography className="pl-0">
          We are a cutting-edge ecommerce platform dedicated to connecting legal
          service providers with clients, offering a centralized system that
          prioritizes top-tier security. Our mission is to streamline the legal
          service industry, providing a secure and efficient marketplace for
          clients seeking expert legal assistance and professionals offering
          their expertise. We are your trusted partner in navigating the world
          of legal services, committed to facilitating seamless connections and
          peace of mind for all parties involved.
        </Typography>
      </CardBody>
      <CardFooter className="pt-3 pl-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}

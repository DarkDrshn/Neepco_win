// import { Card, CardBody, Typography } from "@material-tailwind/react";

// export function LastSection() {
//   return (
//     <div className="flex justify-between p-5 h-fit self-center">
//       <Card className="m-6">
//         <CardBody>
//           <Typography>The place is awesome</Typography>
//         </CardBody>
//       </Card>
//       <Card className="m-6">
//         <CardBody>
//           <Typography>The place is awesome</Typography>
//         </CardBody>
//       </Card>
//       <Card className="m-6">
//         <CardBody>
//           <Typography>The place is awesome</Typography>
//         </CardBody>
//       </Card>
//       <Card className="m-6">
//         <CardBody>
//           <Typography>The place is awesome</Typography>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

import { Typography, Avatar, Rating } from "@material-tailwind/react";
 
export function LastSection() {
  return (
    <div className="px-8 text-center">
       <Typography variant="h3" className="text-center ">Look What Our User Wants To Say!</Typography>
      <Typography variant="h2" color="blue-gray" className="mb-6 font-medium">
        &quot;This is an excellent product, Bahut Badiya laga use karke.&quot;
      </Typography>
      <Avatar
        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image"
        size="lg"
      />
      <Typography variant="h6" className="mt-4">
        Johny Bhaiya, Kanpur
      </Typography>
      <Typography color="gray" className="mb-4 font-normal">
        Double LLb.
      </Typography>
      <Rating value={5} readonly className="bg-gray-50" />
    </div>
  );
}
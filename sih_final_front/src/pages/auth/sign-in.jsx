import { useContext, useState, useEffect, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

/*
const login = async (inputs) => {
  const res = await axios.post(http://localhost:1508/api/auth/loginAdmin, inputs, {
    withCredentials: true,
  });

  setCurrentUser(res.data);
};*/
export function SignIn() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // const [err, setErr] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e, userType) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:1508/api/auth/login${userType}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
        {
          withCredentials: true,
        }
      );

      const userData = JSON.stringify(res.data.others);

      // console.log(res.data);
      // console.log(res.data.others);
      // console.log(res.data.others.role);
      setCurrentUser(res.data.others);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("user", userData);
      console.log("YEH HAI CURRENT ADMIN", res.data);

      if (userType === "Admin") {
        navigate("/dashboardAdmin/home");
      } else if (userType === "Emp") {
        navigate("/dashboardEmp/home");
      } else if (userType === "SuperAdmin") {
        navigate("/dashboardSuperAdmin/home");
      } else {
        console.error("Invalid user role");
      }
    } catch (err) {
      console.log(err);
      alert(err);
      alert("Bruh...You Already Logged in");
      // setErr(err.res.data);
    }
  };
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <div>
                <label htmlFor="email">Email:</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  size="lg"
                  required
                />

                <label htmlFor="password">Password:</label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  size="lg"
                  required
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              {/* <Button type="submit" variant="gradient" fullWidth>
                Sign In
              </Button> */}
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                onClick={(e) => handleSubmit(e, "Admin")}
              >
                Sign In as Admin
              </Button>
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                onClick={(e) => handleSubmit(e, "Emp")}
              >
                Sign In as Employee
              </Button>
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                onClick={(e) => handleSubmit(e, "SuperAdmin")}
              >
                Sign In as SuperAdmin
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>

          {/* <Input type="email" label="Email" size="lg" />
            <Input type="password" label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
        </Card>
      </div>
    </>
  );
}

export default SignIn;

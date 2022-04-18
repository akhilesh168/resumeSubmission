import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { FORM_SUBMIT, INCREMENT_FORM_INDEX } from "../redux/action.constant";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("First Name should not be empty")
      .max(30, "Should not exceed more than 30 characters"),
    lastName: yup
      .string()
      .required("Last Name should not be empty")
      .max(30, "Should not exceed more than 30 characters"),
    email: yup
      .string()
      .email()
      .required("Should be a valid email")
      .max(50, "Should not exceed more than 50 characters"),
    phone_number: yup
      .number("Phone number should be a number field")
      .positive("Phone number should be a positive field")
      .integer("Phone number should be a number field")
      .test(
        "len",
        "Max characters allowed are 15",
        (val) => val.toString().length <= 15
      )
      .required("Phone number should not be empty"),
  })
  .required();

export default function FormOne() {
  let dispatch = useDispatch();
  let formIndex = useSelector((state) => state.formIndex);
  let formOneValues = useSelector((state) => state.formValues);

  const { register, handleSubmit, control, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    dispatch({ type: FORM_SUBMIT, payload: data });
    dispatch({ type: INCREMENT_FORM_INDEX, payload: formIndex + 1 });
    reset();
  };

  if (formIndex !== 0) {
    return;
  }

  return (
    <>
      <Container>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 2, width: "75ch" },
          }}
        >
          <form>
            <div className="">
              <Controller
                name="firstName"
                control={control}
                defaultValue={formOneValues.firstName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors?.firstName}
                    {...register("firstName")}
                    label="FirstName"
                    helperText={errors?.firstName?.message || ""}
                  />
                )}
              />
            </div>
            <div className="">
              <Controller
                name="lastName"
                control={control}
                defaultValue={formOneValues.lastName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors?.lastName}
                    label="Last Name"
                    {...register("lastName")}
                    helperText={errors?.lastName?.message || ""}
                  />
                )}
              />
            </div>
            <div className="">
              <Controller
                name="email"
                control={control}
                defaultValue={formOneValues?.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors?.email}
                    label="Email"
                    {...register("email")}
                    helperText={errors?.email?.message || ""}
                  />
                )}
              />
            </div>
            <div className="">
              <Controller
                name="phone_number"
                control={control}
                defaultValue={formOneValues?.phone_number}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Phone Number"
                    error={errors?.phone_number}
                    {...register("phone_number")}
                    helperText={errors?.phone_number?.message || ""}
                  />
                )}
              />
            </div>
            <Box sx={{ "& button": { m: 1 } }}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Next
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREMENT_FORM_INDEX,
  DATA_POSTED,
  FORM_SUBMIT,
} from "../redux/action.constant";
import { useForm, Controller } from "react-hook-form";
import { isValidLink } from "../utils/helperMethods";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const schema = yup
  .object({
    live_in_us: yup
      .boolean()
      .required("The live in us must be accepted.")
      .oneOf([true], "The live in us must be accepted."),
    git_profile: yup
      .string()
      .required("Git profile is required")
      .max(100, "Should not exceed more than 100 characters")
      .test("ValidLink", "This is not a valid link", (value) =>
        isValidLink(value)
      ),
    about_you: yup
      .string()
      .required("About you is required")
      .max(100, "Should not exceed more than 100 characters"),
    Cv: yup.mixed().required("A file is required"),
    cover_letter: yup.mixed().nullable(),
  })
  .required();

export default function FormTwo() {
  let dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, getValues, control, formState, reset } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        live_in_us: false,
      },
    });

  const { errors } = formState;

  let formIndex = useSelector((state) => state.formIndex);
  let formValues = useSelector((state) => state.formValues);

  const onSubmit = (data) => {
    setOpen(true);
    let formValue = {
      ...data,
      Cv: data?.Cv[0],
      cover_letter: data?.cover_letter ? data?.cover_letter[0] : null,
      ...formValues,
    };
    dispatch({
      type: FORM_SUBMIT,
      payload: { ...formValue },
    });

    dispatch({ type: DATA_POSTED, payload: formValue });
    dispatch({ type: DECREMENT_FORM_INDEX, payload: formIndex - 1 });
    reset();
    dispatch({ type: FORM_SUBMIT, payload: {} });
    setOpen(false);
  };

  const onPrevious = (event) => {
    dispatch({ type: DECREMENT_FORM_INDEX, payload: formIndex - 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const values = getValues();

  if (formIndex === 0) {
    return;
  }

  return (
    <>
      <Container style={{ margin: 10 }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "75ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form>
            <div>
              <FormControlLabel
                control={
                  <Controller
                    name="live_in_us"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Checkbox checked={field.value} {...field} />
                    )}
                  />
                }
                label="Do you live in USA?"
              />
              <FormHelperText className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root">
                {errors?.live_in_us?.message || ""}
              </FormHelperText>
            </div>
            <div>
              <Controller
                name="git_profile"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors?.git_profile}
                    {...register("git_profile")}
                    label="Git Profile Link"
                    placeholder="http://example.com/my-project.git"
                    helperText={errors?.git_profile?.message || ""}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="about_you"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={errors?.about_you}
                    {...register("about_you")}
                    label="About You"
                    helperText={errors?.about_you?.message || ""}
                  />
                )}
              />
            </div>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography variant="body1" gutterBottom>
                    Resume/Cv Select
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="Cv"
                    control={control}
                    render={({ field }) => (
                      <input
                        onChange={(e) => {
                          console.log(e.target.files);
                          field.onChange(e.target.files);
                        }}
                        type="file"
                        required
                      />
                    )}
                  />
                  <FormHelperText className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root">
                    {errors?.Cv?.required || errors?.Cv?.message || ""}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography variant="body1" gutterBottom>
                    Cover Letter
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Controller
                    name="cover_letter"
                    id="cover_letter"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...register("cover_letter")}
                        {...field}
                        type="file"
                      />
                    )}
                  />
                  <FormHelperText>
                    {values?.cover_letter &&
                      values?.cover_letter?.length > 0 &&
                      values?.cover_letter[0].name}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ "& button": { m: 1 } }}>
              <Button variant="contained" size="large" onClick={onPrevious}>
                Prev
              </Button>
              <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          message="Data Successfully Submitted"
          key={"top" + "center"}
          autoHideDuration={2000}
        />
      </Container>
    </>
  );
}

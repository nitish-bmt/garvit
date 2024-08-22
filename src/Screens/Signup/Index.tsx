import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import CardActions from "@mui/material/CardActions";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RegisterForm } from "./Interfaces";
import SignupSchema from "./ValidationSchema";
import CommonBlackSubmitButton from "../../Components/Common/CommonBlackSubmitButton";
import CommonTextField from "../../Components/Common/CommonTextField";
import CommonCard from "../../Components/Common/CommonCard";
import CommonCardContent from "../../Components/Common/CommonCardContent";
import CommonFormBox from "../../Components/Common/CommonBox";
import CommonContainer from "../../Components/Common/CommonContainer";
import CommonErrorTypography from "../../Components/Common/CommonErrorTypography";
import CommonHeadingTypography from "../../Components/Common/CommonHeadingTypography";
import { loginUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { addUser } from "../../dbOperations/operations";
import { localStorageKeys } from "../../dbOperations/config";
import useNavigateAfterLogin from "../../hooks/useNavigateAfterLogin";
import CommonTypography from "../../Components/Common/CommonTypography";
import CommonBox from "../../Components/Common/CommonBox";
import CommonFooter from "../../Components/Common/CommonFooter";


const SignupPage: React.FC = () => {

  const navigate = useNavigate();
  const navigateToSignin = ()=> navigate('/login');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(SignupSchema),
  });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigateAfterLogin = useNavigateAfterLogin();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const status = await addUser(data.username, data);
      console.log(status, "status");
      if (!status) {
        setError("User already exists, Try Logging in instead");
      }
      localStorage.setItem(localStorageKeys.user, data.username);
      dispatch(loginUser({ userId: data.username, password: data.password }));
      navigateAfterLogin();
    } catch (err: any) {
      // Handle error
    }
  };

  return (
    <>
    <CommonBox sx={{flexDirection: 'column', backgroundImage: '../../utils/bg.jpg'}}>
    <CommonTypography variant="h3"
    style={{margin: '4vh auto', fontWeight: 700}
        }>Fake.Expense.App</CommonTypography>
    <CommonFormBox>
      <CommonContainer>
        <CommonCard>
          <CommonCardContent>
            <CommonHeadingTypography>Sign Up</CommonHeadingTypography>
            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="username"
                    control={control}
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="email"
                    control={control}
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField name="name" control={control} label="Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CommonTextField
                    name="mobileNo"
                    control={control}
                    label="Phone Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CardActions>
                    <CommonBlackSubmitButton
                      loading={isLoading}
                      text="Sign Up"
                    />
                  </CardActions>
                </Grid>
              </Grid>
            </Stack>
            {error && <CommonErrorTypography>{error}</CommonErrorTypography>}
            <p>Already have an account?&nbsp;
            <span
              onClick={()=>navigateToSignin()}
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }
              }>Sign in</span>
            </p>
          </CommonCardContent>
        </CommonCard>
      </CommonContainer>
    </CommonFormBox>
    {/* <CommonFooter/> */}
    </CommonBox>
    </>

  );
};

export default SignupPage;

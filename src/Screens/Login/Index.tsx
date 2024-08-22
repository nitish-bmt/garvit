import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import { LoginFormInterface } from "./Interfaces";
import LoginFormSchema from "./ValidationSchema";
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
import { logUser } from "../../dbOperations/operations";
import { localStorageKeys } from "../../dbOperations/config";
import useNavigateAfterLogin from "../../hooks/useNavigateAfterLogin";
import { fontStyle } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CommonTypography from "../../Components/Common/CommonTypography";
import CommonBox from "../../Components/Common/CommonBox";
import CommonFooter from "../../Components/Common/CommonFooter";

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInterface>({
    resolver: yupResolver(LoginFormSchema),
  });
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const navigateAfterLogin = useNavigateAfterLogin();
  const navigate = useNavigate();
  const navigateToSignup= ()=>navigate('/signup');

  const onSubmit = async (data: LoginFormInterface) => {
    try {
      const loginStatus = await logUser(data.username, data.password);
      if (loginStatus) {
        dispatch(loginUser({ userId: data.username, password: data.password }));
        localStorage.setItem(localStorageKeys.user, data?.username);
        navigateAfterLogin();
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {}
  };

  return (
    <>
    <CommonBox sx={{flexDirection:'column'}}>
      <CommonTypography variant="h3"
      sx={{margin: '4vh auto', fontWeight:700}
          }>Fake.Expense.App</CommonTypography>
      <CommonFormBox>
        <CommonContainer>
          <CommonCard>
            <CommonCardContent>
              <CommonHeadingTypography>Login</CommonHeadingTypography>
              <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ flexGrow: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CommonTextField
                      name="username"
                      control={control}
                      label="Username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CommonTextField
                      name="password"
                      control={control}
                      label="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions>
                      <CommonBlackSubmitButton loading={false} text="Log In" />
                    </CardActions>
                  </Grid>
                </Grid>
              </Stack>
              {error && <CommonErrorTypography>{error}</CommonErrorTypography>}
              <p>Don't have an account?&nbsp; 
                <span 
                  onClick={()=>navigateToSignup()} 
                  style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline' }
                }>Sign up</span>
              </p>
            </CommonCardContent>
          </CommonCard>
        </CommonContainer>
      </CommonFormBox>
    </CommonBox>
    {/* <CommonFooter/> */}
    </>
  );
};

export default LoginPage;

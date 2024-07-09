import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { preload } from 'swr';
// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { fetcher } from 'utils/axios';
import { Login } from 'Redux/Apis/PostApiCalls';
import { useDispatch, useSelector } from 'react-redux';
// assets
import { Eye, EyeSlash } from 'iconsax-react';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ forgot }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { isFetching, error, errMsg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isLoggedIn, login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {};

  return (
    <>
      <Formik
        // initialValues={{
        //   email: 'hellorakesh@gmail.com',
        //   password: '123@rakesh',
        //   submit: null
        // }}
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        // onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        //   try {
        //     await login(values.email, values.password);
        //     if (scriptedRef.current) {
        //       setStatus({ success: true });
        //       setSubmitting(false);
        //       preload('api/menu/dashboard', fetcher); // load menu on login success
        //     }
        //   } catch (err) {
        //     console.error(err);
        //     if (scriptedRef.current) {
        //       setStatus({ success: false });
        //       setErrors({ submit: err.message });
        //       setSubmitting(false);
        //     }
        //   }
        // }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await Login(dispatch, { email: values.email, password: values.password });
            // await login(values.email, values.password);
            navigate('/dashboard');
            if (!error) {
              setStatus({ success: true });
              setSubmitting(false);
              preload('api/menu/dashboard', fetcher);
            }
          } catch (err) {
            console.error(err);
            if (error) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  /> */}

                  <Link variant="h6" component={RouterLink} to={isLoggedIn && forgot ? forgot : '/forgot-password'} color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item xs={6}>
                    <AnimateButton>
                      <Button
                        onClick={() => navigate('/register')}
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        Signup
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { forgot: PropTypes.string };

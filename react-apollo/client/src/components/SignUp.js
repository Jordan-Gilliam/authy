import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { Mutation } from 'react-apollo';

import gql from 'graphql-tag';

import rocketShip2 from './rocket-ship-2.svg';
import { makeStyles } from '@material-ui/core/styles';

// TODO: move styles to scss file emotion
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${rocketShip2})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  },
  paper: {
    color: '#504ba2',
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#f55f44'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    backgroundColor: '#504ba2',
    margin: theme.spacing(3, 0, 2)
  }
}));

// TODO: add jwt config + sanitization
export default function SignInSide() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const CREATE_USER = gql`
    mutation CreateUser(
      $name: String!
      $email: String!
      $password: String!
    ) {
      createUser(
        data: { name: $name, email: $email, password: $password }
      ) {
        id
        name
        createdAt
      }
    }
  `;

  return (
    <Mutation mutation={CREATE_USER}>
      {(createUser, { data, loading, error }) => (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            className={classes.image}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={0}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={e => {
                  e.preventDefault();
                  createUser({
                    variables: { name, email, password }
                  });
                }}
              >
                {data && console.log(data)}
                {loading && console.log(loading)}
                {error && console.log(error)}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={e => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox value="remember" color="primary" />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      {'Already have an account? Sign In'}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5} />
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </Mutation>
  );
}

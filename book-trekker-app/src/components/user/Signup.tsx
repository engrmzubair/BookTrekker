import React, { useState } from 'react';
import Menu from '../core/Menu';
import Layout from '../core/Layout';
import SignupForm from './SignupForm';

type Props = {}

export type HandleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => void;

export type Values = {
  name: string,
  email: string,
  password: string,
  error: string
}

const Signup = (props: Props) => {

  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    password: "",
    error: ""
  })

  const handleChange: HandleChange = (name, event) => {

    setValues({ ...values, [name.toLowerCase()]: event.target.value });


  }
  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Signup"
        description="Signup to Book TreKKer." />
      <SignupForm
        values={ values }
        handleChange={ handleChange } />
    </React.Fragment>
  );
}

export default Signup

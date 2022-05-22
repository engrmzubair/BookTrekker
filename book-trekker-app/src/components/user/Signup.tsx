import React from 'react';
import Menu from '../core/Menu';
import Layout from '../core/Layout';

type Props = {}

const Signup = (props: Props) => {

  return (
    <React.Fragment>
      <Menu />
      <Layout title="Signup" description="Signup to Book TreKKer.">
      </Layout>
    </React.Fragment>
  );
}

export default Signup

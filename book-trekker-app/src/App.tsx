import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/core/Menu';
import Layout from './components/core/Layout';

function App() {

  return (
    <React.Fragment>
      <Menu />
      <Layout
        title="Book TreKKer"
        description="E-Commerce App for web development courses and books." >
      </Layout>

    </React.Fragment>
  );
}

export default App;

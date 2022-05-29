import React from 'react';
import { Container } from 'react-bootstrap';

type Props = {
  title?: string,
  description?: string,
  children?: React.ReactNode
}

const Layout = ({
  title = "Title",
  description = "Description",
  children
}: Props) => {
  return (
    <div className="mt-4 p-5 bg-light rounded">
      <div className="container-fluid">
        <h1>{ title }</h1>
        <p className='lead'>{ description }</p>
        <div>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Layout;
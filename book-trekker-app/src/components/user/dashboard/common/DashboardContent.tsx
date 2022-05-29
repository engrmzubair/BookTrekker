import React from 'react'
import ContentBody from './ContentBody';
import ContentLinks from './ContentLinks';

const DashboardContent = () => {

  return (
    <React.Fragment>

      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-md-3">

            <ContentLinks />
          </div>
          <div className="col-md-9">

            <ContentBody />
          </div>
        </div>

      </div>

    </React.Fragment >
  )
}

export default DashboardContent
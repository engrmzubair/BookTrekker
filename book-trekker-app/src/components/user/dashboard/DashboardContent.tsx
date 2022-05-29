import React from 'react'
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks';

import CardComponent from '../../common/CardComponent';
import ListGroupComp from '../../common/ListGroupComp';
import { currentUser } from '../userSlice';



const DashboardContent = () => {
  const user = useAppSelector(currentUser);

  const role = user && user.role === 1 ? "Admin" : "Registered User"

  const userInfo = (user && [user.name, user.email, role]) || []

  const purchaseHistory: any[] = ["Not purchase anything yet!"];


  return (
    <React.Fragment>
      <Container className='m-auto'>
        <CardComponent
          title='User Information'
          className="col-lg-10 bg-secondary text-light m-auto"
        >
          <ListGroupComp
            items={ userInfo }
            variant="dark"
          />

        </CardComponent>
        <CardComponent
          title='Purchase History'
          className="col-lg-10 bg-secondary text-light m-auto"
        >
          <ListGroupComp
            items={ purchaseHistory }
          />

        </CardComponent>

      </Container>
    </React.Fragment>
  )
}

export default DashboardContent
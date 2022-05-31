import React from 'react'
import { useAppSelector } from '../../../../app/hooks';
import CardComponent from '../../../common/CardComponent';
import ListGroupComp from '../../../common/ListGroupComp';
import { currentUser } from '../../userSlice';

type Props = {}

const ContentBody = (props: Props) => {

  const user = useAppSelector(currentUser);

  const role = user && user.role === 1 ? "Admin" : "Registered User";

  const isRegistered = role === "Registered User";

  const title = (role === 'Admin') ? "Admin Information" : "User Information";

  const userInfo = (user && [user.name, user.email, role]) || []

  const purchaseHistory: any[] = ["Not purchase anything yet!"];

  return (
    <React.Fragment>
      <CardComponent
        title={ title }
        className="bg-warning text-dark mt-2 mb-4"
        headTextPosition="text-start"
      >
        <ListGroupComp
          items={ userInfo }
          variant="flush"
          className='m-2'
        />

      </CardComponent>
      { isRegistered && < CardComponent
        title='Purchase History'
        className="bg-success text-light mt-2 mb-4"
        headTextPosition='text-start'
      >
        <ListGroupComp
          items={ purchaseHistory }
          variant="flush"
          className='m-2'
        />

      </CardComponent> }
    </React.Fragment >
  )
}

export default ContentBody
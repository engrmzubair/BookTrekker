import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import CardComponent from '../../../common/CardComponent';
import ListGroupComp from '../../../common/ListGroupComp';
import { currentUser, getPurchaseHistory, getHistory } from '../../userSlice';
import ListGroupPurchase from './ListGroupPurchase';

type Props = {}

const ContentBody = (props: Props) => {

  const user = useAppSelector(currentUser);
  const history = useAppSelector(getHistory)
  const dispatch = useAppDispatch();

  const role = user && user.role === 1 ? "Admin" : "Registered User";

  const isRegistered = role === "Registered User";

  const title = (role === 'Admin') ? "Admin Information" : "User Information";

  const userInfo = (user && [user.name, user.email, role]) || []

  console.log("History: ", history)

  useEffect(() => {
    if (user && user._id)
      dispatch(getPurchaseHistory(user._id))
  }, [])

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
        <ListGroupPurchase
          items={ history }
          variant="flush"
          className='m-2'
        />

      </CardComponent> }
    </React.Fragment >
  )
}

export default ContentBody
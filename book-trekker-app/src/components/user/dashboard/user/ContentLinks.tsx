import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
// import { useAppSelector } from '../../../app/hooks';
import CardComponent from '../../../common/CardComponent';
// import { currentUser } from '../userSlice';

type Props = {}

const ContentLinks = (props: Props) => {
  const links = [
    // link:
  ]
  return (
    <React.Fragment>
      <CardComponent
        title='User Links'
        className="bg-light mt-2 mb-4"
        headTextPosition='text-start'
      >
        <ListGroup>
          <ListGroup.Item action>
            <NavLink
              className="nav-link"
              to="/cart">My Cart</NavLink>
          </ListGroup.Item>
          <ListGroup.Item action>
            <NavLink
              className="nav-link "
              to="/profile/update">Update Profile</NavLink>
          </ListGroup.Item>

        </ListGroup>

      </CardComponent>
    </React.Fragment>
  )
}

export default ContentLinks
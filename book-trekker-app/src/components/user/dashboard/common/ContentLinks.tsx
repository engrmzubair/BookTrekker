import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks';
import CardComponent from '../../../common/CardComponent';
// import { currentUser } from '../userSlice';
import { currentUser } from '../../userSlice';


type Links = { name: string, link: string }[]

const ContentLinks = () => {

  const user = useAppSelector(currentUser);

  const isAdmin = user && user.role === 1;

  const LinksTittle = isAdmin ? 'Admin Links' : "User Links"

  const userLinks = [
    { name: "My Cart", link: "/cart" },
    { name: "Update Profile", link: "/profile/update" },
  ]
  const adminLinks = [
    { name: "Create Category", link: "/create/category" },
    { name: "Create Product", link: "/create/product" },
    { name: "View Orders", link: "/admin/orders" },
  ]

  const links: Links = isAdmin ? adminLinks : userLinks;
  return (
    <React.Fragment>
      <CardComponent
        title={ `${LinksTittle}` }
        className="bg-info mt-2 mb-4"
        headTextPosition='text-start'
      >
        <ListGroup>

          { links
            .map((l, i) => <ListGroup.Item

              key={ i }
              action>

              <NavLink
                className="nav-link"
                to={ l.link }>
                { l.name }
              </NavLink>

            </ListGroup.Item>

            ) }

        </ListGroup>

      </CardComponent>
    </React.Fragment>
  )
}

export default ContentLinks
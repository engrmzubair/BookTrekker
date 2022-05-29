import React from 'react'
import { ListGroup } from 'react-bootstrap';

type Props = {
  items: (string)[] | any[],
  variant?: string,
  className?: string,
}

const ListGroupComp = ({
  items, variant = 'dark', className = 'm-4'
}
  : Props) => {

  if (!items.length)
    return null

  return (
    <React.Fragment>
      <ListGroup className={ className }>

        { items.map((item, i) => < ListGroup.Item variant={ variant } key={ i } > { item }</ListGroup.Item>) }

      </ListGroup>
    </React.Fragment >
  )
}

export default ListGroupComp
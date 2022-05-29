import React from 'react'
import { Card } from 'react-bootstrap';

type Props = {
  title?: string,
  subtitle?: string,
  headTextPosition?: "text-center" | "text-start" | "text-end",
  className?: string
  children?: React.ReactNode
}

const CardComponent = ({ title,
  subtitle,
  children,
  className = "bg-light m-auto",
  headTextPosition = "text-center"

}:
  Props) => {

  return (
    <React.Fragment>
      <Card className={ className }>
        <Card.Header
          style={ { fontSize: "2.25rem" } }
          className={ headTextPosition }
        >{ title }
          <Card.Subtitle className={ `mb-2 text-muted ${headTextPosition}` }>{ subtitle }</Card.Subtitle>
        </Card.Header>

        { children }

      </Card>
    </React.Fragment>
  )
}

export default CardComponent
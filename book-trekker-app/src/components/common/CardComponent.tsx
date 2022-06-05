import React from 'react'
import { Card } from 'react-bootstrap';

type Props = {
  title?: string,
  subtitle?: string,
  headTextPosition?: "text-center" | "text-start" | "text-end",
  className?: string,
  primary?: boolean,
  children?: React.ReactNode
}

const CardComponent = ({ title,
  subtitle,
  children,
  primary = false,
  className = "bg-light m-auto",
  headTextPosition = "text-center"

}:
  Props) => {

  return (
    <React.Fragment>
      <Card className={ className }>
        <Card.Header
          style={
            {
              fontSize: "2.25rem",
              backgroundColor: primary ? "rgba(25, 80, 182, 0.835)" : "",
              color: primary ? 'white' : "",
            } }
          className={ headTextPosition }
        >{ title }
          <Card.Subtitle
            className={ `mb-2 mt-1 ${headTextPosition}` }
            style={
              {
                color: 'white'
              } }
          >{ subtitle }</Card.Subtitle>
        </Card.Header>

        { children }

      </Card>
    </React.Fragment>
  )
}

export default CardComponent
import React from 'react'
import { Card } from 'react-bootstrap';

type Props = {
  title?: string,
  subtitle?: string,
  className?: string
  children?: React.ReactNode
}

const CardComponent = ({ title,
  subtitle,
  children,
  className = "col-lg-6 bg-light m-auto"
}:
  Props) => {

  return (
    <React.Fragment>
      <div
        className='row my-2 w-100 p-5'>
        <Card className={ className }>
          <Card.Body >
            <Card.Title
              style={ { fontSize: "2.25rem" } }
              className="text-center"
            >{ title }
            </Card.Title>
            <Card.Subtitle className="mb-2 text-center text-muted">{ subtitle }</Card.Subtitle>

            { children }

          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default CardComponent
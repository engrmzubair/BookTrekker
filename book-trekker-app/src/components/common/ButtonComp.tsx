import React from 'react'
import { Button } from 'react-bootstrap';


type Props = {
  variant: string,
  type?: "button" | "submit" | "reset" | undefined,
  text: string
}

const ButtonComp = ({ variant, type, text }: Props) => {
  return (

    <React.Fragment>
      <Button
        className='w-100 mb-3'
        variant={ variant }
        type={ type }
      >
        { text }
      </Button>
    </React.Fragment>
  )
}

export default ButtonComp
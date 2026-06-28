import { ErrorMessage } from '@heroui/react'

export default function ValidationMessage({field, isTouched}) {
  return (
    <>
     { field  && isTouched && (
            <ErrorMessage >
                {field.message}
            </ErrorMessage>
     )
    }
    </>
  )
}

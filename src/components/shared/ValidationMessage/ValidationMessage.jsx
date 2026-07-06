import { ErrorMessage } from '@heroui/react'
import { useFormState } from 'react-hook-form'

export default function ValidationMessage({name, control}) {
  const {errors, touchedFields} = useFormState({control, name});
  
  return (
    <>
     { errors[name]  && touchedFields[name] && (
            <ErrorMessage >
                {errors[name].message}
            </ErrorMessage>
     )
    }
    </>
  )
}

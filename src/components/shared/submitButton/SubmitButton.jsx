import { useFormState } from 'react-hook-form'
import {Button} from "@heroui/react";


export default function SubmitButton({control}) {

    const {isSubmitting, isValid} = useFormState({control});

  return (
    <Button fullWidth type="submit" className="mt-2 h-12 font-semibold" disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </Button>
  )
}

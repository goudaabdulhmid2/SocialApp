import { useFormState } from 'react-hook-form'
import {Button, Spinner} from "@heroui/react";


export default function SubmitButton({ control, submitLabel }) {

    const {isSubmitting, isValid} = useFormState({control});

  return (
    <Button fullWidth type="submit" className="mt-2 h-12 font-semibold" isDisabled={isSubmitting || !isValid} >
        
        {isSubmitting ?  
              <>
                  <Spinner color="current" size="sm" /> 
                  Submitting...

              </>
        : submitLabel }
        
      
          </Button>
  )
}


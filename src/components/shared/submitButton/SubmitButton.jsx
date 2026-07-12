import { useFormState } from 'react-hook-form'
import {Button, Spinner} from "@heroui/react";


export default function SubmitButton({ control, submitLabel, action, icon: Icon }) {

    const {isSubmitting, isValid} = useFormState({control});

  return (
    <Button fullWidth type="submit" className="mt-2 h-12 font-semibold" isDisabled={isSubmitting || !isValid} >
        
        {isSubmitting ?  
              <>
                  <Spinner color="current" size="sm" /> 
                  {action}

              </>
        : <>
            {submitLabel}
            {Icon ? <Icon className="h-4 w-4" /> : null}
          </> }
        
      
          </Button>
  )
}


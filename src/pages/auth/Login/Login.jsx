import { Input, Label, TextField, Alert } from "@heroui/react";
import { useForm } from "react-hook-form";
import ValidationMessage from '../../../components/shared/ValidationMessage/ValidationMessage';
import SubmitButton from "../../../components/shared/submitButton/SubmitButton";
import { loginSchema } from "../../../schemas/auth/login.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AuthServices from "../../../services/AuthServices";



export default function Login() {
  const {
    register,
    control,
    handleSubmit,
    
  } = useForm({
    defaultValues: {
      email: "",

      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const {saveToken} = useContext(AuthContext)

  const navigate = useNavigate()

  
  useEffect(() => {
    if(!successMessage) return

    const timeoutId = setTimeout(() => {
      navigate('/')
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [navigate, successMessage])

  async function onSubmitLogin(data) {
    try {
      setApiError('')

      const res = await AuthServices.signIn(data)
      
      if(res.error){
        throw new Error(res.error);
      }
      
      setSuccessMessage('Login done successfully')
      saveToken(res.data.data.token)

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      setApiError(errorMsg);
    }
   
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#ecfdf5_100%)] px-4 py-12">
      <div className="mx-auto mt-8 w-full max-w-2xl rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur md:p-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">
            Create account
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">Login</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmitLogin)} className="mt-8 grid gap-4">
      

          <TextField fullWidth>
            <Label>Email</Label>
            <Input {...register("email")} type="email" placeholder="Enter your email" autoComplete="email" />
            {/* <ValidationMessage field={errors.email} isTouched={touchedFields.email} /> */}
            <ValidationMessage name='email' control={control} />
          </TextField>


            <TextField fullWidth>
              <Label>Password</Label>
              <Input {...register("password")} type="password" placeholder="••••••••" autoComplete="new-password" />
              {/* <ValidationMessage field={errors.password} isTouched={touchedFields.password} /> */}
              <ValidationMessage name='password' control={control} />

            </TextField>


          <SubmitButton control={control} submitLabel={'Login'} action={'Submitting...'} ></SubmitButton>
          <Link className="text-blue-600" to={'/register'}>U don't have an account, Register now</Link>

          {apiError &&
              <Alert status="danger">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{apiError}</Alert.Title>
                    <Alert.Description />
                  </Alert.Content>
              </Alert>
           }
          
          {successMessage &&
              <Alert status="success">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{successMessage}</Alert.Title>
                    <Alert.Description />
                  </Alert.Content>
              </Alert>
           }
          

        </form>
      </div>
    </div>
  );
}

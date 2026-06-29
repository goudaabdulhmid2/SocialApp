import { Input, Label, TextField, RadioGroup, Radio, Alert } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import ValidationMessage from '../../../components/shared/ValidationMessage/ValidationMessage';
import SubmitButton from "../../../components/shared/submitButton/SubmitButton";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = 'https://route-posts.routemisr.com/users/signup';

const registerSchema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Min length is 3'),

  username: z.string().nonempty('Username is required'),

  email: z.email("Please enter a valid email address").nonempty('Email is required'),

  dateOfBirth: z.coerce.date().refine(
    (val) => new Date().getFullYear() - val.getFullYear() > 16,
    "Age must be above 16 years"
  ).transform(
    (date) => `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
  ),

  gender: z.enum(['male', 'female'], 'Gender must be male or female'),

  password: z.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .nonempty('Password is required'),

  rePassword: z.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
});

export default function Register() {
  const {
    register,
    control,
    handleSubmit,
    
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  let timeOut = useRef(null)

  useEffect(()=>{
    console.log('ddd');

    return () => {
      clearTimeout(timeOut)
    }
    
  })

  async function onSubmitRegister(data) {
    try {
      const res = await axios.request({
        method: 'POST',
        url: API_URL,
        data,
      });
      console.log(res);
      
      if(res.error){
        throw new Error(res.error);
      }
      
      setSuccessMessage('Register done successfully')

      timeOut = setTimeout(()=>{
        navigate('/auth/login')
        
      },2000)

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      console.log(errorMsg);
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
          <h3 className="mt-2 text-3xl font-bold text-slate-900">Register</h3>
          <p className="mt-3 text-sm text-slate-500">
            Join the community and set up your profile in a few quick steps.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitRegister)} className="mt-8 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">

            
            <TextField fullWidth>
              <Label>Full Name</Label>
              <Input {...register("name")} placeholder="John Doe" />
              {/* <ValidationMessage field={errors.name} isTouched={touchedFields.name} /> */}
              <ValidationMessage name='name' control={control} />
            </TextField>

            <TextField fullWidth>
              <Label>Username</Label>
              <Input {...register("username")} placeholder="Enter username" autoComplete="username" />
              {/* <ValidationMessage field={errors.username} isTouched={touchedFields.username} /> */}
              <ValidationMessage name='username' control={control} />
            </TextField>

          </div>

          <TextField fullWidth>
            <Label>Email</Label>
            <Input {...register("email")} type="email" placeholder="Enter your email" autoComplete="email" />
            {/* <ValidationMessage field={errors.email} isTouched={touchedFields.email} /> */}
            <ValidationMessage name='email' control={control} />
          </TextField>

          <div className="grid gap-4 md:grid-cols-2">

            <TextField fullWidth>
              <Label>Date of Birth</Label>
              <Input {...register("dateOfBirth")} type="date" placeholder="Enter your date of birth" />
              {/* <ValidationMessage field={errors.dateOfBirth} isTouched={touchedFields.dateOfBirth} /> */}
              <ValidationMessage name='dateOfBirth' control={control} />
            </TextField>

            
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Label id="gender-label" className="mb-3 block text-sm font-medium text-slate-700">
                Select your Gender
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup aria-labelledby="gender-label" {...field} orientation="horizontal">
                    <Radio value="male">
                      <Radio.Content>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Male
                      </Radio.Content>
                    </Radio>
                    <Radio value="female">
                      <Radio.Content>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Female
                      </Radio.Content>
                    </Radio>
                  </RadioGroup>
                )}
              />
              {/* <ValidationMessage field={errors.gender} isTouched={touchedFields.gender} /> */}
              <ValidationMessage name='gender' control={control} />

            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <TextField fullWidth>
              <Label>Password</Label>
              <Input {...register("password")} type="password" placeholder="••••••••" autoComplete="new-password" />
              {/* <ValidationMessage field={errors.password} isTouched={touchedFields.password} /> */}
              <ValidationMessage name='password' control={control} />

            </TextField>

            <TextField fullWidth>
              <Label>Confirm Password</Label>
              <Input {...register("rePassword")} type="password" placeholder="••••••••" autoComplete="new-password" />
              {/* <ValidationMessage field={errors.rePassword} isTouched={touchedFields.rePassword} /> */}
              <ValidationMessage name='rePassword' control={control} />

            </TextField>

          </div>

          <SubmitButton control={control}></SubmitButton>

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

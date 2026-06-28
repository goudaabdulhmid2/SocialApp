import { Input, Label, TextField, Button, RadioGroup, Radio, ErrorMessage} from "@heroui/react";
import {Controller, useForm} from "react-hook-form";

export default function Register() {

  const {control, handleSubmit, formState:{errors, touchedFields}} = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    mode:"onSubmit" // byDefault
  })

  function onSubmitRegister(data){
    
    console.log(data)
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
            <Controller
              name="name"
              control={control}
              rules={
                {
                  required:{
                    value:true,
                    message:"Name is required"
                  },
                  minLength:{
                    value:3,
                    message:"Min length is 3"
                  }
                }
              }
              
              render={({field}) => (
                <TextField  fullWidth>
                  <Label>Full Name</Label>

                  <Input
                    {...field}
                    placeholder="John Doe"
                  />

                  {errors.name && touchedFields.name && (
                    <ErrorMessage >
                      {errors.name.message}
                    </ErrorMessage>
                  )}
                </TextField>
              )}
            />

           

            <Controller
              name="username"
              control={control}
              rules={
                {
                  required:{
                    value:true,
                    message:"UserName is required"
                  }
                }
              }
              render={({field}) => (
                <TextField  fullWidth>
                  <Label>Username</Label>
                  <Input {...field} placeholder="Enter username" autoComplete="username" />
                  {errors.username && touchedFields.username && (
                    <ErrorMessage>
                      {errors.username.message}
                    </ErrorMessage>
                  )}
                </TextField>
              )}
            />
          </div>

          <Controller
            name="email"
            control={control}
            rules={
                {
                  required:{
                    value:true,
                    message:"Email is required"
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                }
              }
            render={({field}) => (
              <TextField fullWidth>
                <Label>Email</Label>
                <Input {...field} type="email" placeholder="Enter your email" autoComplete="email" />
                {errors.email && touchedFields.email && (
                    <ErrorMessage>
                      {errors.email.message}
                    </ErrorMessage>
                  )}
              </TextField>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              name="dateOfBirth"
              control={control}
              rules={
                {
                  required:{
                    value:true,
                    message:"Email is required"
                  },
          
                  validate: function(value) {
                    const birthDate = new Date(value);
                    const currentYear = new Date().getFullYear();

                    if (Number.isNaN(birthDate.getTime())) {
                      return "Invalid date";
                    }

                    if (currentYear - birthDate.getFullYear() >= 16) {
                      return true;
                    }
                    
                    return "You must be at least 16 years old";
                  }
                }
              }
              render={({field}) => (
                <TextField fullWidth>
                  <Label>Date of Birth</Label>
                  <Input {...field} type="date" placeholder="Enter your date of birth" />
                  {errors.dateOfBirth && touchedFields.dateOfBirth && (
                    <ErrorMessage>
                      {errors.dateOfBirth.message}
                    </ErrorMessage>
                  )}
                </TextField>
              )}
            />

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Label id="gender-label" className="mb-3 block text-sm font-medium text-slate-700">
                Select your Gender
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({field}) => (
                  <RadioGroup aria-labelledby="gender-label" value={field.value} onValueChange={field.onChange} orientation="horizontal">
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
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              name="password"
              control={control}
              rules={
                {
                  required:{
                    value:true,
                    message:"Email is required"
                  },
                  pattern:{
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                    message:"Invalid Password"
                  }
                }
              }
              render={({field}) => (
                <TextField fullWidth>
                  <Label>Password</Label>
                  <Input {...field} type="password" placeholder="••••••••" autoComplete="new-password" />
                    {errors.password && touchedFields.password && (
                    <ErrorMessage>
                      {errors.password.message}
                    </ErrorMessage>
                  )}
                </TextField>
              )}
            />

            <Controller
              name="rePassword"
              control={control}
              render={({field}) => (
                <TextField fullWidth>
                  <Label>Confirm Password</Label>
                  <Input {...field} type="password" placeholder="••••••••" autoComplete="new-password" />
                </TextField>
              )}
            />
          </div>

          <Button fullWidth type="submit" className="mt-2 h-12 font-semibold">
            Register
          </Button>
      </form>
    </div>
    </div>
  )
}

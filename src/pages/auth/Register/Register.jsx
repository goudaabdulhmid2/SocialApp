import {Description, Input, Label, TextField, Button, RadioGroup, Radio} from "@heroui/react";

export default function Register() {
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

        <form action="" className="mt-8 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField isRequired fullWidth name="name">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" autoComplete="name" />
              <Description>This field is required</Description>
            </TextField>

            <TextField fullWidth name="username">
              <Label>Username</Label>
              <Input placeholder="Enter username" autoComplete="username" />
              <Description>Choose a unique username for your account</Description>
            </TextField>
          </div>

          <TextField fullWidth name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="Enter your email" autoComplete="email" />
          </TextField>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField fullWidth name="dateOfBirth" type="date">
              <Label>Date of Birth</Label>
              <Input placeholder="Enter your date of birth" />
            </TextField>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Label className="mb-3 block text-sm font-medium text-slate-700">
                Select your Gender
              </Label>
              <RadioGroup defaultValue="male" name="gender" orientation="horizontal">
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
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField name="password" fullWidth type="password">
              <Label>Password</Label>
              <Input placeholder="••••••••" autoComplete="new-password" />
            </TextField>

            <TextField name="rePassword" fullWidth type="password">
              <Label>Confirm Password</Label>
              <Input placeholder="••••••••" autoComplete="new-password" />
            </TextField>
          </div>

          <Button fullWidth type="submit" className="mt-2 h-12 font-semibold">
            Register
          </Button>
      </form>
    </div>
    </div>
  )
}

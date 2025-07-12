"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useToast } from "../hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "./ui/radio-groups"

const baseSchema = {
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
};

const signupSchema = z.object({
  ...baseSchema,
  role: z.enum(["student", "employer"], {
    required_error: "You need to select a role.",
  }),
});

const loginSchema = z.object({
    ...baseSchema,
});


type AuthFormProps = {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const isSignup = type === "signup"
  
  const formSchema = isSignup ? signupSchema : loginSchema;

  const form = useForm<z.infer<typeof signupSchema> | z.infer<typeof loginSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isSignup
      ? { email: "", password: "", role: "student" }
      : { email: "", password: "" },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: `${isSignup ? 'Signup' : 'Login'} successful!`,
      description: "Redirecting to your dashboard...",
    })
    
    // In a real app, you'd handle Firebase auth here.
    // For signup, we use the selected role. For login, we'd fetch it or default.
    const role = 'role' in data ? data.role : 'student';
    router.push(`/dashboard?role=${role}`)
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold font-headline">{isSignup ? "Create an account" : "Welcome back"}</h1>
        <p className="text-balance text-muted-foreground">
          Enter your details below to {isSignup ? "join" : "access"} Praxis
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isSignup && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>I am a...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="student" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Student
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="employer" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Employer
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button type="submit" className="w-full mt-2">
            {isSignup ? "Create account" : "Login"}
          </Button>
          <Button variant="outline" className="w-full">
            {isSignup ? "Sign up with Google" : "Login with Google"}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <Link href={isSignup ? "/login" : "/signup"} className="underline">
          {isSignup ? "Login" : "Sign up"}
        </Link>
      </div>
    </div>
  )
}

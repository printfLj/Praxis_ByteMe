"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { toast, useToast } from "../hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon, FilePenLine, PlusCircle } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { cn } from "../lib/utils"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Badge } from "./ui/badge"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  skills: z.string().min(2, {
    message: "Please list at least one skill.",
  }),
  reward: z.coerce.number().min(1, {
    message: "Reward must be a positive number.",
  }),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
})

const postedJobs = [
    {
      id: 1,
      title: 'Decentralized Voting DApp',
      status: 'In Progress',
      applicants: 5,
      deadline: '2024-08-30',
    },
    {
      id: 5,
      title: 'Technical Documentation for API',
      status: 'Open',
      applicants: 12,
      deadline: '2024-08-28',
    },
]

export function EmployerDashboard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: "",
      reward: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Job Posted Successfully!",
      description: "Your new job contract is now live on the job board.",
    })
    console.log(values)
    form.reset();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Employer Dashboard</h1>
        {/* We can add a Dialog here for a better UX */}
        {/* <Button><PlusCircle className="mr-2 h-4 w-4"/> Post New Job</Button> */}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Posted Jobs</CardTitle>
            <CardDescription>
              Manage your existing job contracts and view applicants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === 'Open' ? 'secondary' : 'default'}>{job.status}</Badge>
                    </TableCell>
                    <TableCell>{job.applicants}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <FilePenLine />
                    Post a New Job
                </CardTitle>
                <CardDescription>
                Fill out the form below to create a new job contract.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Build a DApp Frontend" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Describe the project, deliverables, and expectations."
                                className="resize-none"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Required Skills</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., React, Solidity, Figma" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter comma-separated skills.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="reward"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reward (USDC)</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="1000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="deadline"
                            render={({ field }) => (
                                <FormItem className="flex flex-col pt-2">
                                <FormLabel>Deadline</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                   
                   
                    <Button type="submit" className="w-full">Post Job Contract</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </>
  )
}

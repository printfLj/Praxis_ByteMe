import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Trophy,
  Star,
  DollarSign
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

export function StudentDashboard() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Student Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">
              +10.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              +1 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <p className="text-xs text-muted-foreground">To 50%</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>
                Your currently assigned projects.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/jobs">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Type
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Next Milestone
                  </TableHead>
                  <TableHead className="text-right">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Decentralized Voting App</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Innovate Co.
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Smart Contract
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      In Progress
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    UI/UX Mockups
                  </TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                    <div className="font-medium">E-commerce Platform</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Shopify Killer Inc.
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Frontend Dev
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      In Progress
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    Database Schema
                  </TableCell>
                  <TableCell className="text-right">$550.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Assessments</CardTitle>
            <CardDescription>
              New skill tests to level up your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                 <div className="p-2 bg-primary/10 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Advanced Solidity
                </p>
                <p className="text-sm text-muted-foreground">
                  Test your smart contract security knowledge.
                </p>
              </div>
              <Button asChild size="sm" className="ml-auto">
                <Link href="/assessments/1">Start</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
               <Avatar className="hidden h-9 w-9 sm:flex">
                 <div className="p-2 bg-primary/10 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  React Performance
                </p>
                <p className="text-sm text-muted-foreground">
                  Optimize a React application for speed.
                </p>
              </div>
               <Button asChild size="sm" className="ml-auto">
                <Link href="/assessments/2">Start</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

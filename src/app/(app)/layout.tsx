
"use client"

import Link from "next/link"
import {
  GraduationCap,
  Home,
  Briefcase,
  Trophy,
  User,
  Search,
  FilePlus2,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { UserNav } from "../../components/user-nav"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function StudentNav() {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/dashboard?role=student"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/assessments?role=student"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <GraduationCap className="h-4 w-4" />
        Assessments
      </Link>
      <Link
        href="/jobs?role=student"
        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      >
        <Briefcase className="h-4 w-4" />
        Jobs
      </Link>
      <Link
        href="/leaderboard?role=student"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Trophy className="h-4 w-4" />
        Leaderboard
      </Link>
      <Link
        href="/profile?role=student"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <User className="h-4 w-4" />
        Profile
      </Link>
    </nav>
  );
}

function EmployerNav() {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/dashboard?role=employer"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
       <Link
        href="/dashboard?role=employer" // Pointing to dashboard where job creation happens
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <FilePlus2 className="h-4 w-4" />
        Post a Job
      </Link>
      <Link
        href="/leaderboard?role=employer"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Trophy className="h-4 w-4" />
        Find Talent
      </Link>
       <Link
        href="/profile?role=employer"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <User className="h-4 w-4" />
        Company Profile
      </Link>
    </nav>
  );
}

function AppLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams();
  const userRole = searchParams.get("role") || "student";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href={`/dashboard?role=${userRole}`} className="flex items-center gap-2 font-bold font-headline text-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="">SkillHarbor</span>
            </Link>
          </div>
          <div className="flex-1">
            {userRole === 'student' ? <StudentNav /> : <EmployerNav />}
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="font-headline">Go Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserNav />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppLayoutContent>{children}</AppLayoutContent>
    </Suspense>
  )
}

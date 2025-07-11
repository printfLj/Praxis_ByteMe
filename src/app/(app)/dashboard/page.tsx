
"use client";

import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { StudentDashboard } from "../../../components/student-dashboard";
import { EmployerDashboard } from "../../../components/employer-dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";

function DashboardContent() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get("role") || "student";

  return (
    <>
      {userRole === 'student' ? <StudentDashboard /> : <EmployerDashboard />}
    </>
  )
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
       <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

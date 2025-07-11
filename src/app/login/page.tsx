import { AuthForm } from "../../components/auth-form"
import { GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <AuthForm type="login" />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/1200x900.png"
          alt="Login image"
          data-ai-hint="university campus"
          width="1200"
          height="900"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

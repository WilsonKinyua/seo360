"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      console.log("Reset password for:", email)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo and Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl">
              SEO
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Check your email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent a password reset link to your email
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Reset link sent!</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We've sent a password reset link to{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {email}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Click the link in the email to reset your password. 
                    If you don't see it, check your spam folder.
                  </p>
                </div>

                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    The link will expire in 1 hour for security reasons.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3 pt-4">
                  <Link href="/auth/login">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Back to sign in
                    </Button>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setIsSubmitted(false)
                      setEmail("")
                    }}
                  >
                    Try with different email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Didn't receive the email?{" "}
            <button
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
              onClick={() => {
                setIsSubmitted(false)
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false)
                  setIsSubmitted(true)
                }, 1500)
              }}
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl">
            SEO
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Forgot your password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Reset password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={cn(
                      "pl-10 h-11",
                      error && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send reset link
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Link
              href="/auth/login"
              className="flex items-center justify-center w-full text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </CardFooter>
        </Card>

        {/* Help text */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>Remember your password? <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 underline">Sign in</Link></p>
          <p>Don't have an account? <Link href="/auth/register" className="text-blue-600 hover:text-blue-500 underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
} 
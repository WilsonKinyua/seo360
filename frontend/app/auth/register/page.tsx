"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Building, Chrome, AlertCircle, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    marketingEmails: false
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "One number", met: /\d/.test(formData.password) },
    { text: "One special character", met: /[@$!%*?&]/.test(formData.password) }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name) {
      newErrors.name = "Full name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.role) {
      newErrors.role = "Please select your role"
    }

    const allPasswordRequirementsMet = passwordRequirements.every(req => req.met)
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!allPasswordRequirementsMet) {
      newErrors.password = "Password does not meet requirements"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log("Register with:", formData)
    }, 2000)
  }

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true)
    
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false)
      console.log("Google OAuth signup")
    }, 1500)
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
            Join SEO360 today
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start optimizing
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Create account</CardTitle>
            <CardDescription className="text-center">
              Get started with your free account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google OAuth Button */}
            <Button
              variant="outline"
              className="w-full h-11 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Chrome className="mr-2 h-4 w-4" />
              )}
              Sign up with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  Or sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={cn(
                      "pl-10 h-11",
                      errors.name && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={cn(
                      "pl-10 h-11",
                      errors.email && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company name
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Enter your company name"
                    className="pl-10 h-11"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Your role *
                </Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleInputChange("role", value)}
                  disabled={isLoading || isGoogleLoading}
                >
                  <SelectTrigger className={cn(
                    "h-11",
                    errors.role && "border-red-500 focus:ring-red-500"
                  )}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business_owner">Business Owner</SelectItem>
                    <SelectItem value="marketing_manager">Marketing Manager</SelectItem>
                    <SelectItem value="seo_specialist">SEO Specialist</SelectItem>
                    <SelectItem value="agency_owner">Agency Owner</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={cn(
                      "pl-10 pr-10 h-11",
                      errors.password && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || isGoogleLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className={cn(
                          "w-3 h-3 rounded-full flex items-center justify-center",
                          req.met ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        )}>
                          {req.met && <Check className="w-2 h-2" />}
                        </div>
                        <span className={req.met ? "text-green-600" : "text-gray-500"}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={cn(
                      "pl-10 pr-10 h-11",
                      errors.confirmPassword && "border-red-500 focus-visible:ring-red-500"
                    )}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    disabled={isLoading || isGoogleLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading || isGoogleLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Marketing */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => 
                      handleInputChange("acceptTerms", checked as boolean)
                    }
                    disabled={isLoading || isGoogleLoading}
                    className={errors.acceptTerms ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:text-blue-500 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketingEmails}
                    onCheckedChange={(checked) => 
                      handleInputChange("marketingEmails", checked as boolean)
                    }
                    disabled={isLoading || isGoogleLoading}
                  />
                  <Label
                    htmlFor="marketing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send me product updates and SEO tips
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Separator />
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 
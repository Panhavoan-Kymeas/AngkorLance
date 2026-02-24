



const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-4 flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold text-foreground">
              FreelanceHub
            </span>
          </Link>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Get started with FreelanceHub today</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>I want to...</Label>
              <RadioGroup
                value={selectedRole}
                onValueChange={(value) =>
                  setValue("role", value as "client" | "freelancer")
                }
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="client"
                    id="client"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="client"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="font-medium">Hire Talent</span>
                    <span className="text-xs text-muted-foreground">
                      Post jobs
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="freelancer"
                    id="freelancer"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="freelancer"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="font-medium">Find Work</span>
                    <span className="text-xs text-muted-foreground">
                      Submit proposals
                    </span>
                  </Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-sm text-destructive">
                  {errors.role.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default RegisterPage;

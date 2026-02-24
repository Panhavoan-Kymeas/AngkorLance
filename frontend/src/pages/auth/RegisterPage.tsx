import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, MagnifyingGlass } from "phosphor-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import AuthLayout from "../../layouts/AuthLayout";
import { useToast } from "../../hooks/use-toast";

type Role = "client" | "freelancer";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [role, setRole] = useState<Role>("freelancer");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description:
          "Please make sure your password and confirm password are identical.",
      });
      return;
    }

    // TODO: Replace with actual registration API call
    console.log("Registering user", { ...form, role });

    toast({
      title: "Account Created",
      description: "Your AngkorLance account has been successfully created!",
    });

    navigate("/login");
  };

  return (
    <AuthLayout>
      {/* Form Card */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <div
          className="flex items-center gap-2 mb-6 justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Briefcase size={28} weight="bold" />
          <span className="text-2xl font-bold">AngkorLance</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join AngkorLance and start connecting with top talent
        </p>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={update("name")}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={update("email")}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={update("password")}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
            />
          </div>
        </div>

        {/* Role Selection */}
        <p className="mt-6 mb-3 text-sm font-semibold text-center text-gray-700">
          I want to...
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            {
              key: "client",
              title: "Hire Talent",
              desc: "Post jobs",
              icon: <Users size={28} weight="bold" className="text-primary" />,
            },
            {
              key: "freelancer",
              title: "Find Work",
              desc: "Submit proposals",
              icon: (
                <MagnifyingGlass
                  size={28}
                  weight="bold"
                  className="text-primary"
                />
              ),
            },
          ].map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key as Role)}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border transition-all duration-200
        ${
          role === r.key
            ? "border-primary bg-primary/10 shadow-md"
            : "border-gray-200 hover:shadow-sm hover:border-primary"
        }`}
            >
              {r.icon}
              <span className="font-medium text-gray-900">{r.title}</span>
              <span className="text-sm text-gray-500">{r.desc}</span>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <Button className="w-full py-3 mb-4" onClick={handleSubmit}>
          Create Account
        </Button>

        {/* Switch to Login */}
        <p className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <Button
            variant="link"
            className="text-primary font-medium hover:underline p-0"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
}

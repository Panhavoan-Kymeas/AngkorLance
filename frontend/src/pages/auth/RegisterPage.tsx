import { useState } from "react";
import type { ChangeEvent } from "react" 
import { useNavigate } from "react-router-dom";
import { Briefcase, Users, MagnifyingGlass } from "phosphor-react";
import { Input } from "../../components/ui/input"; 
import { Label } from "../../components/ui/label";
import AuthLayout from "../../layouts/AuthLayout";

type Role = "client" | "freelancer";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("freelancer");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Add your registration API call here
    console.log("Registering", { ...form, role });
    navigate("/login"); // redirect after successful registration
  };

  return (
    <AuthLayout>
      {/* Logo */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Briefcase size={28} weight="bold" />
        <span className="text-2xl font-bold">AngkorLance</span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2 text-center">Create Your Account</h2>
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
      <p className="mt-6 mb-2 text-sm font-semibold text-center">I want to...</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`p-4 border rounded-lg flex flex-col items-center text-center cursor-pointer ${
            role === "client" ? "border-primary bg-primary/10" : "border-gray-200"
          }`}
          onClick={() => setRole("client")}
        >
          <Users size={24} weight="bold" className="mb-2 text-primary" />
          <div className="font-medium">Hire Talent</div>
          <div className="text-sm text-gray-500">Post jobs</div>
        </div>

        <div
          className={`p-4 border rounded-lg flex flex-col items-center text-center cursor-pointer ${
            role === "freelancer" ? "border-primary bg-primary/10" : "border-gray-200"
          }`}
          onClick={() => setRole("freelancer")}
        >
          <MagnifyingGlass size={24} weight="bold" className="mb-2 text-primary" />
          <div className="font-medium">Find Work</div>
          <div className="text-sm text-gray-500">Submit proposals</div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 rounded bg-primary text-white font-semibold hover:bg-primary-dark transition mb-4"
      >
        Create Account
      </button>

      {/* Switch to Login */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button
          className="text-primary font-medium hover:underline"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </p>
    </AuthLayout>
  );
}
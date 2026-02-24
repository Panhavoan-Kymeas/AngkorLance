import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeSlash } from "phosphor-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import AuthLayout from "../../layouts/AuthLayout";
import { useToast } from "../../hooks/use-toast";
import { loginApi, type LoginPayload } from "../../api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const update = (field: keyof LoginPayload) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please enter both email and password.",
      });
      return;
    }

    try {
      const res = await loginApi(form);

      // Save token
      localStorage.setItem("token", res.data.token);

      toast({
        title: "Login Successful",
        description: `Welcome back, ${res.data.name}!`,
      });

      // Redirect based on role
      if (res.data.role === "FREELANCER") {
        navigate("/freelancer/browse-jobs");
      } else {
        navigate("/client/dashboard");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
    }
  };

  return (
    <AuthLayout>
      {/* Logo */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer justify-center"
        onClick={() => navigate("/")}
      >
        <Briefcase size={28} weight="bold" />
        <span className="text-2xl font-bold">AngkorLance</span>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Log in to your AngkorLance account
      </p>

      <div className="space-y-4">
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={update("password")}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4" onClick={handleLogin}>
        Log in
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <Button
          variant="link"
          className="text-primary font-medium hover:underline p-0"
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
      </p>
    </AuthLayout>
  );
}
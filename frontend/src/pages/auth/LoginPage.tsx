import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeSlash } from "phosphor-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import AuthLayout from "../../layouts/AuthLayout";
import { useToast } from "../../hooks/use-toast";
import { loginApi } from "../../api/auth";
import type { LoginPayload } from "../../types/auth";
import { useAuth } from "../../contexts/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Input handler
  const update =
    (field: keyof LoginPayload) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value.trim() }));
    };

  // Login handler
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please enter both email and password.",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await loginApi(form);

      if (!res.success || !res.data) {
        // Prefer backend error inside data.login if available
        const errorMessage =
          res.data?.login || res.message || "Invalid email or password";

        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });
        return;
      }

      // login success
      localStorage.setItem("token", res.data.token);
      login(res.data);

      toast({
        title: "Login Successful",
        description: `Welcome back, ${res.data.name}!`,
      });

      navigate(res.data.role === "FREELANCER" ? "/freelancer" : "/client", {
        replace: true,
      });
    } catch (error: unknown) {
      // Narrow unknown to AxiosError
      const axiosError = error as { response?: { data?: { data?: { login?: string }; message?: string } } } | undefined;

      const backendMessage =
        axiosError?.response?.data?.data?.login ||
        axiosError?.response?.data?.message ||
        (error instanceof Error ? error.message : "Invalid email or password");

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: backendMessage,
      });
    } finally {
      setLoading(false);
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

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-4"
      >
        <fieldset disabled={loading} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={update("email")}
              autoFocus
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
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button className="w-full mt-4" type="submit">
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </fieldset>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <Button
          variant="link"
          className="text-primary font-medium hover:underline p-0"
          onClick={() => navigate("/auth/register")}
        >
          Sign up
        </Button>
      </p>
    </AuthLayout>
  );
}

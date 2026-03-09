import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import logoImage from "@/assets/logo.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Welcome back!");
      navigate("/admin");
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await resetPassword(email);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent! Check your inbox.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <img src={logoImage} alt="Rising Star Elevator" className="h-16 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isForgotPassword ? "Reset Password" : "Admin Login"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isForgotPassword ? "Enter your email to receive a reset link" : "Enter your credentials to access the CMS"}
            </p>
          </div>

          <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
              {isLoading ? "Please wait..." : isForgotPassword ? "Send Reset Link" : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsForgotPassword(!isForgotPassword)}
              className="text-sm text-accent hover:underline"
            >
              {isForgotPassword ? "Back to Login" : "Forgot Password?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

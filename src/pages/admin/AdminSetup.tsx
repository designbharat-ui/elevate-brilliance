import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import logoImage from "@/assets/logo.png";

export default function AdminSetup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [alreadySetup, setAlreadySetup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin already exists by trying to query user_roles
    const check = async () => {
      const { data } = await supabase.from("user_roles").select("id").limit(1);
      if (data && data.length > 0) {
        setAlreadySetup(true);
      }
      setChecking(false);
    };
    check();
  }, []);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.functions.invoke("create-admin", {
      body: { email, password },
    });

    if (error || data?.error) {
      toast.error(data?.error || error?.message || "Setup failed");
    } else {
      toast.success("Admin account created! You can now login.");
      navigate("/admin/login");
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (alreadySetup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <div className="bg-card rounded-lg shadow-xl p-8 max-w-md text-center">
          <ShieldCheck className="h-12 w-12 text-accent mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Already Configured</h1>
          <p className="text-muted-foreground mb-4">An admin account already exists.</p>
          <Button onClick={() => navigate("/admin/login")} className="btn-gold">Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <img src={logoImage} alt="Rising Star Elevator" className="h-16 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground">Initial Setup</h1>
            <p className="text-muted-foreground text-sm mt-1">Create your admin account to get started</p>
          </div>

          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label>Admin Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@yourcompany.com" required />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full btn-gold" disabled={loading}>
              {loading ? "Creating..." : "Create Admin Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

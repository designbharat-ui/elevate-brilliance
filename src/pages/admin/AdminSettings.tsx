import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Save } from "lucide-react";

export default function AdminSettings() {
  const { updatePassword, user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    const { error } = await updatePassword(newPassword);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
    setSaving(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>

        <Card className="p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-accent" /> Change Password
          </h2>
          <p className="text-sm text-muted-foreground">Logged in as: {user?.email}</p>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="btn-gold" disabled={saving}>
              <Save className="h-4 w-4 mr-2" /> {saving ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}

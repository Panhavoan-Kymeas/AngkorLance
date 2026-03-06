import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ProfilePageProps {
  user: {
    id: number;
    name: string;
    role: "Freelancer" | "Client";
    email: string;
    bio?: string;
    skills?: string[];
    avatarUrl?: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const { toast } = useToast();
  const [bio, setBio] = useState(user.bio || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSave = () => {
    // TODO: Connect to API to update profile
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.role}</p>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      {/* Avatar Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Update Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="border p-2 rounded" />
        {avatar && <p className="mt-1 text-sm text-gray-500">{avatar.name}</p>}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* About Section */}
        <TabsContent value="about" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
            <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. React, Node.js, Figma" />
          </div>
        </TabsContent>

        {/* Portfolio Section */}
        <TabsContent value="portfolio" className="space-y-4">
          <p className="text-gray-500">Upload your projects or add portfolio items here.</p>
          <Button>+ Add Portfolio Item</Button>
        </TabsContent>

        {/* Settings Section */}
        <TabsContent value="settings" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input value={user.email} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Change Password</label>
            <Input type="password" placeholder="New password" />
          </div>
          <Button variant="secondary">Update Settings</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Wallet,
  Globe,
  Moon,
  Sun,
  Key,
  Mail,
  Lock,
  CreditCard,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated!");
  };

  const handleSaveSecurity = () => {
    toast.success("Security settings updated!");
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="container mx-auto max-w-[1600px]">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account preferences and security settings
            </p>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Martinez" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" defaultValue="alex.martinez@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Input
                      placeholder="Tell us about yourself"
                      defaultValue="Full-stack developer with 5+ years of experience in web3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="crypto-gradient text-white" onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">All Email Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive email updates about your gigs and account
                          </div>
                        </div>
                        <Switch
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Gig Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Notifications about gig applications and status changes
                          </div>
                        </div>
                        <Switch defaultChecked disabled={!emailNotifications} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Payment Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Alerts for escrow releases and advance approvals
                          </div>
                        </div>
                        <Switch defaultChecked disabled={!emailNotifications} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Repayment Reminders</div>
                          <div className="text-sm text-muted-foreground">
                            Reminders for upcoming loan repayments
                          </div>
                        </div>
                        <Switch defaultChecked disabled={!emailNotifications} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Marketing Emails</div>
                          <div className="text-sm text-muted-foreground">
                            News, tips, and promotional content
                          </div>
                        </div>
                        <Switch
                          checked={marketingEmails}
                          onCheckedChange={setMarketingEmails}
                          disabled={!emailNotifications}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Browser Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications in your browser
                          </div>
                        </div>
                        <Switch
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Messages</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when you receive messages
                          </div>
                        </div>
                        <Switch defaultChecked disabled={!pushNotifications} />
                      </div>
                    </div>
                  </div>

                  <Button className="crypto-gradient text-white" onClick={handleSaveNotifications}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Protect your account with enhanced security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Change Password</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" placeholder="Enter current password" />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                      <Button variant="outline">Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border">
                      <div>
                        <div className="font-medium mb-1">Enable 2FA</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                    {twoFactorEnabled && (
                      <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="text-sm text-muted-foreground">
                          Scan the QR code with your authenticator app to complete setup.
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* API Key */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">API Access</h3>
                    <div className="space-y-3">
                      <div>
                        <Label>API Key</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            type={showApiKey ? "text" : "password"}
                            value="sk_live_1234567890abcdef"
                            readOnly
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline">Regenerate API Key</Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Connected Sessions */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Active Sessions</h3>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-card/50 border border-border flex items-center justify-between">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-muted-foreground">
                            Chrome on macOS • San Francisco, CA
                          </div>
                        </div>
                        <Badge className="bg-accent text-white">Active</Badge>
                      </div>
                      <div className="p-3 rounded-lg bg-card/50 border border-border flex items-center justify-between">
                        <div>
                          <div className="font-medium">Mobile App</div>
                          <div className="text-sm text-muted-foreground">
                            iPhone • Last active 2 hours ago
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="crypto-gradient text-white" onClick={handleSaveSecurity}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-6">
              <Card className="glass-effect border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Wallet Settings
                  </CardTitle>
                  <CardDescription>Manage your connected wallets and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Connected Wallets */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Connected Wallets</h3>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-card/50 border border-primary/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium mb-1">MetaMask</div>
                            <div className="text-sm text-muted-foreground font-mono">
                              0x1234...5678
                            </div>
                            <Badge className="bg-accent text-white mt-2">Primary</Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            Disconnect
                          </Button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Another Wallet
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Network Settings */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Network Preferences</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Default Network</Label>
                        <Select defaultValue="base-sepolia">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="base-sepolia">Base Sepolia (Testnet)</SelectItem>
                            <SelectItem value="base">Base Mainnet</SelectItem>
                            <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                            <SelectItem value="polygon">Polygon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          <div className="text-sm text-muted-foreground">
                            Currently connected to Base Sepolia testnet
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Gas Settings */}
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Transaction Settings</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Default Gas Priority</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low (Slower, cheaper)</SelectItem>
                            <SelectItem value="medium">Medium (Recommended)</SelectItem>
                            <SelectItem value="high">High (Faster, more expensive)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Auto-approve small transactions</div>
                          <div className="text-sm text-muted-foreground">
                            Skip confirmation for transactions under $10
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Button className="crypto-gradient text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Save Wallet Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Danger Zone */}
          <Card className="glass-effect border-destructive/50 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Lock className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions that affect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div>
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </div>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border">
                <div>
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted-foreground">
                    Download a copy of your account data
                  </div>
                </div>
                <Button variant="outline">Export</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
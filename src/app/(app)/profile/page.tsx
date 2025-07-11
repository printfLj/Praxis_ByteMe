
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { Code, Edit, GraduationCap, PenTool, Star, Wallet } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";
import Link from "next/link";

const earnedBadges = [
  { id: 1, name: 'Junior Developer', icon: <Code className="w-10 h-10" />, date: '2024-05-20' },
  { id: 2, name: 'Technical Writing', icon: <PenTool className="w-10 h-10" />, date: '2024-06-11' },
  { id: 3, name: 'React Fundamentals', icon: <Star className="w-10 h-10" />, date: '2024-07-02' },
];

export default function ProfilePage() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && Array.isArray(accounts) && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            toast({
                title: "Wallet Connected",
                description: "Your MetaMask wallet has been successfully connected.",
            });
        }
      } catch (error: any) {
        console.error("Wallet connection failed:", error);
        toast({
            title: "Connection Failed",
            description: error.message || "Could not connect to MetaMask. Please try again.",
            variant: "destructive",
        });
      }
    } else {
        toast({
            title: "MetaMask Not Found",
            description: "Please install the MetaMask browser extension to connect your wallet.",
            variant: "destructive",
        });
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
        <p className="text-lg text-muted-foreground">
          This is your personal space. Manage your details and view your achievements.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://placehold.co/100x100.png" />
                <AvatarFallback>SN</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">Student Name</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> University of Example
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button variant="outline" className="w-full"><Edit className="w-4 h-4 mr-2" /> Edit Profile</Button>
                 <Separator />
                <div className="space-y-2">
                    <Label htmlFor="wallet">MetaMask Wallet</Label>
                    <div className="flex gap-2">
                        <Input id="wallet" readOnly value={truncateAddress(walletAddress)} placeholder="Not connected" />
                        <Button variant="secondary" className="shrink-0" onClick={connectWallet} disabled={!!walletAddress || !isClient}>
                            {walletAddress ? 'Connected' : 'Connect'}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Connect your wallet to receive badges and payments on the Viction network.</p>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Lifelong Learning Ledger</CardTitle>
              <CardDescription>
                Your collection of verifiable skill badges earned on SkillHarbor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {earnedBadges.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="p-4 text-primary bg-primary/10 rounded-full mb-3">
                        {badge.icon}
                      </div>
                      <p className="font-semibold">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">Earned: {badge.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-semibold">No Badges Yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Complete assessments to start building your ledger.</p>
                  <Button asChild size="sm" className="mt-4">
                    <Link href="/assessments">View Assessments</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

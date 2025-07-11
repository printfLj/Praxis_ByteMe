
"use client"

import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle,
  Circle,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Star,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { Progress } from "../../../../components/ui/progress";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useToast } from "../../../../hooks/use-toast";
import { ethers } from "ethers";

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Mock data for a single job post
const initialJobData = {
  id: 1,
  title: "Decentralized Voting DApp",
  company: "Innovate Co.",
  employer: {
    name: "John Doe",
    avatar: "https://placehold.co/40x40.png",
    wallet: "0xB77E11b86Ba8Cc758FCe254ABafc0B00733f90D7",
  },
  developer: {
    wallet: "0xA166B020d52F10AE80D939fE47be909e654Dc44c",
  },
  payment: 15,
  currency: "USDC",
  deadline: "2024-08-30",
  skills: ["Solidity", "React", "Ethers.js", "Hardhat"],
  description:
    "We are looking for a skilled blockchain developer to build a secure and transparent decentralized voting application on the Viction network. The ideal candidate will have experience in writing and testing Solidity smart contracts and building user-friendly frontends with React.",
  milestones: [
    { id: 1, title: "Smart Contract Development & Testing", reward: 5, completed: false },
    { id: 2, title: "Frontend Integration with Ethers.js", reward: 5, completed: false },
    { id: 3, title: "Deployment and Final Handover", reward: 5, completed: false },
  ],
};

// Assume these are the skills the student has
const studentSkills = ["React", "Solidity", "Ethers.js"];

function JobDetailContent({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const userRole = searchParams.get("role") || "student";
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [jobData, setJobData] = React.useState(initialJobData);

  const handleMilestoneAction = async (milestoneId: number) => {
    const milestone = jobData.milestones.find(m => m.id === milestoneId);
    if (!milestone) return;

    // For employers, this will now trigger a real transaction request
    if (userRole === 'employer') {
        if (!window.ethereum) {
            toast({
                title: "MetaMask Not Found",
                description: "Please install MetaMask to make payments.",
                variant: "destructive"
            });
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const amount = ethers.parseUnits(milestone.reward.toString(), 18); // Assuming 18 decimals for the token/coin

            toast({
                title: "Processing Transaction",
                description: "Please approve the transaction in MetaMask.",
            });
            
            const tx = await signer.sendTransaction({
                to: jobData.developer.wallet,
                value: amount
            });

            await tx.wait(); // Wait for the transaction to be mined

            setJobData(prevData => ({
              ...prevData,
              milestones: prevData.milestones.map(m => 
                m.id === milestoneId ? { ...m, completed: true } : m
              )
            }));
            
            toast({
                title: "Payment Transferred!",
                description: `$${milestone.reward} sent to developer. Tx: ${tx.hash.substring(0,10)}...`
            })

        } catch (error: any) {
             toast({
                title: "Transaction Failed",
                description: error.message || "Something went wrong.",
                variant: "destructive"
            });
            console.error(error);
        }
    } else { // Student's perspective (simulation)
        setJobData(prevData => ({
          ...prevData,
          milestones: prevData.milestones.map(m => 
            m.id === milestoneId ? { ...m, completed: true } : m
          )
        }));
        
        const toastDescription = `$${milestone.reward} USDC transferred to your wallet: ${jobData.developer.wallet.substring(0, 10)}...`;

        toast({
            title: "Milestone Submitted & Payment Released!",
            description: toastDescription,
        })
    }
  };

  const completedMilestones = jobData.milestones.filter(m => m.completed).length;
  const totalMilestones = jobData.milestones.length;
  const progressPercentage = (completedMilestones / totalMilestones) * 100;

  const truncateAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/jobs?role=${userRole}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Board
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Job Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-3xl">{jobData.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                    <Briefcase className="w-4 h-4" /> {jobData.company}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary flex items-center gap-1">
                        <DollarSign className="w-6 h-6"/> {jobData.payment} <span className="text-sm text-muted-foreground">{jobData.currency}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-4 h-4" /> Due by {jobData.deadline}
                    </p>
                  </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none text-card-foreground">
                <h3 className="font-headline text-lg">Project Description</h3>
                <p>{jobData.description}</p>
                
                <h3 className="font-headline text-lg mt-6">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {jobData.skills.map(skill => (
                        <Badge key={skill} variant={studentSkills.includes(skill) ? "default" : "secondary"}>
                            {studentSkills.includes(skill) && <Star className="w-3 h-3 mr-1"/>}
                            {skill}
                        </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contract Milestones</CardTitle>
              <CardDescription>
                {userRole === 'employer' 
                  ? "Verify milestones to release payments from the secure escrow."
                  : "Submit your work for each milestone to receive payment upon verification."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{completedMilestones} / {totalMilestones} Completed</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
              <ul className="space-y-4">
                {jobData.milestones.map((milestone) => (
                  <li key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {milestone.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">{milestone.completed ? 'Payment Released' : 'Pending Submission'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-primary">${milestone.reward}</div>
                      {!milestone.completed && (
                        <Button size="sm" onClick={() => handleMilestoneAction(milestone.id)} disabled={!isClient}>
                            {userRole === 'employer' ? 'Verify & Release' : 'Submit for Verification'}
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarImage src={jobData.employer.avatar} alt={jobData.employer.name} />
                <AvatarFallback>{jobData.employer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-xl">{jobData.employer.name}</CardTitle>
              <CardDescription>Employer</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
              <Button variant="secondary" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Employer
              </Button>
            </CardContent>
          </Card>

           <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Wallet className="w-5 h-5"/>
                Smart Contract
              </CardTitle>
              <CardDescription>
                This job is managed by a secure smart contract. Funds are held in escrow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-1">Employer's Wallet:</div>
              <div className="text-sm font-mono bg-background p-2 rounded-md truncate">{truncateAddress(jobData.employer.wallet)}</div>
              <div className="text-xs text-muted-foreground mt-2 mb-1">Developer's Wallet:</div>
              <div className="text-sm font-mono bg-background p-2 rounded-md truncate">{truncateAddress(jobData.developer.wallet)}</div>
              <Separator className="my-4" />
              <p className="text-sm text-center text-muted-foreground">
                If your application is accepted, you will be prompted to connect your MetaMask wallet to co-sign the contract.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
    return (
        <React.Suspense fallback={<div>Loading job details...</div>}>
            <JobDetailContent params={params} />
        </React.Suspense>
    )
}

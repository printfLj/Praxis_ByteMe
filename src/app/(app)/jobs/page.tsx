import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Briefcase, DollarSign, Clock, Search, Star } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

const jobs = [
  {
    id: 1,
    title: 'Decentralized Voting DApp',
    company: 'Innovate Co.',
    payment: 1200,
    currency: 'USDC',
    deadline: '2024-08-30',
    skills: ['Solidity', 'React', 'Ethers.js'],
  },
  {
    id: 2,
    title: 'NFT Marketplace UI Design',
    company: 'ArtBlock Inc.',
    payment: 800,
    currency: 'USDC',
    deadline: '2024-09-15',
    skills: ['UI/UX', 'Figma'],
  },
  {
    id: 3,
    title: 'Backend for Analytics Dashboard',
    company: 'Data Insights',
    payment: 2000,
    currency: 'USDC',
    deadline: '2024-09-20',
    skills: ['Node.js', 'PostgreSQL', 'DevOps'],
  },
  {
    id: 4,
    title: 'AI Chatbot Integration',
    company: 'Future AI',
    payment: 1500,
    currency: 'USDC',
    deadline: '2024-08-25',
    skills: ['Python', 'AI', 'API Integration'],
  },
    {
    id: 5,
    title: 'Technical Documentation for API',
    company: 'Innovate Co.',
    payment: 500,
    currency: 'USDC',
    deadline: '2024-08-28',
    skills: ['Technical Writing'],
  },
    {
    id: 6,
    title: 'Frontend for DeFi Protocol',
    company: 'MoneyChain',
    payment: 2500,
    currency: 'USDC',
    deadline: '2024-10-01',
    skills: ['React', 'Web3', 'Ethers.js'],
  },
];

// Assume these are the skills the student has earned badges for
const studentSkills = ['React', 'Solidity', 'Technical Writing', 'Ethers.js'];

const getRecommendedJobs = (jobs: any[], studentSkills: string[]) => {
    return jobs.filter(job => 
        job.skills.some((skill: string) => studentSkills.includes(skill))
    );
};

export default function JobsPage() {
  const recommendedJobs = getRecommendedJobs(jobs, studentSkills);
  const otherJobs = jobs.filter(job => !recommendedJobs.includes(job));

  const renderJobCard = (job: any, recommended = false) => (
      <Card key={job.id} className="flex flex-col relative overflow-hidden">
        {recommended && (
            <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-accent-foreground bg-accent/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3"/>
                <span>Recommended for you</span>
            </div>
        )}
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-muted rounded-full">
                    <Briefcase className="w-6 h-6 text-foreground" />
                </div>
                <div>
                    <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                </div>
            </div>
            
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex justify-around text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{job.payment} {job.currency}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Due {job.deadline}</span>
              </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill: any) => (
                <Badge key={skill} variant={studentSkills.includes(skill) ? "default" : "secondary"}>{skill}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-col items-start gap-2">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Job Board</h1>
            <p className="text-lg text-muted-foreground">
            Find your next project. Your verified skills make you stand out.
            </p>
        </div>
      </div>

      <div className="mb-8 p-4 border rounded-lg bg-card flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by title, company, or skill..." className="pl-10" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by Skill" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="solidity">Solidity</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="ui-ux">UI/UX</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="payment">Highest Payment</SelectItem>
                    <SelectItem value="deadline">Closest Deadline</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      
      {recommendedJobs.length > 0 && (
          <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight font-headline mb-6">Recommended For You</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedJobs.map(job => renderJobCard(job, true))}
              </div>
          </div>
      )}

       <div>
            <h2 className="text-2xl font-bold tracking-tight font-headline mb-6">All Jobs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherJobs.map(job => renderJobCard(job, false))}
            </div>
      </div>
    </div>
  );
}

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Check, Star, Code, PenTool, Bot } from 'lucide-react';
import Link from 'next/link';

const assessments = [
  {
    id: '1',
    title: 'Junior Developer Coding Test',
    description: 'A foundational test covering data structures, algorithms, and basic programming concepts in JavaScript.',
    tags: ['Coding', 'JavaScript', 'Algorithms'],
    icon: <Code className="w-8 h-8 text-primary" />,
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'UI/UX Design Task',
    description: 'Design a user flow and create high-fidelity mockups for a mobile application. Evaluates creativity and tool proficiency.',
    tags: ['Design', 'UI', 'UX', 'Figma'],
    icon: <PenTool className="w-8 h-8 text-primary" />,
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Advanced Solidity Smart Contracts',
    description: 'An in-depth assessment on writing secure, efficient, and complex smart contracts on an EVM-compatible chain.',
    tags: ['Web3', 'Solidity', 'Smart Contracts'],
    icon: <Star className="w-8 h-8 text-primary" />,
    level: 'Advanced'
  },
  {
    id: '4',
    title: 'AI Prompt Engineering',
    description: 'Craft effective prompts to solve a series of problems using a large language model. Tests logical thinking and creativity.',
    tags: ['AI', 'LLM', 'Prompting'],
    icon: <Bot className="w-8 h-8 text-primary" />,
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Technical Writing & Documentation',
    description: 'Create comprehensive and clear documentation for a sample API. Assesses clarity, structure, and technical accuracy.',
    tags: ['Writing', 'Documentation'],
    icon: <Check className="w-8 h-8 text-primary" />,
    level: 'Beginner'
  },
  {
    id: '6',
    title: 'DevOps & CI/CD Pipeline',
    description: 'Configure a continuous integration and deployment pipeline for a sample web application using GitHub Actions.',
    tags: ['DevOps', 'CI/CD', 'Automation'],
    icon: <Code className="w-8 h-8 text-primary" />,
    level: 'Advanced'
  },
];


export default function AssessmentsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Skill Assessments</h1>
        <p className="text-lg text-muted-foreground">
          Prove your skills, earn verifiable badges, and unlock new opportunities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map(assessment => (
          <Card key={assessment.id} className="flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                        {assessment.icon}
                    </div>
                    <Badge variant={assessment.level === 'Beginner' ? 'secondary' : assessment.level === 'Intermediate' ? 'outline' : 'default'}>{assessment.level}</Badge>
                </div>
              <CardTitle className="font-headline">{assessment.title}</CardTitle>
              <CardDescription>{assessment.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {assessment.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/assessments/${assessment.id}`}>Start Assessment</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

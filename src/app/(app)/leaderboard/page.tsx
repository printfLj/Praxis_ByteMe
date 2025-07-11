import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Trophy } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: 'Alice Johnson', university: 'Tech University', badges: 8, jobs: 4, avatar: 'https://placehold.co/40x40.png' },
  { rank: 2, name: 'Bob Williams', university: 'Design Institute', badges: 7, jobs: 3, avatar: 'https://placehold.co/40x40.png' },
  { rank: 3, name: 'Charlie Brown', university: 'Code Academy', badges: 6, jobs: 3, avatar: 'https://placehold.co/40x40.png' },
  { rank: 4, name: 'Diana Miller', university: 'State University', badges: 5, jobs: 2, avatar: 'https://placehold.co/40x40.png' },
  { rank: 5, name: 'Ethan Davis', university: 'Tech University', badges: 5, jobs: 1, avatar: 'https://placehold.co/40x40.png' },
  { rank: 6, name: 'Fiona Garcia', university: 'Code Academy', badges: 4, jobs: 2, avatar: 'https://placehold.co/40x40.png' },
];

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Leaderboard</h1>
        <p className="text-lg text-muted-foreground">
          See who's at the top. Complete more jobs and assessments to climb the ranks!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead className="hidden md:table-cell">University</TableHead>
                <TableHead className="text-center">Badges</TableHead>
                <TableHead className="text-center">Jobs Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map(student => (
                <TableRow key={student.rank} className={student.rank <= 3 ? "bg-muted/50" : ""}>
                  <TableCell className="font-bold text-lg">
                    <div className="flex items-center justify-center">
                        {student.rank <= 3 ? <Trophy className={`w-6 h-6 mr-2 ${student.rank === 1 ? 'text-yellow-500' : student.rank === 2 ? 'text-gray-400' : 'text-yellow-700'}`} /> : null}
                        {student.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{student.university}</TableCell>
                  <TableCell className="text-center font-semibold">{student.badges}</TableCell>
                  <TableCell className="text-center font-semibold">{student.jobs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

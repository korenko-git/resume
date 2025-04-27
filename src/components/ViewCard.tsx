import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ViewCardProps {
  title: string;
  description: string;
}

export function ViewCard({ title, description }: ViewCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <div>{description}</div>
      </CardContent>
    </Card>
  );
}
'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useResume } from '@/contexts/ResumeContext';
import Resume from '@/components/resume';

export default function Home() {
  const { data, loading, error } = useResume();
  const router = useRouter();

  if (loading) {
    return <div className="container mx-auto py-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Ошибка: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Мое Резюме</h1>
        <Button onClick={() => router.push('/editor')}>
          Редактировать
        </Button>
      </div>
      
      
      <Resume data={data} editable={false} />
    </div>
  );
}
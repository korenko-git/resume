'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { OrganizationModal } from './OrganizationModal';
import type { ResumeData } from '@/types/resume';
import { useResume } from '@/contexts/ResumeContext';

interface EditableCardProps {
  id: string;
  typeData: keyof ResumeData;
  editable?: boolean;
}

export function EditableCard({ 
  id,
  typeData,
  editable = true 
}: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const { getData, updateData, organizations } = useResume();
  const [data, setData] = useState(getData(typeData, id));

  if (!data) return null;

  const organization = data.organizationId ? organizations.find(org => org.id === data.organizationId) : undefined;

  const handleUpdate = () => {
    if (data) updateData(typeData, data);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleOrgClick = (e: React.MouseEvent) => {
    if (editable) {
      e.stopPropagation();
      setIsOrgModalOpen(true);
    }
  };

  const formatDate = (date: string) => {
    return date ? new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    }) : 'Present';
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader className="flex flex-row gap-4">
        {organization?.logo && (
          <div 
            className={`flex-shrink-0 ${editable  ? 'cursor-pointer' : ''}`}
            onClick={handleOrgClick}
          >
            <img 
              src={organization.logo} 
              alt={`${organization.title} logo`} 
              className="w-12 h-12 rounded-md object-contain bg-white"
            />
          </div>
        )}
        <div className="flex-grow space-y-1">
          {isEditing ? (
            <>
              <Input
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              {'date' in data && (
                <Input
                  type="month"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="mt-2"
                />
              )}
              {'startDate' in data && (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="month"
                    value={data.startDate}
                    onChange={(e) => setData({ ...data, startDate: e.target.value })}
                    placeholder="Start date"
                  />
                  <Input
                    type="month"
                    value={data.endDate}
                    onChange={(e) => setData({ ...data, endDate: e.target.value })}
                    placeholder="End date"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <h3 
                className={`text-lg font-semibold ${editable ? 'cursor-pointer' : ''}`}
                onClick={handleClick}
              >
                {data.title}
              </h3>
              {organization && (
                <div className="text-sm text-muted-foreground">
                  {organization.url ? (
                    <a 
                      href={organization.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {organization.title}
                    </a>
                  ) : (
                    organization.title
                  )}
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                {'date' in data && formatDate(data.date)}
                {'startDate' in data && `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`}
              </div>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <>
            <Textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="mb-4"
            />
            <div className="flex items-center gap-4">
              <Switch
                checked={data.isPublished}
                onCheckedChange={(checked) => setData({ ...data, isPublished: checked })}
              />
              <span>Published</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={handleUpdate} variant="default">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div 
            className={editable ? 'cursor-pointer' : ''}
            onClick={handleClick}
          >
            {data.description}
          </div>
        )}
      </CardContent>

      {editable && (
        <OrganizationModal
          isOpen={isOrgModalOpen}
          onClose={() => setIsOrgModalOpen(false)}
          organizationId={data.organizationId}
          updateOrganizonId={(id) => setData({...data, organizationId: id })}
        />
      )}
    </Card>
  );
}
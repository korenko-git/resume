'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { OrganizationModal } from './OrganizationModal';
import type { ResumeData } from '@/types/resume';
import { useResume } from '@/contexts/ResumeContext';
import { EditableHeader } from '@/components/EditableCard/EditableHeader';
import { EditableContent } from '@/components/EditableCard/EditableContent';
import { SkillsList } from './EntryBlock/Skills/SkillsList';
import { EditableButtons } from './EditableCard/EditableButtons';
import { SocialLinks } from './EditableCard/SocialLinks';

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
  const { getData, updateData, organizations } = useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [data, setData] = useState(getData(typeData, id));

  if (!data) return null;

  useEffect(() => {
    setData(getData(typeData, id));
  }, [getData, id, typeData]);

  const organization = data.organizationId
    ? organizations.find(org => org.id === data.organizationId)
    : undefined;

  const handleUpdate = () => {
    updateData(typeData, data);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setData(getData(typeData, id));
    setIsEditing(false);
  };

  return (
    <Card className="w-full mt-4">
      <EditableHeader
        isEditing={isEditing}
        data={data}
        organization={organization}
        editable={editable}
        onDataChange={setData}
        onEditStart={handleEditStart}
        onOrgModalOpen={() => setIsOrgModalOpen(true)}
      />

      <CardContent>
        <EditableContent
          onDataChange={setData}
          isEditing={isEditing}
          data={data}
          onEditStart={handleEditStart}
        />

        {('skills' in data) && (
          <SkillsList
            skills={data.skills}
            isEditing={isEditing}
            onUpdate={(newSkills: string[]) => setData({ ...data, skills: newSkills })}
          />
        )}

        {('github' in data) && (
          <SocialLinks
            isEditing={isEditing}
            data={data}
            onDataChange={setData}
          />
        )}

        {isEditing && (
          <EditableButtons
            data={data}
            onDataChange={setData}
            onUpdate={handleUpdate}
            onCancel={handleCancel}
          />
        )}
      </CardContent>

      {isEditing && (
        <OrganizationModal
          isOpen={isOrgModalOpen}
          onClose={() => setIsOrgModalOpen(false)}
          organizationId={data.organizationId}
          updateOrganizonId={(id) => setData({ ...data, organizationId: id })}
        />
      )}
    </Card>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Organization } from '@/types/resume';
import { useResume } from '@/contexts/ResumeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId?: string;
  updateOrganizonId: (id: string) => void;
}

export function OrganizationModal({
  isOpen,
  onClose,
  organizationId,
  updateOrganizonId
}: OrganizationModalProps) {
  const { organizations, updateOrganization } = useResume();
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [formData, setFormData] = useState<Organization>({
    id: '',
    title: '',
    description: '',
    url: '',
    logo: ''
  });

  useEffect(() => {
    if (organizationId) {
      setSelectedOrgId(organizationId);
      const organization = organizations.find(entry => entry.id === organizationId);
      if (organization) {
        setFormData(organization);
      }
    }
  }, [organizationId, organizations]);

  const handleSelectChange = (value: string) => {
    setSelectedOrgId(value);
    if (value === 'new') {
      setFormData({
        id: `org-${Date.now()}`,
        title: '',
        description: '',
        url: '',
        logo: ''
      });
    } else {
      const selectedOrg = organizations.find(org => org.id === value);
      if (selectedOrg) {
        setFormData(selectedOrg);
      }
    }
  };

  const handleSave = () => {
    if (organizationId && organizationId !== formData.id) {
      updateOrganizonId(formData.id);
    }

    updateOrganization(formData);
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Организация</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Select value={selectedOrgId} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите организацию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Добавить новую организацию</SelectItem>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Название
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Описание
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                URL
              </label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Логотип
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="URL логотипа"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="max-w-[150px]"
                />
              </div>
              {formData.logo && (
                <div className="mt-2">
                  <img 
                    src={formData.logo} 
                    alt="Предпросмотр логотипа" 
                    className="w-16 h-16 object-contain bg-white rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
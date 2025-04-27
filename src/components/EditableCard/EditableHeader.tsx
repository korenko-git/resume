import { CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Organization } from '@/types/resume';

interface EditableHeaderProps {
  isEditing: boolean;
  data: {
    title: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    organizationId?: string;
  };
  organization?: Organization;
  editable: boolean;
  onDataChange: (data: any) => void;
  onEditStart: () => void;
  onOrgModalOpen: () => void;
}

const formatDate = (date?: string) => {
  return date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : 'Present';
};

export function EditableHeader({
  isEditing,
  data,
  organization,
  editable,
  onDataChange,
  onEditStart,
  onOrgModalOpen
}: EditableHeaderProps) {
  return (
    <CardHeader className="flex flex-row gap-4">
      {organization?.logo && (
        <div
          className={`flex-shrink-0 ${editable ? 'cursor-pointer' : ''}`}
          onClick={onOrgModalOpen}
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
              onChange={(e) => onDataChange({ ...data, title: e.target.value })}
            />
            {'date' in data && (
              <Input
                type="month"
                value={data.date}
                onChange={(e) => onDataChange({ ...data, date: e.target.value })}
                className="mt-2"
              />
            )}
            {'startDate' in data && (
              <div className="flex gap-2 mt-2">
                <Input
                  type="month"
                  value={data.startDate}
                  onChange={(e) => onDataChange({ ...data, startDate: e.target.value })}
                  placeholder="Start date"
                />
                <Input
                  type="month"
                  value={data.endDate}
                  onChange={(e) => onDataChange({ ...data, endDate: e.target.value })}
                  placeholder="End date"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <h3
              className={`text-lg font-semibold ${editable ? 'cursor-pointer' : ''}`}
              onClick={onEditStart}
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
  );
}
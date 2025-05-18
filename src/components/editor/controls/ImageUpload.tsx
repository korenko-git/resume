import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/common/ui/button';
import { Label } from '@/components/common/ui/label';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxSize?: number; // in bytes
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  className,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB default
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setError(`File is too large. Maximum size: ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setError(null);
    
    // Reading file as Data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      
      <div className="flex flex-col items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        
        {value ? (
          <div className="relative w-full max-w-xs">
            <img
              src={value}
              alt="Uploaded image"
              className="w-full h-auto rounded-md object-contain max-h-48 border border-border"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={handleClear}
              aria-label="Delete image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-border rounded-md p-6 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-accent/10 transition-colors"
            onClick={handleButtonClick}
          >
            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload image</p>
            <p className="text-xs text-muted-foreground/70 mt-1">or drag and drop file here</p>
          </div>
        )}
        
        {!value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleButtonClick}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload image
          </Button>
        )}
        
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
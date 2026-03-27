import { useContext, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import MediaLibraryDialog from '~/components/MediaLibraryDialog';
import type { MediaFile } from '~/routes/api_/media/_media-list';

export type ImageValue = {
  url: string;
  alt: string;
};

type Props = {
  /**
   * The id of the field.
   */
  id: string;

  /**
   * The name used for form submission.
   */
  name: string;

  /**
   * The label for the field.
   */
  label: string;

  /**
   * The initial value.
   */
  value?: Partial<ImageValue>;

  /**
   * Validation errors. Accepts either string[] or Zod formatted { _errors: string[] }.
   */
  errors?: {
    url?: string[] | { _errors: string[] };
    alt?: string[] | { _errors: string[] };
  };

  /**
   * Callback when value changes.
   */
  onChange?: (value: ImageValue) => void;

  /**
   * Custom upload handler.
   */
  onUpload?: (file: File) => Promise<MediaFile | null>;
};

export default function ImageSelectionField({
  id,
  name,
  label,
  value: initialValue,
  errors,
  onChange,
  onUpload,
}: Props) {
  const { t } = useTranslation('ImageSelectionField');
  const { SlButton, SlInput, SlIcon, SlAlert, SlSpinner } =
    useContext(ShoelaceContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<ImageValue>({
    url: initialValue?.url ?? '',
    alt: initialValue?.alt ?? '',
  });

  function handleImageSelect(file: MediaFile) {
    const newValue = {
      url: file.url,
      alt: value.alt || file.name,
    };
    setValue(newValue);
    onChange?.(newValue);
  }

  function handleAltChange(event: CustomEvent) {
    const newAlt = (event.target as HTMLInputElement).value;
    const newValue = { ...value, alt: newAlt };
    setValue(newValue);
    onChange?.(newValue);
  }

  function handleClearImage() {
    const newValue = { url: '', alt: '' };
    setValue(newValue);
    onChange?.(newValue);
  }

  async function uploadFile(file: File): Promise<MediaFile | null> {
    if (!file.type.startsWith('image/')) return null;

    const formData = new FormData();
    formData.append('media', file);

    const response = await fetch('/beheer/media/uploaden', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.file || null;
    }
    return null;
  }

  async function handleFileUpload(file: File) {
    setIsUploading(true);
    try {
      const uploaded = await uploadFile(file);
      if (uploaded) {
        handleImageSelect(uploaded);
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDialogUpload(file: File): Promise<MediaFile | null> {
    return uploadFile(file);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  const getErrors = (
    error: string[] | { _errors: string[] } | undefined,
  ): string[] => {
    if (!error) return [];
    if (Array.isArray(error)) return error;
    return error._errors || [];
  };

  const urlErrors = getErrors(errors?.url);
  const altErrors = getErrors(errors?.alt);
  const hasUrlError = urlErrors.length > 0;
  const hasAltError = altErrors.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <label className="font-medium text-gray-700">{label}</label>

      <div className="flex gap-4 items-start">
        {value.url ?
          <div className="relative w-32 h-32 rounded border border-gray-200 overflow-hidden group">
            <img
              src={value.url}
              alt={value.alt}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title={t('RemoveImage')}
            >
              <SlIcon name="x" />
            </button>
          </div>
        : <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-32 h-32 rounded border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging ? 'border-primary bg-primary/10'
              : hasUrlError ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
            }`}
          >
            {isUploading ?
              <SlSpinner
                style={{ fontSize: '1.5rem' } as React.CSSProperties}
              />
            : <>
                <SlIcon
                  name="cloud-upload"
                  className="text-gray-400 text-2xl mb-1"
                />
                <span className="text-xs text-gray-500 text-center px-2">
                  {t('DropOrClick')}
                </span>
              </>
            }
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
              disabled={isUploading}
            />
          </label>
        }

        <div className="flex-1 flex flex-col gap-2">
          <SlButton variant="default" onClick={() => setDialogOpen(true)}>
            <SlIcon name="folder-open" slot="prefix" />
            {t('SelectImage')}
          </SlButton>

          <SlInput
            id={`${id}-alt`}
            label={t('AltText')}
            value={value.alt}
            onSlChange={handleAltChange}
            className={hasAltError ? 'part-[base]:border-red-300' : ''}
          />
        </div>
      </div>

      {hasUrlError && (
        <SlAlert open variant="danger">
          {urlErrors.join(', ')}
        </SlAlert>
      )}

      {hasAltError && (
        <SlAlert open variant="danger">
          {altErrors.join(', ')}
        </SlAlert>
      )}

      <MediaLibraryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleImageSelect}
        onUpload={onUpload || handleDialogUpload}
      />

      <input type="hidden" name={`${name}.url`} value={value.url} />
      <input type="hidden" name={`${name}.alt`} value={value.alt} />
    </div>
  );
}

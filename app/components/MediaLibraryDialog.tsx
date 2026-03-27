import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import type { MediaFile } from '~/routes/api_/media/_media-list';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (file: MediaFile) => void;
  onUpload?: (file: File) => Promise<MediaFile | null>;
};

export default function MediaLibraryDialog({
  open,
  onClose,
  onSelect,
  onUpload,
}: Props) {
  const { t } = useTranslation('MediaLibraryDialog');
  const { SlDialog, SlButton, SlSpinner, SlInput, SlIcon } =
    useContext(ShoelaceContext);

  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchMedia();
    }
  }, [open]);

  async function fetchMedia() {
    setLoading(true);
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !onUpload) return;

    setUploading(true);
    try {
      const uploaded = await onUpload(file);
      if (uploaded) {
        setFiles((prev) => [uploaded, ...prev]);
        onSelect(uploaded);
        onClose();
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setUploading(false);
    }
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      file.type.startsWith('image/'),
  );

  return (
    <SlDialog
      open={open}
      label={t('Title')}
      className="media-library-dialog"
      onSlRequestClose={onClose}
      style={{ '--width': '800px' } as React.CSSProperties}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <SlInput
            className="flex-1"
            placeholder={t('SearchPlaceholder')}
            value={searchTerm}
            onSlInput={(e: CustomEvent) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
          >
            <SlIcon name="search" slot="prefix" />
          </SlInput>

          {onUpload && (
            <label>
              <SlButton variant="primary" loading={uploading}>
                <SlIcon name="upload" slot="prefix" />
                {t('UploadButton')}
              </SlButton>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {loading ?
          <div className="flex justify-center p-8">
            <SlSpinner style={{ fontSize: '2rem' } as React.CSSProperties} />
          </div>
        : <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
            {filteredFiles.map((file) => (
              <button
                key={file.key}
                type="button"
                onClick={() => {
                  onSelect(file);
                  onClose();
                }}
                className="group relative h-32 rounded border border-gray-200 overflow-hidden hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {file.name}
                </div>
              </button>
            ))}

            {filteredFiles.length === 0 && !loading && (
              <div className="col-span-4 text-center py-8 text-gray-500">
                {t('NoImages')}
              </div>
            )}
          </div>
        }
      </div>

      <SlButton slot="footer" variant="default" onClick={onClose}>
        {t('CancelButton')}
      </SlButton>
    </SlDialog>
  );
}

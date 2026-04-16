import React, { useCallback, useState, useEffect } from 'react';
import { useStaticT } from '@/lib/staticTranslate';
import { UploadCloud, File as FileIcon, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/src/components/ui/use-toast';

const FileUpload = ({ files, onFilesChange, onFileRemove }) => {
  const { t } = useStaticT('newCustomerForm');
  const maxSize = 26214400; // 25MB
  const [useDropzone, setUseDropzone] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lazy load react-dropzone
  useEffect(() => {
    import('react-dropzone').then(module => {
      setUseDropzone(() => module.useDropzone);
      setLoading(false);
    }).catch(error => {
      console.error('Failed to load react-dropzone:', error);
      setLoading(false);
    });
  }, []);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    onFilesChange(acceptedFiles);

    if (fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach(error => {
          let message = error.message;
          if (error.code === 'file-too-large') {
            message = t('errors.fileTooLarge', { maxSize: formatBytes(maxSize) });
          } else if (error.code === 'file-invalid-type') {
            message = t('errors.fileInvalidType');
          }
          toast({
            title: t('errors.fileUploadErrorTitle', { fileName: file.name }),
            description: message,
            variant: 'destructive',
          });
        });
      });
    }
  }, [onFilesChange, maxSize, t]);

  const dropzoneConfig = {
    onDrop,
    maxSize,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone ? useDropzone(dropzoneConfig) : { getRootProps: () => ({}), getInputProps: () => ({}), isDragActive: false };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 border-2 border-gray-300 dark:border-border border-dashed rounded-lg">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500 dark:text-muted-foreground" />
      </div>
    );
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-gray-500 dark:text-muted-foreground flex-shrink-0" />;
    }
    return <FileIcon className="w-5 h-5 text-gray-500 dark:text-muted-foreground flex-shrink-0" />;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 dark:border-border border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragActive ? 'bg-green-50 dark:bg-emerald-950/40 border-green-400 dark:border-emerald-500' : 'bg-gray-50 dark:bg-muted/40 md:hover:bg-gray-100 dark:md:hover:bg-muted/60'}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 mb-3 text-gray-500 dark:text-muted-foreground" />
        <p className="mb-2 text-sm text-gray-500 dark:text-muted-foreground text-center">
          <span className="font-semibold">{t('step3.fileUploadClick')}</span> {t('step3.fileUploadDrag')}
        </p>
        <p className="text-xs text-gray-500 dark:text-muted-foreground">{t('step3.fileUploadHint')}</p>
      </div>

      {files && files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-foreground">{t('step3.fileUploadSelectedFiles', { count: files.length })}</h4>
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-muted rounded-md">
                <div className="flex items-center space-x-2 overflow-hidden">
                  {getFileIcon(file)}
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm font-medium text-gray-800 dark:text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => onFileRemove(file)} className="h-7 w-7 text-gray-500 dark:text-muted-foreground md:hover:text-red-500 md:hover:bg-red-100 dark:md:hover:bg-red-950/50">
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

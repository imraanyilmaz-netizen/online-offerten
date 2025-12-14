import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud, File as FileIcon, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const FileUpload = ({ files, onFilesChange, onFileRemove }) => {
  const { t } = useTranslation('newCustomerForm');
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
      <div className="flex items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
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
      return <ImageIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />;
    }
    return <FileIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragActive ? 'bg-green-50 border-green-400' : 'bg-gray-50 hover:bg-gray-100'}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 mb-3 text-gray-500" />
        <p className="mb-2 text-sm text-gray-500 text-center">
          <span className="font-semibold">{t('step3.fileUploadClick')}</span> {t('step3.fileUploadDrag')}
        </p>
        <p className="text-xs text-gray-500">{t('step3.fileUploadHint')}</p>
      </div>

      {files && files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{t('step3.fileUploadSelectedFiles', { count: files.length })}</h4>
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2 overflow-hidden">
                  {getFileIcon(file)}
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => onFileRemove(file)} className="h-7 w-7 text-gray-500 hover:text-red-500 hover:bg-red-100">
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
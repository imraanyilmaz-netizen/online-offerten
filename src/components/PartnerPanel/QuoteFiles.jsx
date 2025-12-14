import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Paperclip, File as FileIcon, Download, Image as ImageIcon } from 'lucide-react';
import { parseFileUrls } from '@/lib/utils';

const QuoteFiles = ({ fileUrls }) => {
  const { t } = useTranslation('partnerDashboard');
  
  const files = parseFileUrls(fileUrls);

  if (!files || files.length === 0) {
    return null;
  }

  const getFileIcon = (fileName) => {
    if (!fileName) return <FileIcon className="h-full w-full p-2 text-gray-400" />;
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <ImageIcon className="h-full w-full p-2 text-gray-500" />;
    }
    if (extension === 'pdf') {
      return <FileIcon className="h-full w-full p-2 text-red-500" />;
    }
    if (['doc', 'docx'].includes(extension)) {
      return <FileIcon className="h-full w-full p-2 text-blue-500" />;
    }
    return <FileIcon className="h-full w-full p-2 text-gray-500" />;
  };

  const getFileName = (url) => {
    try {
        const path = new URL(url).pathname.split('/');
        return decodeURIComponent(path[path.length - 1]);
    } catch {
        return "Unbekannte Datei";
    }
  };

  return (
    <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg">
      <div className="flex items-start gap-3">
        <Paperclip size={18} className="text-gray-600 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            {t('quoteModal.filesTitle')} ({files.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {files.map((url, index) => {
              const fileName = getFileName(url);
              return (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={fileName}
                  className="block group"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center p-2.5 bg-white rounded-md border border-gray-200 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                      {getFileIcon(fileName)}
                    </div>
                    <div className="ml-2.5 flex-grow min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{fileName}</p>
                      <p className="text-[11px] text-gray-500">{t('quoteModal.downloadFile')}</p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteFiles;
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Users, Send, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const statusConfig = {
  new_quote: {
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    text: 'Anfrage eingegangen',
    description: 'Die Kundenanfrage ist im System eingegangen.',
    color: 'border-blue-500',
  },
  matched: {
    icon: <Users className="h-5 w-5 text-yellow-500" />,
    text: 'Partner zugewiesen',
    description: 'Passende Partner wurden für die Anfrage gefunden und zugewiesen.',
    color: 'border-yellow-500',
  },
  approved: {
    icon: <Send className="h-5 w-5 text-purple-500" />,
    text: 'An Partner gesendet',
    description: 'Die Anfrage wurde an die Partner zum Kauf gesendet.',
    color: 'border-purple-500',
  },
  completed: {
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    text: 'Abgeschlossen',
    description: 'Der Anfrageprozess ist abgeschlossen.',
    color: 'border-green-500',
  },
  archived: {
    icon: <Archive className="h-5 w-5 text-gray-500" />,
    text: 'Archiviert',
    description: 'Die Anfrage wurde ins Archiv verschoben.',
    color: 'border-gray-500',
  },
};

const statusTimeline = ['new_quote', 'matched', 'approved', 'completed'];

const QuoteStatusView = ({ quote }) => {
  const currentStatusIndex = statusTimeline.indexOf(quote.status);

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-slate-100 border-t border-slate-200 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <h4 className="text-base font-semibold mb-4 text-gray-800">Anfrage-Zeitleiste</h4>
        <div className="relative pl-4">
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-200"></div>
          {statusTimeline.map((status, index) => {
            const isActive = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const config = statusConfig[status];

            return (
              <div key={status} className="relative flex items-start mb-6 last:mb-0">
                <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full">
                    {React.cloneElement(config.icon, { className: `h-5 w-5 ${isActive ? 'text-green-600' : 'text-gray-500'}` })}
                  </div>
                </div>
                <div className="ml-4 pt-2">
                  <p className={`font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>{config.text}</p>
                  <p className="text-sm text-gray-600">{config.description}</p>
                  {isCurrent && (
                    <p className="text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Letzte Aktualisierung: {format(new Date(quote.updated_at || quote.created_at), "d MMM yyyy, HH:mm", { locale: de })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteStatusView;
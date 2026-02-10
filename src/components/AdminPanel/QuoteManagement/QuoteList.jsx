import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
// framer-motion removed - CSS for better INP

const QuoteItem = ({ quote, onAction, actionLabel, actionIcon, renderActions }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('de-CH');
  };

  const name = `${quote.firstname || ''} ${quote.lastname || ''}`.trim() || 'N/A';
  const service = `${quote.servicetype || ''} ${quote.umzugart ? `(${quote.umzugart})` : ''}`.trim() || 'N/A';

  return (
    <div
      layout
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 hover:bg-slate-50 rounded-lg transition-colors"
    >
      <div className="flex-grow mb-3 sm:mb-0">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">
          {quote.email} • {service}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          <Clock className="w-3 h-3 inline-block mr-1" />
          {formatDate(quote.created_at)}
        </p>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-center">
        {renderActions ? (
          renderActions(quote)
        ) : (
          <Button onClick={() => onAction(quote)} variant="default" size="sm">
            {actionIcon}
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

const QuoteList = ({ title, quotes, onAction, actionLabel, actionIcon, icon, iconColor, renderActions }) => {
  if (!quotes || quotes.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className={`font-semibold text-gray-700 mb-4 flex items-center gap-2 ${iconColor}`}>
          {icon}
          {title} ({quotes.length})
        </h3>
        <div className="divide-y divide-gray-100">
          
            {quotes.map(quote => (
              <QuoteItem
                key={quote.id}
                quote={quote}
                onAction={onAction}
                actionLabel={actionLabel}
                actionIcon={actionIcon}
                renderActions={renderActions}
              />
            ))}
          
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteList;
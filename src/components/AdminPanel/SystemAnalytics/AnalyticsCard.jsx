import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const AnalyticsCard = ({ title, icon, children }) => {
  return (
    <Card>
      {title && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-700">
              {icon}
              {title}
            </h3>
          </div>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AnalyticsCard;
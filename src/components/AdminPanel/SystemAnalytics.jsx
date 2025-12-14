import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, PieChart, Activity } from 'lucide-react';

import AnalyticsCard from '@/components/AdminPanel/SystemAnalytics/AnalyticsCard';
import TimeRangeSelector from '@/components/AdminPanel/SystemAnalytics/TimeRangeSelector';
import DailyTrendChart from '@/components/AdminPanel/SystemAnalytics/DailyTrendChart';
import TopPartnersList from '@/components/AdminPanel/SystemAnalytics/TopPartnersList';
import DistributionList from '@/components/AdminPanel/SystemAnalytics/DistributionList';
import RevenueChart from '@/components/AdminPanel/SystemAnalytics/RevenueChart';
import useSystemAnalytics from '@/hooks/useSystemAnalytics';

const SystemAnalytics = ({ quotes, partners }) => {
  const [timeRange, setTimeRange] = useState('30');
  const analyticsData = useSystemAnalytics(timeRange, quotes, partners);

  return (
    <div className="space-y-6">
      <AnalyticsCard>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <BarChart3 className="w-5 h-5" />
            System-Analyse
          </h2>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>
      </AnalyticsCard>

      <AnalyticsCard
        title="Täglicher Anfrage-Trend"
        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
      >
        <DailyTrendChart data={analyticsData.dailyQuotes} />
      </AnalyticsCard>

      <AnalyticsCard
        title="Top-Partner"
        icon={<Users className="w-5 h-5 text-purple-600" />}
      >
        <TopPartnersList partners={analyticsData.topPartners} />
      </AnalyticsCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCard
          title="Dienstleistungsverteilung"
          icon={<PieChart className="w-5 h-5 text-green-600" />}
        >
          <DistributionList data={analyticsData.serviceDistribution} type="service" />
        </AnalyticsCard>

        <AnalyticsCard
          title="Beliebte Regionen"
          icon={<Activity className="w-5 h-5 text-orange-600" />}
        >
          <DistributionList data={analyticsData.regionDistribution} type="region" />
        </AnalyticsCard>
      </div>

      <AnalyticsCard
        title="Monatlicher Umsatztrend"
        icon={null}
      >
        <RevenueChart data={analyticsData.monthlyRevenue} />
      </AnalyticsCard>
    </div>
  );
};

export default SystemAnalytics;
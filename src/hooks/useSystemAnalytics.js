import { useState, useEffect, useMemo } from 'react';

const useSystemAnalytics = (timeRange, quotes, partners) => {
  const analyticsData = useMemo(() => {
    const days = parseInt(timeRange);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const filteredQuotes = quotes.filter(q => new Date(q.created_at) >= startDate);

    const generateDailyQuotes = () => {
      const dailyData = {};
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dailyData[currentDate.toISOString().split('T')[0]] = 0;
        currentDate.setDate(currentDate.getDate() + 1);
      }
      filteredQuotes.forEach(quote => {
        const quoteDate = new Date(quote.created_at).toISOString().split('T')[0];
        if (dailyData.hasOwnProperty(quoteDate)) dailyData[quoteDate]++;
      });
      return Object.entries(dailyData).map(([date, count]) => ({
        date, count,
        formattedDate: new Date(date).toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })
      }));
    };

    const generateMonthlyRevenue = () => {
      const monthlyData = {};
      const currentDate = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey] = { revenue: 0, formattedMonth: date.toLocaleDateString('de-DE', { year: 'numeric', month: 'short' }) };
      }
      // This is a simplified simulation. Real implementation should query purchased_quotes.
      const totalRevenue = partners.reduce((sum, p) => sum + (p.total_revenue || 0), 0);
      const monthlyAverage = totalRevenue / 6;
      Object.keys(monthlyData).forEach(key => {
        monthlyData[key].revenue = monthlyAverage * (0.8 + Math.random() * 0.4);
      });
      return Object.values(monthlyData);
    };

    const generateDistribution = (key) => {
      const count = {};
      quotes.forEach(quote => {
        const value = quote[key];
        if (Array.isArray(value)) {
          value.forEach(item => { count[item] = (count[item] || 0) + 1; });
        } else if (value) {
          const item = value || 'Diğer';
          count[item] = (count[item] || 0) + 1;
        }
      });
      return Object.entries(count).map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    };

    const topPartners = partners
      .filter(p => (p.total_revenue || 0) > 0)
      .sort((a, b) => (b.total_revenue || 0) - (a.total_revenue || 0))
      .slice(0, 5);

    const serviceDistribution = generateDistribution('servicetype');
    const regionDistribution = generateDistribution('selectedregions').slice(0, 10);
    const dailyQuotes = generateDailyQuotes();
    const monthlyRevenue = generateMonthlyRevenue();

    return { dailyQuotes, monthlyRevenue, topPartners, serviceDistribution, regionDistribution };

  }, [timeRange, quotes, partners]);

  return analyticsData;
};

export default useSystemAnalytics;
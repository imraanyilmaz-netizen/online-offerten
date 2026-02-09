import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, Wallet, PlusCircle, Gift, Star, Clock } from 'lucide-react';
// framer-motion removed - CSS for better INP
import { format } from 'date-fns';
import { de } from 'date-fns/locale/de';

const StatCard = ({ title, value, icon: Icon, colorClass, delay, children, className }) => (
  <div 
    className={`h-full ${className}`}
  >
    <Card className="hover:shadow-xl transition-all duration-200 h-full flex flex-col justify-between bg-white border border-gray-200 rounded-xl">
      <CardContent className="p-5 sm:p-6 flex items-start gap-4">
        <div className={`p-3 rounded-xl ${colorClass.bg} flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${colorClass.text}`} />
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</div>
        </div>
        {children}
      </CardContent>
    </Card>
  </div>
);

const SubscriptionStat = ({ endDate, delay }) => {
    const formattedDate = format(new Date(endDate), 'dd. MMMM yyyy', { locale: de });
    return (
        <div 
            className="md:col-span-2 lg:col-span-1"
        >
            <Card className="h-full bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 text-black shadow-xl border-2 border-amber-500 rounded-xl">
                <CardContent className="p-5 sm:p-6 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/30 backdrop-blur-sm flex-shrink-0">
                        <Star className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-amber-900 mb-1">Abonnement aktiv</p>
                        <p className="text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
                            <Clock className="w-5 h-5 flex-shrink-0"/> 
                            <span className="truncate">Gültig bis: {formattedDate}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


const PartnerStats = ({ stats, onTopUpClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      
      {stats.hasActiveSubscription ? (
        <SubscriptionStat endDate={stats.subscriptionEndDate} delay={0.1} />
      ) : (
        <StatCard 
            title="Verfügbare Anfragen" 
            value={stats.availableQuotes} 
            icon={Package} 
            colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}}
            delay={0.1}
        />
      )}

      <StatCard 
        title="Gekaufte Anfragen" 
        value={stats.purchasedQuotes} 
        icon={ShoppingCart} 
        colorClass={{bg: 'bg-green-100', text: 'text-green-600'}}
        delay={0.2}
      />
      
      <StatCard 
        title="Bonus-Guthaben" 
        value={`CHF ${stats.bonusBalance?.toFixed(2) || '0.00'}`} 
        icon={Gift} 
        colorClass={{bg: 'bg-indigo-100', text: 'text-indigo-600'}}
        delay={0.3}
      />

      <StatCard 
        title="Ihr Guthaben" 
        value={`CHF ${stats.mainBalance?.toFixed(2) || '0.00'}`} 
        icon={Wallet} 
        colorClass={{bg: 'bg-yellow-100', text: 'text-yellow-600'}}
        delay={0.4} 
      >
        <Button onClick={onTopUpClick} size="sm" className="sm:hidden flex items-center">
          <PlusCircle className="w-4 h-4 mr-1" />
          Aufladen
        </Button>
      </StatCard>

    </div>
  );
};

export default PartnerStats;
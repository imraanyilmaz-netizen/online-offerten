import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, ShieldCheck, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start text-gray-700 group">
    <Icon size={18} className="mr-4 text-green-600 mt-1 flex-shrink-0" />
    <div className="text-sm">
      <span className="font-semibold text-gray-800">{label}:</span>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

const BooleanDetailItem = ({ icon: Icon, label, value }) => {
  const isAvailable = value === true;
  return (
    <div className="flex items-center text-gray-700">
      <Icon size={18} className="mr-4 text-green-600 flex-shrink-0" />
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        {isAvailable ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : (
          <XCircle size={20} className="text-gray-400" />
        )}
      </div>
    </div>
  );
};


const CompanyDetailsCard = ({ partner }) => {
  const { t } = useTranslation('partnerProfilePage');

  const hasDetails = partner.founding_year || partner.employee_count || partner.has_liability_insurance !== undefined || partner.commercial_register_number;

  if (!hasDetails) {
    return null;
  }

  return (
    <Card className="shadow-lg rounded-xl border border-gray-200 bg-white">
      <CardHeader className="bg-gray-50 rounded-t-xl p-4 border-b border-gray-100">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Building size={18} />
            {t('companyDetailsTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {partner.founding_year && (
          <DetailItem 
            icon={Calendar} 
            label={t('foundingYear')} 
            value={partner.founding_year} 
          />
        )}
        {partner.employee_count && (
          <DetailItem 
            icon={Users} 
            label={t('employeeCount')} 
            value={partner.employee_count} 
          />
        )}
         {partner.commercial_register_number && (
          <DetailItem 
            icon={FileText} 
            label={t('commercialRegisterNumber')} 
            value={partner.commercial_register_number} 
          />
        )}
        {partner.has_liability_insurance !== undefined && (
           <BooleanDetailItem 
            icon={ShieldCheck}
            label={t('liabilityInsurance')}
            value={partner.has_liability_insurance}
           />
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsCard;
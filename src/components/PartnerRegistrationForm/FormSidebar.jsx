import React from 'react';
import { CheckCircle, Circle, Edit3 } from 'lucide-react';
// framer-motion removed - CSS for better INP

const FormSidebar = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Leistungen auswählen', description: 'Wählen Sie Ihre Hauptkategorien' },
    { id: 2, name: 'Regionen auswählen', description: 'Wählen Sie Ihre Service-Regionen' },
    { id: 3, name: 'Firmendaten eingeben', description: 'Vervollständigen Sie Ihr Profil' },
  ];

  const text = {
    title: 'Partner werden',
    subtitle: 'Registrieren Sie Ihr Unternehmen'
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-slate-900">{text.title}</h3>
        <p className="text-slate-500 mb-8">{text.subtitle}</p>
      </div>
      <nav>
        <ul className="space-y-6">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            let Icon = Circle;
            if (isActive) Icon = Edit3;
            if (isCompleted) Icon = CheckCircle;

            return (
              <li 
                key={step.id} 
                className="flex items-start"
              >
                <div className="flex-shrink-0 relative">
                  <Icon className={`w-6 h-6 mr-4 mt-1 transition-colors duration-300 ${isCompleted ? 'text-primary' : isActive ? 'text-primary' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className={`font-semibold transition-colors duration-300 ${isActive || isCompleted ? 'text-primary' : 'text-slate-500'}`}>{step.name}</p>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default FormSidebar;
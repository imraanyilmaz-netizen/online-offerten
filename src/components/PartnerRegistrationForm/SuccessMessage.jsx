import React from 'react';
import { CheckCircle, Mail, ShieldCheck } from 'lucide-react';
// framer-motion removed - CSS for better INP

const SuccessMessage = ({ formData }) => {
  return (
    <div
      className="w-full max-w-lg text-center"
    >
      <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500 mx-auto mb-6" />
      
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
        Registrierung erfolgreich!
      </h1>
      
      <p className="text-muted-foreground text-base md:text-lg mb-4">
        Vielen Dank, {formData.contactPerson || formData.companyName}! Ihr Profil wurde erstellt und wartet auf die Überprüfung durch unser Team.
      </p>

      <p className="text-muted-foreground mb-8">
        Wir werden Sie per E-Mail an <Mail className="inline-block h-4 w-4 mr-1.5 relative -top-px" />
        <span className="font-medium text-foreground">{formData.email}</span> benachrichtigen, sobald Ihr Konto aktiviert wurde.
      </p>
      
      <div className="inline-flex items-center justify-center bg-muted text-muted-foreground text-sm px-4 py-2 rounded-full">
        <ShieldCheck className="h-4 w-4 mr-2" />
        <span>Sichere Registrierung</span>
      </div>
    </div>
  );
};

export default SuccessMessage;
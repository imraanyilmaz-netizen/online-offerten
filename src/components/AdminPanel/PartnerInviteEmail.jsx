'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Mail, Plus, X, Loader2, Send } from 'lucide-react';

const PartnerInviteEmail = () => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState([
    { name: '', email: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const addCompany = () => {
    setCompanies([...companies, { name: '', email: '' }]);
  };

  const removeCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const updateCompany = (index, field, value) => {
    const updated = [...companies];
    updated[index][field] = value;
    setCompanies(updated);
  };

  const handleSendInvites = async () => {
    // Validate
    const validCompanies = companies.filter(c => c.name.trim() && c.email.trim());
    
    if (validCompanies.length === 0) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte geben Sie mindestens eine Firma mit Name und E-Mail ein.",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = validCompanies.filter(c => !emailRegex.test(c.email));
    
    if (invalidEmails.length > 0) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: `Ungültige E-Mail-Adressen: ${invalidEmails.map(c => c.email).join(', ')}`,
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('partner-einladung-email', {
        body: {
          companies: validCompanies.map(c => ({
            name: c.name.trim(),
            email: c.email.trim()
          }))
        }
      });

      if (error) {
        throw error;
      }

      const successCount = data.results?.filter(r => r.success).length || 0;
      const failCount = validCompanies.length - successCount;

      if (successCount > 0) {
        toast({
          title: "Erfolg",
          description: `${successCount} Einladung(en) erfolgreich gesendet${failCount > 0 ? `, ${failCount} fehlgeschlagen` : ''}`,
        });
        
        // Clear form
        setCompanies([{ name: '', email: '' }]);
      } else {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Keine E-Mails konnten gesendet werden. Bitte versuchen Sie es erneut.",
        });
      }
    } catch (error) {
      console.error('Error sending invites:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message || "Fehler beim Senden der Einladungen",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Partner Einladung Mail
          </CardTitle>
          <CardDescription>
            Senden Sie Einladungs-E-Mails an potenzielle Partner. Geben Sie Firma und E-Mail-Adresse ein.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {companies.map((company, index) => (
            <div key={index} className="flex gap-4 items-end p-4 border rounded-lg bg-gray-50">
              <div className="flex-1">
                <Label htmlFor={`name-${index}`}>Firma name</Label>
                <Input
                  id={`name-${index}`}
                  value={company.name}
                  onChange={(e) => updateCompany(index, 'name', e.target.value)}
                  placeholder="Firma name"
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`email-${index}`}>Emailadrese</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={company.email}
                  onChange={(e) => updateCompany(index, 'email', e.target.value)}
                  placeholder="Emailadrese"
                  className="mt-1"
                />
              </div>
              {companies.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCompany(index)}
                  className="mb-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={addCompany}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Weitere Firma hinzufügen
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={handleSendInvites}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Einladung senden
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerInviteEmail;


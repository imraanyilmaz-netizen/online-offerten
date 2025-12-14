import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AddressInput from './AddressInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Briefcase, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Step3CompanyData = ({ formData, onInputChange, onValueChange }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const employeeCountOptions = [
    { value: '1-5', label: '1-5 Mitarbeiter' },
    { value: '6-10', label: '6-10 Mitarbeiter' },
    { value: '11-20', label: '11-20 Mitarbeiter' },
    { value: '21+', label: '21+ Mitarbeiter' }
  ];

  const handleAddressSelect = (address) => {
    onValueChange('address_street', address.street);
    onValueChange('address_zip', address.postcode);
    onValueChange('address_city', address.city);
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    onValueChange(id, value);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-slate-800">Firmendaten eingeben</h3>
      <p className="text-slate-500 mb-8">Vervollständigen Sie Ihr Profil</p>
      
      <div className="space-y-6">
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="h-5 w-5 text-primary" />
              Kontaktdaten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Firmenname *</Label>
                <Input id="companyName" value={formData.companyName} onChange={onInputChange} required />
              </div>
              <div>
                <Label htmlFor="contactPerson">Ansprechpartner *</Label>
                <Input id="contactPerson" value={formData.contactPerson} onChange={onInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">E-Mail *</Label>
                <Input id="email" type="email" value={formData.email} onChange={onInputChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Telefon *</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={onInputChange} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-green-800">
              <Lock className="h-5 w-5 text-green-600" />
              Partner Panel Zugang
            </CardTitle>
            <p className="text-sm text-green-700">
              Erstellen Sie ein sicheres Passwort für den Zugang zu Ihrem Partner-Dashboard
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock size={16} className="text-green-600" />
                  Passwort *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password || ''}
                    onChange={handlePasswordChange}
                    placeholder="Passwort eingeben"
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Mindestens 8 Zeichen, empfohlen: Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen
                </p>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                  <Lock size={16} className="text-green-600" />
                  Passwort bestätigen *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword || ''}
                    onChange={handlePasswordChange}
                    placeholder="Passwort bestätigen"
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    Passwörter stimmen nicht überein
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Firmenadresse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-5">
                <Label htmlFor="address_street">Straße</Label>
                <AddressInput
                  value={formData.address_street}
                  onChange={onInputChange}
                  onSelect={handleAddressSelect}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address_zip">PLZ</Label>
                <Input id="address_zip" value={formData.address_zip} onChange={onInputChange} />
              </div>
              <div className="md:col-span-3">
                <Label htmlFor="address_city">Ort</Label>
                <Input id="address_city" value={formData.address_city} onChange={onInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-primary" />
              Zusätzliche Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={formData.website} onChange={onInputChange} placeholder="https://www.beispiel.ch" />
              </div>
              <div>
                <Label htmlFor="year_founded">Gründungsjahr</Label>
                <Input id="year_founded" type="number" value={formData.year_founded} onChange={onInputChange} placeholder="z.B. 2020" />
              </div>
              <div>
                <Label>Anzahl Mitarbeiter</Label>
                <Select onValueChange={(value) => onValueChange('employee_count', value)} value={formData.employee_count}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeCountOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Haftpflichtversicherung</Label>
                <RadioGroup
                  onValueChange={(value) => onValueChange('liability_insurance', value === 'true')}
                  value={formData.liability_insurance === null ? '' : String(formData.liability_insurance)}
                  className="flex items-center space-x-4 h-10"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="liability_yes" />
                    <Label htmlFor="liability_yes" className="font-normal cursor-pointer">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="liability_no" />
                    <Label htmlFor="liability_no" className="font-normal cursor-pointer">Nein</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="commercial_register_number">Handelsregisternummer</Label>
                <Input id="commercial_register_number" value={formData.commercial_register_number} onChange={onInputChange} placeholder="z.B. CHE-123.456.789" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 border-green-200/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Bestätigung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => onValueChange('agreedToTerms', checked)}
                className="mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agreedToTerms"
                  className="text-sm text-slate-600 leading-relaxed"
                >
                  Ich akzeptiere die <a href="/agb" target="_blank" rel="noopener noreferrer" className="underline text-green-600 hover:text-green-800">Allgemeinen Geschäftsbedingungen</a> und die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="underline text-green-600 hover:text-green-800">Datenschutzerklärung</a>.
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step3CompanyData;
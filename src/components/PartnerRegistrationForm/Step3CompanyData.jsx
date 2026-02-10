import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AddressInput from './AddressInput';
import LogoUpload from './LogoUpload';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Briefcase, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Step3CompanyData = ({ formData, onInputChange, onValueChange, onLogoChange, errors = {} }) => {
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
    <div className="space-y-8">
    <div>
        <h3 className="text-2xl font-bold mb-3 text-slate-900">Firmendaten eingeben</h3>
        <p className="text-slate-600 text-base">Vervollständigen Sie Ihr Profil mit Ihren Firmendaten</p>
      </div>
      
      <div className="space-y-6">
        
        <Card className="border-2 border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              Kontaktdaten & Firmenadresse
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Kontaktdaten</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-semibold text-slate-700">
                      Firmenname <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="companyName" 
                      value={formData.companyName} 
                      onChange={onInputChange} 
                      required 
                      className={`h-11 ${errors.companyName ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-green-500"}`}
                      placeholder="Firmenname eingeben"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-600 font-medium mt-1.5">{errors.companyName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-sm font-semibold text-slate-700">
                      Ansprechpartner <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="contactPerson" 
                      value={formData.contactPerson} 
                      onChange={onInputChange} 
                      required 
                      className={`h-11 ${errors.contactPerson ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-green-500"}`}
                      placeholder="Name des Ansprechpartners"
                    />
                    {errors.contactPerson && (
                      <p className="text-sm text-red-600 font-medium mt-1.5">{errors.contactPerson}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      E-Mail-Adresse <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={onInputChange} 
                      required 
                      className={`h-11 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-green-500"}`}
                      placeholder="beispiel@firma.ch"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 font-medium mt-1.5">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                      Telefonnummer <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={onInputChange} 
                      required 
                      className={`h-11 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-green-500"}`}
                      placeholder="+41 XX XXX XX XX"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 font-medium mt-1.5">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Firmenadresse
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address_street" className="text-sm font-semibold text-slate-700">
                      Strasse
                    </Label>
                    <AddressInput
                      value={formData.address_street}
                      onChange={onInputChange}
                      onSelect={handleAddressSelect}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address_zip" className="text-sm font-semibold text-slate-700">
                      PLZ
                    </Label>
                    <Input 
                      id="address_zip" 
                      value={formData.address_zip} 
                      onChange={onInputChange}
                      className="h-11 border-slate-300 focus-visible:ring-green-500"
                      placeholder="z.B. 8000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address_city" className="text-sm font-semibold text-slate-700">
                      Ort
                    </Label>
                    <Input 
                      id="address_city" 
                      value={formData.address_city} 
                      onChange={onInputChange}
                      className="h-11 border-slate-300 focus-visible:ring-green-500"
                      placeholder="z.B. Zürich"
                    />
              </div>
              </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/30 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-green-900">
              <div className="p-2 bg-green-100 rounded-lg">
              <Lock className="h-5 w-5 text-green-600" />
              </div>
              Partner Panel Zugang
            </CardTitle>
            <p className="text-sm text-green-700 mt-2">
              Erstellen Sie ein sicheres Passwort für den Zugang zu Ihrem Partner-Dashboard
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Lock size={16} className="text-green-600" />
                  Passwort <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password || ''}
                    onChange={handlePasswordChange}
                    placeholder="Mindestens 8 Zeichen"
                    required
                    className={`h-11 pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-green-500"}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                    )}
                  </Button>
                </div>
                {errors.password ? (
                  <p className="text-sm text-red-600 font-medium mt-1.5">{errors.password}</p>
                ) : (
                  <p className="text-xs text-slate-500 mt-1.5">
                  Mindestens 8 Zeichen, empfohlen: Gross-/Kleinbuchstaben, Zahlen und Sonderzeichen
                </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Lock size={16} className="text-green-600" />
                  Passwort bestätigen <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword || ''}
                    onChange={handlePasswordChange}
                    placeholder="Passwort wiederholen"
                    required
                    className={`h-11 pr-10 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-green-500"}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 font-medium mt-1.5">{errors.confirmPassword}</p>
                )}
                {!errors.confirmPassword && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-600 font-medium mt-1.5">
                    Passwörter stimmen nicht überein
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              Zusätzliche Details
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">Optionale Informationen über Ihr Unternehmen</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-semibold text-slate-700">
                  Website
                </Label>
                <Input 
                  id="website" 
                  value={formData.website} 
                  onChange={onInputChange} 
                  placeholder="https://www.beispiel.ch"
                  className="h-11 border-slate-300 focus-visible:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year_founded" className="text-sm font-semibold text-slate-700">
                  Gründungsjahr
                </Label>
                <Input 
                  id="year_founded" 
                  type="number" 
                  value={formData.year_founded} 
                  onChange={onInputChange} 
                  placeholder="z.B. 2020"
                  className="h-11 border-slate-300 focus-visible:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  Anzahl Mitarbeiter
                </Label>
                <Select onValueChange={(value) => onValueChange('employee_count', value)} value={formData.employee_count}>
                  <SelectTrigger className="h-11 border-slate-300 focus:ring-green-500">
                    <SelectValue placeholder="Bitte wählen..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeCountOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-slate-700">
                  Haftpflichtversicherung <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => onValueChange('liability_insurance', value === 'true')}
                  value={formData.liability_insurance === null ? '' : String(formData.liability_insurance)}
                  className={`flex items-center space-x-6 h-11 ${errors.liability_insurance ? 'border-red-500' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="liability_yes" />
                    <Label htmlFor="liability_yes" className="font-normal cursor-pointer text-slate-700">Ja</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="liability_no" />
                    <Label htmlFor="liability_no" className="font-normal cursor-pointer text-slate-700">Nein</Label>
                  </div>
                </RadioGroup>
                {errors.liability_insurance && (
                  <p className="text-sm text-red-600 mt-1">{errors.liability_insurance}</p>
                )}
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="commercial_register_number" className="text-sm font-semibold text-slate-700">
                  Handelsregisternummer <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="commercial_register_number" 
                  value={formData.commercial_register_number} 
                  onChange={onInputChange} 
                  placeholder="z.B. CHE-123.456.789"
                  className={`h-11 border-slate-300 focus-visible:ring-green-500 ${errors.commercial_register_number ? 'border-red-500' : ''}`}
                />
                {errors.commercial_register_number && (
                  <p className="text-sm text-red-600 mt-1">{errors.commercial_register_number}</p>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2 mt-4">
              <LogoUpload 
                logoFile={formData.logoFile}
                onLogoChange={onLogoChange}
                errors={errors}
              />
            </div>
            
            <div className="md:col-span-2 space-y-2 mt-4">
              <Label htmlFor="company_description" className="text-sm font-semibold text-slate-700">
                Firmenbeschreibung
              </Label>
              <Textarea
                id="company_description"
                value={formData.company_description}
                onChange={onInputChange}
                placeholder="Beschreiben Sie Ihr Unternehmen, Ihre Dienstleistungen und Ihre Erfahrung..."
                className="min-h-[120px] border-slate-300 focus-visible:ring-green-500 resize-y"
                rows={5}
              />
              <p className="text-xs text-slate-500 mt-1">
                Diese Beschreibung wird nach der Registrierung und nach der Genehmigung Ihres Partner-Kontos in Ihrem öffentlichen Profil angezeigt.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 shadow-sm ${errors.agreedToTerms ? "border-red-200 bg-red-50/30" : "border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/30"}`}>
          <CardHeader className={`border-b ${errors.agreedToTerms ? "bg-red-50 border-red-200" : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"}`}>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className={`p-2 rounded-lg ${errors.agreedToTerms ? "bg-red-100" : "bg-green-100"}`}>
                <ShieldCheck className={`h-5 w-5 ${errors.agreedToTerms ? "text-red-600" : "text-green-600"}`} />
              </div>
              Bestätigung
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => onValueChange('agreedToTerms', checked)}
                className={`mt-1 h-5 w-5 ${errors.agreedToTerms ? "border-red-500" : ""}`}
              />
              <div className="grid gap-2 leading-relaxed flex-1">
                <label
                  htmlFor="agreedToTerms"
                  className="text-sm text-slate-700 leading-relaxed cursor-pointer"
                >
                  Ich akzeptiere die <a href="/agb" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-green-600 hover:text-green-800 transition-colors">Allgemeinen Geschäftsbedingungen</a> und die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-green-600 hover:text-green-800 transition-colors">Datenschutzerklärung</a>.
                </label>
                {errors.agreedToTerms && (
                  <p className="text-sm text-red-600 font-medium mt-1">{errors.agreedToTerms}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Step3CompanyData;
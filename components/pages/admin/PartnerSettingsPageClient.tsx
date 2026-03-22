'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, User, Lock, Image as ImageIcon, Star, ArrowLeft, Eye, EyeOff, MapPin, ExternalLink } from 'lucide-react';
import ImageUploader from '@/components/PartnerPanel/ImageUploader';
import GalleryImageUploader from '@/components/PartnerPanel/GalleryImageUploader';
import ReviewCard from '@/components/PartnerProfilePageParts/ReviewCard';
import { formatDate } from '@/lib/utils'; // Import formatDate from utils
import Step2Regions from '@/src/components/PartnerRegistrationForm/Step2Regions';
import { cantonMap } from '@/src/lib/dataMapping.js';

/** Kantons-Codes aus DB normalisieren (ZH, BE, …) – gleiche Logik wie Partner-Registrierung */
function normalizeServiceRegions(raw: unknown): string[] {
  if (!raw || !Array.isArray(raw)) return [];
  const valid = new Set(Object.keys(cantonMap));
  const upper = raw.map((r) => String(r).trim().toUpperCase()).filter((r) => valid.has(r));
  if (upper.length > 0) return upper;
  // Fallback: seltene Legacy-Einträge als Kantons-Name (z. B. "Zürich")
  const byLabel = raw
    .map((r) => {
      const s = String(r).trim();
      const entry = Object.entries(cantonMap).find(
        ([, label]) => label.toLowerCase() === s.toLowerCase()
      );
      return entry?.[0];
    })
    .filter((k): k is string => Boolean(k));
  return byLabel;
}

const PartnerSettingsPageClient = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const settingsTabs = ['profile', 'regions', 'images', 'security', 'reviews'] as const;
  const initialTab =
    tabParam && settingsTabs.includes(tabParam as (typeof settingsTabs)[number]) ? tabParam : 'profile';
  const { user: authUser, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [partnerData, setPartnerData] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    phone: '',
    website: '',
    address_street: '',
    address_zip: '',
    address_city: '',
    company_description: '',
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  /** Kantons-Codes wie bei Registrierung (service_regions in partners) */
  const [serviceRegions, setServiceRegions] = useState<string[]>([]);
  const [savingRegions, setSavingRegions] = useState(false);

  // useAuth() ile güvenilir auth check
  useEffect(() => {
    if (authLoading) return;
    
    if (!authUser) {
      console.log('[PartnerSettingsPageClient] No user, redirecting to /login');
      router.replace('/login');
      return;
    }

    if (authUser.user_metadata?.role !== 'partner') {
      console.log('[PartnerSettingsPageClient] User is not partner, redirecting to /');
      router.replace('/');
      return;
    }

    setUser(authUser);
  }, [authUser, authLoading, router]);

  const fetchPartnerData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      setPartnerData(data);
      setServiceRegions(normalizeServiceRegions(data.service_regions));
      setFormData({
        company_name: data.company_name || '',
        contact_person: data.contact_person || '',
        phone: data.phone || '',
        website: data.website || '',
        address_street: data.address_street || '',
        address_zip: data.address_zip || '',
        address_city: data.address_city || '',
        company_description: data.message || data.company_description || '', // Use 'message' column from database
      });

      const { data: reviewsData, error: reviewsError } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('partner_id', user.id)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });
      if (reviewsError) throw reviewsError;
      setReviews(reviewsData);

    } catch (error) {
      toast({ variant: 'destructive', title: 'Fehler', description: 'Partnerdaten konnten nicht geladen werden.' });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user && user.user_metadata?.role === 'partner') {
      fetchPartnerData();
    }
  }, [fetchPartnerData, user]);

  // Show loading while checking auth or loading data
  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authorized (redirect is handled in useEffect)
  if (!user || user.user_metadata?.role !== 'partner') {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegionToggle = (cantonId: string) => {
    setServiceRegions((prev) =>
      prev.includes(cantonId) ? prev.filter((id) => id !== cantonId) : [...prev, cantonId]
    );
  };

  const handleRegionsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (serviceRegions.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Regionen fehlen',
        description: 'Bitte wählen Sie mindestens ein Kanton / eine Region aus.',
      });
      return;
    }
    setSavingRegions(true);
    try {
      const { error } = await supabase
        .from('partners')
        .update({ service_regions: serviceRegions })
        .eq('id', user.id);
      if (error) throw error;
      setPartnerData((prev: any) => (prev ? { ...prev, service_regions: serviceRegions } : prev));
      toast({ title: 'Gespeichert', description: 'Ihre Einsatzgebiete wurden aktualisiert.' });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description:
          err?.message ||
          'Einsatzgebiete konnten nicht gespeichert werden. Prüfen Sie die Berechtigung in Supabase (RLS) für service_regions.',
      });
    } finally {
      setSavingRegions(false);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const { phone, website, company_description } = formData;
      const { error } = await supabase
        .from('partners')
        .update({ phone, website, message: company_description }) // Database column is 'message'
        .eq('id', user.id);
      if (error) throw error;
      toast({ title: 'Erfolg', description: 'Profil erfolgreich aktualisiert.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fehler', description: 'Profil konnte nicht aktualisiert werden.' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast({ variant: 'destructive', title: 'Fehler', description: 'Bitte füllen Sie alle Passwortfelder aus.' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ variant: 'destructive', title: 'Fehler', description: 'Die neuen Passwörter stimmen nicht überein.' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({ variant: 'destructive', title: 'Fehler', description: 'Das neue Passwort muss mindestens 6 Zeichen lang sein.' });
      return;
    }
    setSaving(true);
    
    const { error: updateError } = await supabase.auth.updateUser({ password: passwordData.newPassword });

    if (updateError) {
      toast({ variant: 'destructive', title: 'Fehler', description: 'Passwort konnte nicht aktualisiert werden: ' + updateError.message });
    } else {
      toast({ title: 'Erfolg', description: 'Ihr Passwort wurde erfolgreich geändert.' });
      setPasswordData({ newPassword: '', confirmPassword: '' });
    }
    
    setSaving(false);
  };

  const onImageUpload = (field: string, url: string) => {
    setPartnerData((prev: any) => prev ? ({ ...prev, [field]: url }) : { [field]: url });
    fetchPartnerData();
  };
  
  const onGalleryUpdate = (newImageUrls: string[]) => {
    setPartnerData((prev: any) => prev ? ({ ...prev, gallery_images: newImageUrls }) : { gallery_images: newImageUrls });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-16 h-16 animate-spin" /></div>;
  }

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => router.push('/partner/dashboard')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Dashboard
            </Button>
          </div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Einstellungen</h1>
            {partnerData?.slug ? (
              <Button variant="outline" size="sm" className="shrink-0 w-full sm:w-auto" asChild>
                <Link href={`/partner/${partnerData.slug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Profil ansehen
                </Link>
              </Button>
            ) : null}
          </div>
          <Tabs key={initialTab} defaultValue={initialTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 h-auto py-1">
              <TabsTrigger value="profile" className="text-xs sm:text-sm"><User className="mr-1 sm:mr-2 h-4 w-4 shrink-0" />Profil</TabsTrigger>
              <TabsTrigger value="regions" className="text-xs sm:text-sm"><MapPin className="mr-1 sm:mr-2 h-4 w-4 shrink-0" />Einsatzgebiete</TabsTrigger>
              <TabsTrigger value="images" className="text-xs sm:text-sm"><ImageIcon className="mr-1 sm:mr-2 h-4 w-4 shrink-0" />Bilder</TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm"><Lock className="mr-1 sm:mr-2 h-4 w-4 shrink-0" />Sicherheit</TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs sm:text-sm col-span-2 sm:col-span-1 lg:col-span-1"><Star className="mr-1 sm:mr-2 h-4 w-4 shrink-0" />Bewertungen</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profil bearbeiten</CardTitle>
                  <CardDescription>Aktualisieren Sie hier Ihre öffentlichen Unternehmensinformationen.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Firmenname</Label>
                        <Input id="company_name" name="company_name" value={formData.company_name} onChange={handleInputChange} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact_person">Ansprechpartner</Label>
                        <Input id="contact_person" name="contact_person" value={formData.contact_person} onChange={handleInputChange} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Webseite</Label>
                        <Input id="website" name="website" type="url" value={formData.website} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address_street">Strasse</Label>
                        <Input id="address_street" name="address_street" value={formData.address_street} onChange={handleInputChange} disabled />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="address_zip">PLZ</Label>
                          <Input id="address_zip" name="address_zip" value={formData.address_zip} onChange={handleInputChange} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address_city">Ort</Label>
                          <Input id="address_city" name="address_city" value={formData.address_city} onChange={handleInputChange} disabled />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_description">Firmenbeschreibung</Label>
                      <Textarea id="company_description" name="company_description" value={formData.company_description} onChange={handleInputChange} rows={5} placeholder="Beschreiben Sie Ihr Unternehmen..." />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Speichern
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Einsatzgebiete bearbeiten</CardTitle>
                  <CardDescription>
                    Sie sehen hier Ihre aktuell hinterlegten Kantone. Sie können die Auswahl jederzeit ändern – neue
                    Regionen hinzufügen oder Einsatzgebiete entfernen. Nach dem Speichern gelten die Änderungen für Ihr
                    Profil und die Zuordnung von Anfragen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegionsSave} className="space-y-6">
                    <Step2Regions
                      formData={{ selectedRegions: serviceRegions }}
                      onRegionChange={handleRegionToggle}
                      errors={{}}
                      hideMarketingContent
                    />
                    <div className="flex justify-end pt-2 border-t">
                      <Button type="submit" disabled={savingRegions}>
                        {savingRegions && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Einsatzgebiete speichern
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bilder verwalten</CardTitle>
                  <CardDescription>Laden Sie Ihr Logo, Titelbild und Galeriebilder für Ihre Profilseite hoch.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-12">
                  <ImageUploader
                    partnerId={user.id}
                    currentImageUrl={partnerData?.logo_url}
                    onUpload={(url: string) => onImageUpload('logo_url', url)}
                    storagePath="partner-logos"
                    dbField="logo_url"
                    title="Firmenlogo"
                    description="Wird im Dashboard und auf Ihrer Profilseite angezeigt."
                  />
                  <ImageUploader
                    partnerId={user.id}
                    currentImageUrl={partnerData?.hero_image_url}
                    onUpload={(url: string) => onImageUpload('hero_image_url', url)}
                    storagePath="partner-hero-images"
                    dbField="hero_image_url"
                    title="Titelbild"
                    description="Grosses Bild oben auf Ihrer Profilseite."
                  />
                  <GalleryImageUploader
                    partnerId={user.id}
                    currentImages={partnerData?.gallery_images || []}
                    onUpdate={onGalleryUpdate}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Passwort ändern</CardTitle>
                  <CardDescription>Wählen Sie ein sicheres, neues Passwort.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-sm">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Neues Passwort</Label>
                      <div className="relative">
                        <Input id="newPassword" name="newPassword" type={showNewPassword ? 'text' : 'password'} value={passwordData.newPassword} onChange={handlePasswordChange} className="pr-10" />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          tabIndex={-1}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Neues Passwort bestätigen</Label>
                      <div className="relative">
                        <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={handlePasswordChange} className="pr-10" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={saving}>
                      {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Passwort aktualisieren
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ihre Bewertungen</CardTitle>
                  <CardDescription>Hier sehen Sie alle genehmigten Bewertungen, die Kunden für Sie hinterlassen haben.</CardDescription>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} formatDate={formatDate} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">Sie haben noch keine genehmigten Bewertungen erhalten.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PartnerSettingsPageClient;


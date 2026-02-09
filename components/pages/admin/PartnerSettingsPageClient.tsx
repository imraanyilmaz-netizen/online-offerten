'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, User, Lock, Image as ImageIcon, Star, ArrowLeft } from 'lucide-react';
import ImageUploader from '@/components/PartnerPanel/ImageUploader';
import GalleryImageUploader from '@/components/PartnerPanel/GalleryImageUploader';
import ReviewCard from '@/components/PartnerProfilePageParts/ReviewCard';
import { formatDate } from '@/lib/utils'; // Import formatDate from utils

const PartnerSettingsPageClient = () => {
  const { toast } = useToast();
  const router = useRouter();

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

  // Client-only auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.log('[PartnerSettingsPageClient] No session, redirecting to /login');
          router.replace('/login');
          return;
        }

        const userRole = session.user?.user_metadata?.role;
        
        if (userRole !== 'partner') {
          console.log('[PartnerSettingsPageClient] User is not partner, redirecting to /');
          router.replace('/');
          return;
        }

        // User is partner - set user and continue
        setUser(session.user);
      } catch (error) {
        console.error('[PartnerSettingsPageClient] Auth check error:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Einstellungen</h1>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profil</TabsTrigger>
              <TabsTrigger value="images"><ImageIcon className="mr-2 h-4 w-4" />Bilder</TabsTrigger>
              <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4" />Sicherheit</TabsTrigger>
              <TabsTrigger value="reviews"><Star className="mr-2 h-4 w-4" />Bewertungen</TabsTrigger>
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
                      <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Neues Passwort bestätigen</Label>
                      <Input id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
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
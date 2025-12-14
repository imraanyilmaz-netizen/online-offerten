import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, ArrowLeft, X, UploadCloud, Trash2, Tag, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { locations } from '@/data/locations';

// Lazy load heavy TiptapEditor component
const TiptapEditor = lazy(() => import('./TiptapEditor'));
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getServiceTypeLabel } from '@/lib/utils';

const PostEditor = ({ post, onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState('draft');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [availableReviews, setAvailableReviews] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState([]);
  const [readMoreText, setReadMoreText] = useState('');

  const generateSlug = (text) => text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('customer_reviews')
        .select('id, customer_name, review_text, rating, service_type')
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({ title: 'Fehler', description: 'Kundenbewertungen konnten nicht geladen werden.', variant: 'destructive' });
      } else {
        setAvailableReviews(data);
      }
    };
    fetchReviews();
  }, [toast]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || { type: 'doc', content: [] });
      setStatus(post.status || 'draft');
      setCategory(post.category || '');
      setTags(Array.isArray(post.tags) ? post.tags : []);
      setSelectedLocations(post.locations || []);
      setMetaTitle(post.meta_title || '');
      setMetaDescription(post.meta_description || '');
      setSlug(post.slug || generateSlug(post.title));
      setFeaturedImageUrl(post.featured_image_url || '');
      setSelectedReviewIds(post.selected_review_ids || []);
      setReadMoreText(post.read_more_text || '');
    } else {
      // Reset for new post
      setTitle('');
      setContent({ type: 'doc', content: [] });
      setStatus('draft');
      setCategory('');
      setTags([]);
      setSelectedLocations([]);
      setMetaTitle('');
      setMetaDescription('');
      setSlug('');
      setFeaturedImageUrl('');
      setSelectedReviewIds([]);
      setReadMoreText('');
    }
    setImageFile(null);
    setTagInput('');
    setSuggestedTags([]);
  }, [post]);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setFeaturedImageUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!post?.id && !slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleTagInputChange = async (e) => {
    const value = e.target.value;
    setTagInput(value);
    if (value) {
      const { data } = await supabase
        .from('tags')
        .select('name')
        .ilike('name', `%${value}%`)
        .limit(5);
      setSuggestedTags(data?.map(t => t.name) || []);
    } else {
      setSuggestedTags([]);
    }
  };

  const addTag = useCallback(async (tag) => {
    const newTag = tag.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setTags(prevTags => [...prevTags, newTag]);
      await supabase.from('tags').upsert({ name: newTag }, { onConflict: 'name' });
    }
    setTagInput('');
    setSuggestedTags([]);
  }, [tags]);

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagInput) addTag(tagInput);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return featuredImageUrl;
    setIsUploading(true);
    const fileName = `${uuidv4()}-${imageFile.name}`;
    const { error } = await supabase.storage.from('posts-images').upload(fileName, imageFile);
    setIsUploading(false);
    if (error) {
      toast({ title: 'Upload Fehler', description: `Bild konnte nicht hochgeladen werden: ${error.message}`, variant: 'destructive' });
      throw error;
    }
    const { data: { publicUrl } } = supabase.storage.from('posts-images').getPublicUrl(fileName);
    return publicUrl;
  };

  const removeImage = () => {
    setImageFile(null);
    setFeaturedImageUrl('');
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFeaturedImageUrl(url);
    // URL girildiğinde dosya seçimini temizle
    if (url) {
      setImageFile(null);
    }
  };

  const handleReviewSelection = (reviewId) => {
    setSelectedReviewIds(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId) 
        : [...prev, reviewId]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let finalImageUrl = featuredImageUrl;
      if (imageFile) {
        finalImageUrl = await handleImageUpload();
      }

      // Falls im Eingabefeld noch ein Tag steht, das nicht mit Enter/Komma bestätigt wurde,
      // automatisch hinzufügen, damit es beim Speichern nicht verloren geht.
      let tagsToSave = tags;
      const pendingTag = tagInput.trim().toLowerCase();
      if (pendingTag && !tags.includes(pendingTag)) {
        tagsToSave = [...tags, pendingTag];
        setTags(tagsToSave);
        await supabase.from('tags').upsert({ name: pendingTag }, { onConflict: 'name' });
      }

      const postData = {
        title,
        content,
        status,
        featured_image_url: finalImageUrl,
        category: category || null,
        tags: tagsToSave,
        locations: selectedLocations,
        meta_title: metaTitle,
        meta_description: metaDescription,
        slug,
        author_id: user.id,
        updated_at: new Date().toISOString(),
        selected_review_ids: selectedReviewIds,
        read_more_text: readMoreText,
        ...(status === 'published' && (!post || post.status !== 'published') && { published_at: new Date().toISOString() })
      };

      let response;
      if (post?.id) {
        response = await supabase.from('posts').update(postData).eq('id', post.id).select().single();
      } else {
        response = await supabase.from('posts').insert([postData]).select().single();
      }

      if (response.error) throw response.error;
      toast({ title: 'Erfolg', description: 'Beitrag erfolgreich gespeichert.' });
      onBack();
    } catch (error) {
      toast({ title: 'Fehler', description: `Beitrag konnte nicht gespeichert werden: ${error.message}`, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}><ArrowLeft className="w-4 h-4" /></Button>
          <h2 className="text-2xl font-bold">{post ? 'Beitrag bearbeiten' : 'Neuen Beitrag erstellen'}</h2>
        </div>
        <Input placeholder="Beitragstitel hier eingeben..." value={title} onChange={handleTitleChange} className="text-2xl font-bold h-14 border-0 shadow-none focus-visible:ring-0 px-2" />
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
          <TiptapEditor content={content} onChange={setContent} />
        </Suspense>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Veröffentlichen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Entwurf</SelectItem>
                    <SelectItem value="published">Veröffentlicht</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} disabled={loading || isUploading}>
                {loading || isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                {post ? 'Aktualisieren' : 'Speichern'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO & Organisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Öne Çıkan Görsel</Label>
              <div className="mt-1 space-y-3">
                {/* URL Input */}
                <div>
                  <Input
                    type="url"
                    placeholder="Oder Bild-URL hier einfügen (z.B. https://example.com/bild.jpg)"
                    value={featuredImageUrl && !imageFile ? featuredImageUrl : ''}
                    onChange={handleImageUrlChange}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Sie können eine Bild-URL direkt einfügen oder eine Datei hochladen</p>
                </div>
                
                {/* Divider */}
                {(featuredImageUrl || imageFile) && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Oder</span>
                    </div>
                  </div>
                )}

                {/* File Upload Dropzone */}
                <div {...getRootProps()} className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <input {...getInputProps()} />
                {featuredImageUrl ? (
                  <div className="relative w-full h-40">
                    <img src={featuredImageUrl} alt="Öne çıkan görsel" className="rounded-md object-cover w-full h-full" loading="lazy" decoding="async" width="400" height="160" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={(e) => { e.stopPropagation(); removeImage(); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600">{isDragActive ? 'Bild hier ablegen...' : 'Bild hierher ziehen oder klicken'}</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF bis 5MB</p>
                  </div>
                )}
                </div>
              </div>
            </div>
            <div>
              <Label>URL Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="beitrag-url-slug" />
            </div>
             <div>
              <Label>Link-Text für "Weiterlesen"</Label>
              <Input value={readMoreText} onChange={(e) => setReadMoreText(e.target.value)} placeholder={`${title.substring(0, 20)}... - Weiterlesen`} />
              <p className="text-xs text-muted-foreground mt-1">Wenn leer, wird automatisch der Titel verwendet.</p>
            </div>
            <div>
              <Label>Kategorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Kategorie auswählen" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Umzug">Umzug</SelectItem>
                  <SelectItem value="Reinigung">Reinigung</SelectItem>
                  <SelectItem value="Maler">Maler</SelectItem>
                  <SelectItem value="Gärtnerei">Gärtnerei</SelectItem>
                  <SelectItem value="Räumung">Räumung</SelectItem>
                  <SelectItem value="Entsorgen">Entsorgen</SelectItem>
                  <SelectItem value="Allgemein">Allgemein</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Lokation</Label>
              <Select onValueChange={(val) => !selectedLocations.includes(val) && setSelectedLocations([...selectedLocations, val])}>
                <SelectTrigger><SelectValue placeholder="Lokation hinzufügen..." /></SelectTrigger>
                <SelectContent>
                  {locations.map(loc => <SelectItem key={loc.name} value={loc.name}>{loc.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedLocations.map(loc => (
                  <Badge key={loc} variant="secondary">{loc} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedLocations(selectedLocations.filter(l => l !== loc))} /></Badge>
                ))}
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="tags">Etiketten (Tags)</Label>
              <Input id="tags" value={tagInput} onChange={handleTagInputChange} onKeyDown={handleTagInputKeyDown} onFocus={() => setIsTagInputFocused(true)} onBlur={() => setTimeout(() => setIsTagInputFocused(false), 150)} placeholder="Tag hinzufügen und Enter/Komma..." />
              {isTagInputFocused && suggestedTags.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1">
                    {suggestedTags.map((suggestion, index) => (
                      <li key={index} className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2" onMouseDown={() => addTag(suggestion)}><Tag className="w-4 h-4 text-gray-500" />{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map(tag => (<Badge key={tag} variant="secondary" className="pl-2">{tag} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} /></Badge>))}
              </div>
            </div>
            <div>
              <Label>SEO Titel ({metaTitle.length}/60)</Label>
              <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={60} />
            </div>
            <div>
              <Label>Meta Beschreibung ({metaDescription.length}/160)</Label>
              <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} maxLength={160} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              Müşteri Yorumları Ekle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <div className="space-y-4 pr-4">
                {availableReviews.length > 0 ? availableReviews.map(review => (
                  <div key={review.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50">
                    <Checkbox
                      id={`review-${review.id}`}
                      checked={selectedReviewIds.includes(review.id)}
                      onCheckedChange={() => handleReviewSelection(review.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor={`review-${review.id}`} className="text-sm font-medium cursor-pointer">
                        {review.customer_name} ({review.rating}/5 ★)
                        {review.service_type && (
                            <Badge variant="outline" className="ml-2 border-green-300 text-green-700">{getServiceTypeLabel(review.service_type)}</Badge>
                        )}
                      </label>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.review_text}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground text-center">Onaylanmış yorum bulunamadı.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, ArrowLeft, X, UploadCloud, Trash2, Tag, MessageSquare, HelpCircle, Plus, Code } from 'lucide-react';
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
  const [content, setContent] = useState('');
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
  const [faqs, setFaqs] = useState([]);
  const [faqTitle, setFaqTitle] = useState('');
  const [faqDescription, setFaqDescription] = useState('');
  const [customHtml, setCustomHtml] = useState('');
  const [insertHtmlToEditor, setInsertHtmlToEditor] = useState(null);

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

  // TipTap JSON formatını HTML'e dönüştür (geriye dönük uyumluluk için)
  const convertTipTapToHTML = (json) => {
    if (!json || typeof json === 'string') return json || '';
    if (!json.content) return '';
    
    let html = '';
    json.content.forEach(node => {
      if (node.type === 'paragraph') {
        let text = '';
        if (node.content) {
          node.content.forEach(child => {
            if (child.type === 'text') {
              let formattedText = child.text;
              if (child.marks) {
                child.marks.forEach(mark => {
                  if (mark.type === 'bold') formattedText = `<strong>${formattedText}</strong>`;
                  if (mark.type === 'italic') formattedText = `<em>${formattedText}</em>`;
                  if (mark.type === 'underline') formattedText = `<u>${formattedText}</u>`;
                  if (mark.type === 'link' && mark.attrs?.href) {
                    formattedText = `<a href="${mark.attrs.href}" rel="noopener noreferrer" class="text-blue-600 underline cursor-pointer">${formattedText}</a>`;
                  }
                });
              }
              text += formattedText;
            } else if (child.type === 'hardBreak') {
              text += '<br>';
            }
          });
        }
        html += `<p>${text}</p>`;
      } else if (node.type === 'heading') {
        const level = node.attrs?.level || 1;
        let text = '';
        if (node.content) {
          node.content.forEach(child => {
            if (child.type === 'text') {
              let formattedText = child.text;
              if (child.marks) {
                child.marks.forEach(mark => {
                  if (mark.type === 'bold') formattedText = `<strong>${formattedText}</strong>`;
                  if (mark.type === 'italic') formattedText = `<em>${formattedText}</em>`;
                  if (mark.type === 'link' && mark.attrs?.href) {
                    formattedText = `<a href="${mark.attrs.href}" rel="noopener noreferrer" class="text-blue-600 underline cursor-pointer">${formattedText}</a>`;
                  }
                });
              }
              text += formattedText;
            }
          });
        }
        html += `<h${level}>${text}</h${level}>`;
      } else if (node.type === 'bulletList' || node.type === 'orderedList') {
        const tag = node.type === 'bulletList' ? 'ul' : 'ol';
        let items = '';
        if (node.content) {
          node.content.forEach(item => {
            if (item.type === 'listItem' && item.content) {
              let itemText = '';
              item.content.forEach(para => {
                if (para.type === 'paragraph' && para.content) {
                  para.content.forEach(child => {
                    if (child.type === 'text') itemText += child.text;
                  });
                }
              });
              items += `<li>${itemText}</li>`;
            }
          });
        }
        html += `<${tag}>${items}</${tag}>`;
      } else if (node.type === 'blockquote') {
        let text = '';
        if (node.content) {
          node.content.forEach(child => {
            if (child.type === 'paragraph' && child.content) {
              child.content.forEach(textNode => {
                if (textNode.type === 'text') text += textNode.text;
              });
            }
          });
        }
        html += `<blockquote>${text}</blockquote>`;
      } else if (node.type === 'codeBlock') {
        let code = '';
        if (node.content) {
          node.content.forEach(child => {
            if (child.type === 'text') code += child.text;
          });
        }
        html += `<pre><code>${code}</code></pre>`;
      } else if (node.type === 'image') {
        const src = node.attrs?.src || '';
        const alt = node.attrs?.alt || '';
        html += `<img src="${src}" alt="${alt}" />`;
      } else if (node.type === 'horizontalRule') {
        html += '<hr>';
      }
    });
    return html;
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      // Content'i HTML string olarak sakla (TipTap JSON'dan dönüştür)
      const contentValue = post.content || '';
      if (typeof contentValue === 'string') {
        setContent(contentValue);
      } else if (typeof contentValue === 'object' && contentValue !== null) {
        // TipTap JSON formatından HTML'e dönüştür
        setContent(convertTipTapToHTML(contentValue));
      } else {
        setContent('');
      }
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
      setFaqs(Array.isArray(post.faq) && post.faq.length > 0 ? post.faq : []);
      setFaqTitle(post.faq_title || '');
      setFaqDescription(post.faq_description || '');
      setCustomHtml(post.custom_html || '');
    } else {
      // Reset for new post
      setTitle('');
      setContent(''); // HTML string olarak başlat
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
      setFaqs([]);
      setFaqTitle('');
      setFaqDescription('');
      setCustomHtml('');
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

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFaqs(updatedFaqs);
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

      // FAQ verilerini temizle ve formatla - question önce, answer sonra (sıralama garantisi)
      const validFaqs = faqs
        .filter(faq => faq && faq.question?.trim() && faq.answer?.trim())
        .map(faq => {
          // Sıralamayı garanti etmek için obje oluşturma
          const faqObj = {};
          faqObj.question = faq.question.trim();
          faqObj.answer = faq.answer.trim();
          return faqObj;
        });

      // Veriyi temizle ve doğrula
      const postData = {
        title: title.trim() || null,
        content: content || null,
        status: status || 'draft',
        featured_image_url: finalImageUrl && finalImageUrl.trim() ? finalImageUrl.trim() : null,
        category: category && category.trim() ? category.trim() : null,
        tags: Array.isArray(tagsToSave) && tagsToSave.length > 0 ? tagsToSave : null,
        locations: Array.isArray(selectedLocations) && selectedLocations.length > 0 ? selectedLocations : null,
        meta_title: metaTitle && metaTitle.trim() ? metaTitle.trim() : null,
        meta_description: metaDescription && metaDescription.trim() ? metaDescription.trim() : null,
        slug: slug.trim() || null,
        author_id: user?.id || null,
        selected_review_ids: Array.isArray(selectedReviewIds) && selectedReviewIds.length > 0 ? selectedReviewIds : null,
        read_more_text: readMoreText && readMoreText.trim() ? readMoreText.trim() : null,
        faq: validFaqs.length > 0 ? validFaqs : null,
        faq_title: faqTitle && faqTitle.trim() ? faqTitle.trim() : null,
        faq_description: faqDescription && faqDescription.trim() ? faqDescription.trim() : null,
        custom_html: customHtml && customHtml.trim() ? customHtml.trim() : null,
        ...(status === 'published' && (!post || post.status !== 'published') && { published_at: new Date().toISOString() })
      };

      // Pflichtfelder prüfen
      if (!postData.title) {
        throw new Error('Titel ist erforderlich');
      }
      if (!postData.slug) {
        throw new Error('Slug ist erforderlich');
      }
      if (!postData.author_id) {
        throw new Error('Autor ist erforderlich');
      }

      let response;
      if (post?.id) {
        response = await supabase.from('posts').update(postData).eq('id', post.id).select().single();
      } else {
        response = await supabase.from('posts').insert([postData]).select().single();
      }

      if (response.error) {
        console.error('Supabase Error:', response.error);
        console.error('Post Data:', JSON.stringify(postData, null, 2));
        throw new Error(response.error.message || `Fehler beim Speichern: ${JSON.stringify(response.error)}`);
      }
      
      toast({ title: 'Erfolg', description: 'Beitrag erfolgreich gespeichert.' });
      // onBack() çağrısını kaldırdık - sayfa editörde kalacak, kullanıcı değişikliklere devam edebilir
    } catch (error) {
      console.error('Save Error:', error);
      const errorMessage = error.message || 'Unbekannter Fehler beim Speichern des Beitrags';
      toast({ 
        title: 'Fehler', 
        description: `Beitrag konnte nicht gespeichert werden: ${errorMessage}`, 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8 pt-4 md:pt-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4 mb-2">
          <Button variant="outline" size="icon" onClick={onBack}><ArrowLeft className="w-4 h-4" /></Button>
          <h2 className="text-2xl font-bold">{post ? 'Beitrag bearbeiten' : 'Neuen Beitrag erstellen'}</h2>
        </div>
        <Input placeholder="Beitragstitel hier eingeben..." value={title} onChange={handleTitleChange} className="text-2xl font-bold h-14 border-0 shadow-none focus-visible:ring-0 px-2" />
        <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
          <TiptapEditor content={content} onChange={setContent} insertHtml={insertHtmlToEditor} />
        </Suspense>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-green-600" />
              FAQ (Häufige Fragen)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground mb-3">
                Fügen Sie Fragen und Antworten hinzu, die für Google AI Overview und Rich Results verwendet werden.
              </p>
              <div className="p-4 border rounded-lg space-y-3 bg-blue-50 border-blue-200">
                <div>
                  <Label className="text-xs">FAQ Bölümü Ana Başlık (Title) - Opsiyonel</Label>
                  <Input
                    value={faqTitle}
                    onChange={(e) => setFaqTitle(e.target.value)}
                    placeholder="z.B. FAQ - Häufige Fragen zum Möbellift mieten"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Bu başlık tüm FAQ bölümünün üstünde görüntülenecektir</p>
                </div>
                <div>
                  <Label className="text-xs">FAQ Bölümü Alt Açıklama (Description) - Opsiyonel</Label>
                  <Textarea
                    value={faqDescription}
                    onChange={(e) => setFaqDescription(e.target.value)}
                    placeholder="z.B. Hier beantworten wir typische Detailfragen, die im Haupttext nur am Rande vorkommen."
                    className="mt-1 min-h-[60px]"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Bu açıklama ana başlığın altında görüntülenecektir</p>
                </div>
              </div>
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Frage {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFaq(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Label className="text-xs">Frage</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) => updateFaq(index, 'question', e.target.value)}
                      placeholder="z.B. Was kostet eine Endreinigung?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Antwort</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                      placeholder="Detaillierte Antwort hier eingeben..."
                      className="mt-1 min-h-[80px]"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addFaq}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Neue FAQ hinzufügen
              </Button>
              {faqs.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Noch keine FAQs hinzugefügt. Klicken Sie auf "Neue FAQ hinzufügen".
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-green-600" />
              HTML Kodu (Custom HTML)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              HTML kodunu buraya ekleyin. "In Editor einfügen" butonuna tıklayarak kodu editöre ekleyebilirsiniz.
            </p>
            <Textarea
              value={customHtml}
              onChange={(e) => setCustomHtml(e.target.value)}
              placeholder="<div>Ihr HTML-Code hier...</div>"
              className="min-h-[200px] font-mono text-sm mb-3"
              rows={10}
            />
            <Button
              type="button"
              onClick={() => {
                if (customHtml.trim()) {
                  setInsertHtmlToEditor(customHtml);
                  // Reset after a short delay to allow re-insertion
                  setTimeout(() => setInsertHtmlToEditor(null), 100);
                }
              }}
              disabled={!customHtml.trim()}
              className="w-full"
              variant="outline"
            >
              <Code className="w-4 h-4 mr-2" />
              In Editor einfügen
            </Button>
          </CardContent>
        </Card>
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
              <Label>Titelbild</Label>
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
                  <SelectItem value="Räumung">Räumung</SelectItem>
                  <SelectItem value="Entsorgen">Entsorgen</SelectItem>
                  <SelectItem value="Allgemein">Allgemein</SelectItem>
                  <SelectItem value="Wissenswertes">Wissenswertes</SelectItem>
                  <SelectItem value="Checklists">Checklists</SelectItem>
                  <SelectItem value="Ratgeber">Ratgeber</SelectItem>
                  <SelectItem value="Tipps">Tipps</SelectItem>
                  <SelectItem value="Checkliste">Checkliste</SelectItem>
                  <SelectItem value="Umzugskosten">Umzugskosten</SelectItem>
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
              <Label>SEO Titel ({metaTitle.length}/70)</Label>
              <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={70} />
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
              Kundenrezensionen hinzufügen
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
    </div>
  );
};

export default PostEditor;
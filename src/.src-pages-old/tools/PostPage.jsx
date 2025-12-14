import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Folder, Home, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import TiptapRenderer from '@/components/AdminPanel/BlogManagement/TiptapRenderer.jsx';
import PostSidebar from '@/components/tools/PostSidebar';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const PostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const ratgeberBasePath = '/ratgeber';

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            
            const { data: postData, error: postError } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (postError || !postData) {
                console.error('Error fetching post:', postError);
                setError('Beitrag konnte nicht gefunden werden.');
                setLoading(false);
                return;
            }
            
            setPost(postData);

            const { data: recentData, error: recentError } = await supabase
                .from('posts')
                .select('title, slug, featured_image_url')
                .eq('status', 'published')
                .order('published_at', { ascending: false })
                .limit(5);

            if (recentError) {
                console.error('Error fetching recent posts:', recentError);
            } else {
                setRecentPosts(recentData);
            }

            setLoading(false);
        };

        window.scrollTo(0, 0);
        fetchPost();
    }, [slug]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-green-600" /></div>;
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Fehler</h1>
                <p className="text-gray-600">{error}</p>
                <Button asChild className="mt-4">
                    <Link href={ratgeberBasePath}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Ratgeber
                    </Link>
                </Button>
            </div>
        );
    }
    
    if (!post) return null;

    const canonicalUrl = `https://online-offerten.ch${ratgeberBasePath}/${slug}`;

    return (
        <>
            
            
            <div className="container mx-auto max-w-navbar px-4 py-8 md:py-12">
                <nav className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-green-600 flex items-center">
                        <Home className="h-4 w-4 mr-1.5" /> Startseite
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1.5" />
                    <Link href={ratgeberBasePath} className="hover:text-green-600">Ratgeber</Link>
                    <ChevronRight className="h-4 w-4 mx-1.5" />
                    <span className="font-medium text-gray-700 truncate max-w-[200px] md:max-w-xs">{post.title}</span>
                </nav>

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    <main className="lg:col-span-8">
                        <article className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                            {post.featured_image_url && (
                                <ImageWithFallback
                                    src={post.featured_image_url}
                                    alt={post.title}
                                    className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-md"
                                />
                            )}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6 border-b pb-4">
                                {post.category && (
                                    <div className="flex items-center">
                                        <Folder className="h-4 w-4 mr-1.5" />
                                        <span>{post.category}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString('de-DE')}</span>
                                </div>
                            </div>
                            
                            <TiptapRenderer jsonContent={post.content} />

                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                                        <Tag className="h-5 w-5 mr-2 text-green-600"/>
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" asChild>
                                                <Link href={`${ratgeberBasePath}?tag=${encodeURIComponent(tag)}`}>
                                                    #{tag}
                                                </Link>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                             <Button asChild variant="outline" className="mt-8">
                                <Link href={ratgeberBasePath}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Zurück zur Übersicht
                                </Link>
                            </Button>
                        </article>
                    </main>

                    <aside className="lg:col-span-4 mt-12 lg:mt-0">
                        <PostSidebar 
                            category={post.category} 
                            tags={post.tags}
                            recentPosts={recentPosts.filter(p => p.slug !== slug)}
                            ratgeberBasePath={ratgeberBasePath}
                        />
                    </aside>
                </div>
            </div>
        </>
    );
};

export default PostPage;
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/src/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, PlusCircle, Trash2, Edit } from 'lucide-react';
import PostEditor from './PostEditor';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'editor'
  const [editingPost, setEditingPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Fehler', description: 'Beiträge konnten nicht geladen werden.', variant: 'destructive' });
    } else {
      setPosts(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleNewPost = () => {
    setEditingPost(null);
    setView('editor');
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setView('editor');
  };

  const handleBackToList = () => {
    setEditingPost(null);
    setView('list');
    fetchPosts();
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    const { error } = await supabase.from('posts').delete().eq('id', postToDelete.id);
    if (error) {
      toast({ title: 'Fehler', description: 'Beitrag konnte nicht gelöscht werden.', variant: 'destructive' });
    } else {
      toast({ title: 'Erfolg', description: 'Beitrag wurde gelöscht.' });
      fetchPosts();
    }
    setPostToDelete(null);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-emerald-950/55 dark:text-emerald-200 dark:border-emerald-800 font-semibold">Veröffentlicht</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-border text-foreground font-semibold">Entwurf</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-800 font-semibold">Geplant</Badge>;
      default:
        return <Badge variant="secondary" className="font-semibold">{status}</Badge>;
    }
  };

  if (view === 'editor') {
    return <PostEditor post={editingPost} onBack={handleBackToList} />;
  }

  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
    <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">Ratgeber-Beiträge</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">Verwalten Sie Ratgeber-Beiträge, erstellen Sie neue Artikel und veröffentlichen Sie Inhalte.</p>
        </div>
        <Button onClick={handleNewPost} className="flex-shrink-0 ml-4">
          <PlusCircle className="w-4 h-4 mr-2" />
          Neuen Beitrag erstellen
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-10 h-10 animate-spin text-green-600 dark:text-emerald-400" />
        </div>
      ) : (
        <Card className="border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 hover:bg-muted/40 border-b-2 border-border">
                <TableHead className="font-bold text-foreground py-4 text-sm">Titel</TableHead>
                <TableHead className="font-bold text-foreground py-4 text-sm">Status</TableHead>
                <TableHead className="font-bold text-foreground py-4 text-sm">Kategorie</TableHead>
                <TableHead className="font-bold text-foreground py-4 text-sm">Etiketten (Tags)</TableHead>
                <TableHead className="font-bold text-foreground py-4 text-sm">Erstellt am</TableHead>
                <TableHead className="text-right font-bold text-foreground py-4 text-sm">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? posts.map(post => (
                <TableRow 
                  key={post.id}
                  className="border-b border-border hover:bg-gradient-to-r hover:from-green-50/30 hover:to-transparent dark:hover:from-emerald-950/25 dark:hover:to-transparent transition-all duration-200"
                >
                  <TableCell className="font-semibold text-foreground py-3.5">
                    {post.status === 'published' ? (
                       <Link href={`/ratgeber/${post.slug}`} target="_blank" className="text-foreground hover:text-green-600 dark:hover:text-emerald-400 hover:underline transition-colors">{post.title}</Link>
                    ) : (
                      <span className="text-foreground">{post.title}</span>
                    )}
                  </TableCell>
                  <TableCell className="py-3.5">{getStatusBadge(post.status)}</TableCell>
                  <TableCell className="py-3.5 text-muted-foreground">{post.category || '-'}</TableCell>
                  <TableCell className="py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {(post.tags || []).slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-muted text-foreground border-border">{tag}</Badge>
                      ))}
                      {post.tags?.length > 3 && (
                        <Badge variant="outline" className="border-border">+{post.tags.length - 3}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 text-sm text-muted-foreground">{new Date(post.created_at).toLocaleDateString('de-DE')}</TableCell>
                  <TableCell className="text-right py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditPost(post)} className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400">
                      <Edit className="w-4 h-4" />
                    </Button>
                      <Button variant="ghost" size="icon" onClick={() => setPostToDelete(post)} className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                          <PlusCircle className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-semibold text-foreground mb-1">Noch keine Beiträge erstellt</p>
                        <p className="text-sm text-muted-foreground">Erstellen Sie Ihren ersten Ratgeber-Beitrag.</p>
                      </div>
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
       <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Dieser Vorgang kann nicht rückgängig gemacht werden. Der Beitrag "{postToDelete?.title}" wird dauerhaft gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost}>Löschen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManagement;
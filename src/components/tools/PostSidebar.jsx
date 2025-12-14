import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Folder, Clock, Sparkles, Calculator, ListChecks, ArrowRight } from 'lucide-react';

const PostSidebar = ({ category, tags, recentPosts, ratgeberBasePath = '/ratgeber' }) => {
  return (
    <aside className="sticky top-24 space-y-8">
      {/* CTA Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            Interessiert an Offerten?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Holen Sie sich jetzt kostenlos und unverbindlich Offerten von geprüften Firmen.
          </p>
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/offerten-portal" rel="noopener noreferrer">
              Kostenlose Offerten anfordern
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Helpful Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hilfreiche Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/umzugskosten-rechner">
              <Calculator className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Umzugskosten-Rechner</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/reinigungskosten-rechner">
              <Calculator className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Reinigungskosten-Rechner</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/checklisten">
              <ListChecks className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Checklisten</span>
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      {recentPosts && recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Neueste Beiträge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentPosts.filter(recentPost => recentPost?.slug).map(recentPost => {
                const postHref = `${ratgeberBasePath}/${recentPost.slug}`;
                return (
                <li key={recentPost.slug} className="flex items-start gap-4">
                   <Link href={postHref} className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 block group">
                       <img 
                         src={recentPost.featured_image_url || 'https://via.placeholder.com/150'} 
                         alt={recentPost.title} 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                   </Link>
                  <div>
                    <Link href={postHref} className="font-semibold text-sm text-gray-800 hover:text-green-600 leading-tight line-clamp-2">
                      {recentPost.title}
                    </Link>
                  </div>
                </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Category and Tags */}
      { (category || (tags && tags.length > 0)) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Folder className="w-5 h-5 text-green-600" />
              Kategorie & Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Kategorie</h4>
                <Badge>{category}</Badge>
              </div>
            )}
            {tags && tags.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" asChild>
                      <Link href={`${ratgeberBasePath}?tag=${encodeURIComponent(tag)}`}>
                        #{tag}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </aside>
  );
};

export default PostSidebar;
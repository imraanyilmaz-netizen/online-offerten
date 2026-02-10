import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Calculator, ListChecks, ArrowRight, Clock } from 'lucide-react';

const RatgeberSidebar = ({ recentPosts }) => {
  return (
    <aside className="sticky top-24 space-y-8">
      {/* CTA Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            Gratis Offerten vergleichen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Erhalten Sie bis zu 5 unverbindliche Offerten von geprüften Anbietern in Ihrer Nähe – kostenlos und in wenigen Minuten.
          </p>
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/kostenlose-offerte-anfordern" rel="noopener noreferrer">
              Offerten einholen und vergleichen
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
            <Link href="/umzugsfirma/umzugskosten">
              <Calculator className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Umzugskosten-Rechner</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/reinigung/reinigungskosten">
              <Calculator className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="flex-grow">Reinigungskosten-Rechner</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 text-left h-auto py-2">
            <Link href="/umzugsfirma/checklists">
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
                const postHref = `/ratgeber/${recentPost.slug}`;
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
    </aside>
  );
};

export default RatgeberSidebar;


import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Folder, Clock, Sparkles, ArrowRight, List } from 'lucide-react';

const PostSidebar = ({ category, tags, recentPosts, ratgeberBasePath = '/ratgeber', tableOfContents = [] }) => {
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return;

    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean);
      
      // Find the current section
      let current = '';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id;
          break;
        }
      }

      // If no section is in view, find the closest one
      if (!current) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top > 150) {
            current = section.id;
            break;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents, activeSection]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <aside className="sticky top-24 space-y-8">
      {/* Table of Contents */}
      {tableOfContents && tableOfContents.length > 0 && (
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <List className="w-5 h-5 text-gray-700" />
              Inhalt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-1">
              {tableOfContents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-green-100 text-green-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>
      )}

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
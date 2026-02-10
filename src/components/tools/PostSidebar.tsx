import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Folder, Clock, Sparkles, ArrowRight, List, ChevronDown, ChevronUp } from 'lucide-react';

interface TableOfContentsItem {
  id: string;
  title: string;
}

interface PostSidebarProps {
  category?: string | null;
  tags?: string[];
  recentPosts?: any[];
  ratgeberBasePath?: string;
  tableOfContents?: TableOfContentsItem[];
}

const PostSidebar: React.FC<PostSidebarProps> = ({ 
  category, 
  tags, 
  recentPosts, 
  ratgeberBasePath = '/ratgeber', 
  tableOfContents 
}) => {
  const [activeSection, setActiveSection] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isTOCSticky, setIsTOCSticky] = React.useState(false);

  React.useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return;

    const handleScroll = () => {
      const sections = tableOfContents
        .map(item => document.getElementById(item.id))
        .filter((section): section is HTMLElement => section !== null);
      
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

  // Observe first H2 to make TOC sticky when it becomes visible
  React.useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return;

    const firstSectionId = tableOfContents[0]?.id;
    if (!firstSectionId) return;

    const firstSection = document.getElementById(firstSectionId);
    if (!firstSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // İlk H2 viewport'a girdiğinde sticky yap
        // Ama sadece aşağı scroll yapılıyorsa (yukarı değil)
        if (entry.isIntersecting) {
          setIsTOCSticky(true);
        } else if (entry.boundingClientRect.top > 0) {
          // H2 henüz viewport'a girmemişse (üstte), sticky değil
          setIsTOCSticky(false);
        }
        // H2 viewport'tan aşağı çıktıysa sticky kalacak
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px' // Header için offset
      }
    );

    observer.observe(firstSection);

    return () => {
      observer.disconnect();
    };
  }, [tableOfContents]);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-toc-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const TableOfContentsNav = () => (
            <nav className="space-y-1">
      {tableOfContents?.map((item) => (
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
  );

  return (
    <>
      {/* Mobile TOC - Becomes Sticky After First H2 */}
      {tableOfContents && tableOfContents.length > 0 && (
        <div 
          className={`lg:hidden z-40 bg-white border-b border-gray-200 shadow-sm mb-6 mobile-toc-container transition-all duration-300 ${
            isTOCSticky ? 'sticky top-16' : 'relative'
          }`}
        >
          <div className="container mx-auto px-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2 font-semibold text-gray-900">
                <List className="w-5 h-5 text-gray-700" />
                Inhalt
              </span>
              {isMobileMenuOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {/* Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="py-3 border-t border-gray-200 max-h-[70vh] overflow-y-auto">
                <TableOfContentsNav />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-24 space-y-8">
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
              <TableOfContentsNav />
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
    </>
  );
};

export default PostSidebar;
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  ExternalLink, 
  Search, 
  Filter, 
  Clock, 
  Share2, 
  Bookmark,
  Eye
} from 'lucide-react';
import VerificationResult from '@/components/VerificationResult';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useToast } from '@/hooks/use-toast';

interface NewsArticle {
  id: string;
  title: string;
  snippet: string;
  source: string;
  date: string;
  category: string;
  imageUrl?: string;
  url: string;
  isVerified?: boolean;
  verificationResult?: any;
}

const TrendingNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'New Study Shows Coffee Reduces Risk of Heart Disease by 50%',
      snippet: 'Researchers from Harvard Medical School published findings suggesting regular coffee consumption significantly reduces cardiovascular risks...',
      source: 'Health Today',
      date: '2024-01-15',
      category: 'health',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      url: 'https://example.com/coffee-study'
    },
    {
      id: '2',
      title: 'Government Announces New Digital Currency Launch Next Month',
      snippet: 'Officials confirm the rollout of a central bank digital currency (CBDC) will begin in March, marking a significant shift in monetary policy...',
      source: 'Economic Times',
      date: '2024-01-14',
      category: 'politics',
      url: 'https://example.com/digital-currency'
    },
    {
      id: '3',
      title: 'Breakthrough AI Model Solves Complex Mathematical Theorems',
      snippet: 'Scientists at MIT have developed an AI system capable of proving advanced mathematical theorems, potentially revolutionizing research...',
      source: 'Tech Weekly',
      date: '2024-01-13',
      category: 'technology',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      url: 'https://example.com/ai-breakthrough'
    },
    {
      id: '4',
      title: 'Climate Change Causes Unusual Weather Patterns Worldwide',
      snippet: 'Meteorologists report unprecedented weather anomalies across different continents, linking them to accelerating climate change effects...',
      source: 'Environmental News',
      date: '2024-01-12',
      category: 'environment',
      url: 'https://example.com/climate-weather'
    },
    {
      id: '5',
      title: 'Vaccine Prevents 95% of Cases in Latest Clinical Trial',
      snippet: 'Pharmaceutical company releases Phase 3 trial results showing remarkable efficacy rates for new preventive vaccine...',
      source: 'Medical Journal',
      date: '2024-01-11',
      category: 'health',
      imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400',
      url: 'https://example.com/vaccine-trial'
    },
    {
      id: '6',
      title: 'Tech Giant Announces Revolutionary Quantum Computing Chip',
      snippet: 'Major technology company unveils quantum processor with unprecedented computational capabilities, promising to transform multiple industries...',
      source: 'Innovation Daily',
      date: '2024-01-10',
      category: 'technology',
      url: 'https://example.com/quantum-chip'
    }
  ]);
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'politics', label: 'Politics' },
    { value: 'health', label: 'Health' },
    { value: 'technology', label: 'Technology' },
    { value: 'environment', label: 'Environment' },
    { value: 'business', label: 'Business' }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const generateVerificationResult = (article: NewsArticle) => {
    const verdicts = ['True', 'False', 'Misleading', 'Unverified'] as const;
    const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
    const confidence = Math.floor(Math.random() * 30) + 70;
    
    const explanations = {
      True: `Our analysis confirms this claim is accurate. Multiple credible sources support the findings mentioned in "${article.title}". The information aligns with established research and has been verified through cross-referencing with trusted publications.`,
      False: `This claim has been debunked by fact-checkers. The information in "${article.title}" contradicts established scientific consensus and reliable sources. Multiple authoritative organizations have published corrections to similar claims.`,
      Misleading: `While containing some factual elements, this claim oversimplifies complex information. "${article.title}" presents partial truths but lacks important context that could lead to misinterpretation.`,
      Unverified: `We cannot definitively verify this claim at this time. "${article.title}" requires additional evidence and expert review before a conclusive determination can be made.`
    };

    const evidencePoints = {
      True: [
        'Multiple peer-reviewed studies support these findings',
        'Reputable news organizations have confirmed the information',
        'Expert consensus aligns with the reported claims',
        'Primary source documentation is available'
      ],
      False: [
        'Contradicts established scientific research',
        'No credible sources support these claims',
        'Has been debunked by fact-checking organizations',
        'Lacks evidence from reliable authorities'
      ],
      Misleading: [
        'Contains cherry-picked statistics',
        'Missing important contextual information',
        'Oversimplifies complex research findings',
        'May lead to incorrect conclusions'
      ],
      Unverified: [
        'Limited available research on this topic',
        'Conflicting reports from different sources',
        'Requires additional expert verification',
        'Primary sources not yet accessible'
      ]
    };

    const sources = [
      { name: 'Reuters Fact Check', url: 'https://reuters.com/fact-check', credibility: 'High' as const },
      { name: 'Associated Press', url: 'https://apnews.com', credibility: 'High' as const },
      { name: 'BBC Verify', url: 'https://bbc.com/news/reality_check', credibility: 'High' as const },
      { name: 'Snopes', url: 'https://snopes.com', credibility: 'Medium' as const },
      { name: article.source, url: article.url, credibility: 'Medium' as const }
    ];

    return {
      verdict: randomVerdict,
      confidence,
      explanation: explanations[randomVerdict],
      evidence: evidencePoints[randomVerdict].slice(0, 3),
      sources: sources.slice(0, 4),
      checkedAt: new Date().toLocaleDateString(),
      claimText: article.title,
      originalClaim: article.title,
      hadCorrections: false
    };
  };

  const handleVerify = async (article: NewsArticle) => {
    setVerifyingId(article.id);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = generateVerificationResult(article);
    
    setArticles(prev => prev.map(a => 
      a.id === article.id 
        ? { ...a, isVerified: true, verificationResult: result }
        : a
    ));
    
    setVerifyingId(null);
    
    toast({
      title: "Verification Complete",
      description: `Claim verified as ${result.verdict} with ${result.confidence}% confidence`,
    });
  };

  const handleSave = (article: NewsArticle) => {
    toast({
      title: "Article Saved",
      description: "Added to your reading list",
    });
  };

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.snippet,
        url: article.url
      });
    } else {
      navigator.clipboard.writeText(`${article.title} - ${article.url}`);
      toast({
        title: "Copied to clipboard",
        description: "Article link copied to your clipboard",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      politics: 'bg-blue-100 text-blue-800 border-blue-200',
      health: 'bg-green-100 text-green-800 border-green-200',
      technology: 'bg-purple-100 text-purple-800 border-purple-200',
      environment: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      business: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Trending News
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest headlines. Click "Verify" on any story to check its accuracy instantly.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map(article => (
            <Card key={article.id} className="shadow-soft hover:shadow-card transition-shadow group">
              {article.imageUrl && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className={getCategoryColor(article.category)}
                  >
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.snippet}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">{article.source}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => window.open(article.url, '_blank')}
                    className="h-auto p-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleVerify(article)}
                    disabled={verifyingId === article.id}
                    className="flex-1"
                    variant={article.isVerified ? "secondary" : "default"}
                  >
                    {verifyingId === article.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </div>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        {article.isVerified ? 'Re-verify' : 'Verify'}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSave(article)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(article)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Verification Result */}
                {article.isVerified && article.verificationResult && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <VerificationResult result={article.verificationResult} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found matching your search criteria.
            </p>
          </div>
        )}

        {/* Loading Animation */}
        {verifyingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8">
              <LoadingAnimation />
              <p className="text-center mt-4 text-muted-foreground">
                Verifying article accuracy...
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingNews;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Clock, 
  User, 
  Globe, 
  Heart, 
  Camera, 
  Search,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const Learn = () => {
  const tips = [
    {
      icon: Eye,
      title: "How Fake News Spreads",
      category: "Understanding",
      content: "False information spreads through social media algorithms that prioritize engagement over accuracy. Sensational content gets more shares, creating echo chambers where misinformation thrives.",
      keyPoints: [
        "Social media algorithms amplify engaging content",
        "Confirmation bias makes people share information that matches their beliefs",
        "Bots and coordinated accounts accelerate spread",
        "Emotional content spreads faster than factual content"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Common Misinformation Tricks",
      category: "Recognition",
      content: "Misinformation often uses psychological tricks to appear credible. Learning to spot these tactics is crucial for media literacy.",
      keyPoints: [
        "Clickbait headlines designed to provoke emotions",
        "Out-of-context images and videos",
        "Fake expert testimonials and credentials",
        "Statistical manipulation and cherry-picking data",
        "Mimicking legitimate news website designs"
      ]
    },
    {
      icon: CheckCircle,
      title: "Verification Techniques",
      category: "Action",
      content: "Practical steps you can take to verify information before sharing it with others.",
      keyPoints: [
        "Check multiple reputable sources",
        "Look for author bylines and publication dates",
        "Use reverse image search for photos",
        "Verify quotes and statistics with original sources",
        "Check fact-checking websites like Snopes or PolitiFact"
      ]
    },
    {
      icon: User,
      title: "Evaluate the Source",
      category: "Analysis",
      content: "Understanding who published information and their credibility is essential for determining reliability.",
      keyPoints: [
        "Look for editorial standards and corrections policies",
        "Check if the author has relevant expertise",
        "Examine the website's 'About Us' section",
        "Look for transparency in funding and ownership",
        "Check if other reputable sources cite this outlet"
      ]
    },
    {
      icon: Clock,
      title: "Check Publication Dates",
      category: "Context",
      content: "Old news can be recycled as current events, especially during crises or elections.",
      keyPoints: [
        "Always check when the article was published",
        "Look for 'updated' timestamps that might indicate changes",
        "Be aware of recycled crisis photos from previous events",
        "Consider if the timing seems suspicious (e.g., just before elections)"
      ]
    },
    {
      icon: Camera,
      title: "Image and Video Verification",
      category: "Technical",
      content: "Visual content is often manipulated or taken out of context to support false narratives.",
      keyPoints: [
        "Use Google's reverse image search",
        "Check for signs of digital manipulation",
        "Look for inconsistencies in lighting and shadows",
        "Verify location using Google Street View or satellite images",
        "Check metadata if available"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Understanding: "bg-primary/10 text-primary border-primary/20",
      Recognition: "bg-warning/10 text-warning border-warning/20",
      Action: "bg-success/10 text-success border-success/20",
      Analysis: "bg-accent/10 text-accent border-accent/20",
      Context: "bg-secondary text-secondary-foreground border-secondary",
      Technical: "bg-muted text-muted-foreground border-muted-foreground/20"
    };
    return colors[category as keyof typeof colors] || colors.Understanding;
  };

  const warningSignsData = [
    {
      sign: "Emotional Language",
      description: "Headlines using words like 'SHOCKING', 'UNBELIEVABLE', or 'MUST WATCH'",
      example: "SHOCKING: This will change EVERYTHING you know!"
    },
    {
      sign: "No Author Information",
      description: "Articles without clear author attribution or credentials",
      example: "Published by 'Admin' or no byline at all"
    },
    {
      sign: "Suspicious URLs",
      description: "Websites mimicking legitimate sources with slight spelling changes",
      example: "cnn.co.in instead of cnn.com"
    },
    {
      sign: "Poor Grammar/Spelling",
      description: "Professional news sources maintain editorial standards",
      example: "Multiple typos and grammatical errors throughout"
    },
    {
      sign: "Lack of Sources",
      description: "Claims made without citing credible sources or evidence",
      example: "'According to experts' without naming the experts"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Learn to Spot Misinformation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Develop the skills to identify false information, understand how it spreads, 
            and learn practical verification techniques to combat misinformation.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-soft text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-destructive mb-2">73%</div>
              <div className="text-sm text-muted-foreground">of Indians encounter fake news daily</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-warning mb-2">6x</div>
              <div className="text-sm text-muted-foreground">faster than real news spreads online</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-success mb-2">85%</div>
              <div className="text-sm text-muted-foreground">accuracy with proper verification</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {tips.map((tip, index) => (
            <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <tip.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{tip.title}</CardTitle>
                  </div>
                  <Badge className={getCategoryColor(tip.category)}>
                    {tip.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{tip.content}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Points:</h4>
                  <ul className="space-y-1">
                    {tip.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Warning Signs Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Red Flags to Watch For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn to recognize these warning signs that often indicate unreliable or false information.
            </p>
          </div>

          <div className="grid gap-4">
            {warningSignsData.map((warning, index) => (
              <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-destructive/10 rounded-lg flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-foreground">{warning.sign}</h3>
                      <p className="text-muted-foreground text-sm">{warning.description}</p>
                      <div className="bg-secondary/50 p-3 rounded border-l-2 border-l-destructive/30">
                        <p className="text-xs text-muted-foreground italic">
                          Example: {warning.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Action Guide */}
        <section>
          <Card className="shadow-card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span>Quick Verification Checklist</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Before You Share:</h3>
                  <div className="space-y-2">
                    {[
                      "Check the source and author",
                      "Look for publication date",
                      "Search for other sources covering the story",
                      "Verify any images or videos"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Useful Tools:</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span>Google Reverse Image Search</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-primary" />
                      <span>Fact-checking websites (Snopes, PolitiFact)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span>Cross-reference with multiple news sources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Check publication dates and updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Learn;
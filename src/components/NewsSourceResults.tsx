import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ExternalLink, Globe } from 'lucide-react';

interface NewsSource {
  site: string;
  domain: string;
  found: boolean;
  url: string | null;
  snippet: string | null;
}

interface NewsSourceResultsProps {
  searchResults: NewsSource[];
  foundCount: number;
  totalSources: number;
}

const NewsSourceResults: React.FC<NewsSourceResultsProps> = ({ 
  searchResults, 
  foundCount, 
  totalSources 
}) => {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary" />
            <span>Indian News Sources Search</span>
          </div>
          <Badge variant="outline" className="text-sm">
            {foundCount}/{totalSources} sources found it
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            Searched across India's top 5 trusted news websites:
          </div>
          
          <div className="grid gap-3">
            {searchResults.map((source, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  source.found 
                    ? 'bg-success/5 border-success/20 hover:bg-success/10' 
                    : 'bg-muted/20 border-muted hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {source.found ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <div className="font-medium text-foreground">
                      {source.site}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {source.domain}
                    </div>
                    {source.snippet && (
                      <div className="text-xs text-muted-foreground mt-1 max-w-md">
                        {source.snippet}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={source.found ? "default" : "outline"}
                    className="text-xs"
                  >
                    {source.found ? "Found" : "Not Found"}
                  </Badge>
                  {source.found && source.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(source.url!, '_blank')}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong className="text-accent">Methodology:</strong> We search only these 5 trusted Indian news sources. 
              {foundCount >= 3 ? ' Strong consensus indicates the claim is likely true.' :
               foundCount === 2 ? ' Limited coverage suggests caution is needed.' :
               foundCount === 1 ? ' Single source coverage is insufficient for verification.' :
               ' No coverage found from trusted sources.'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSourceResults;
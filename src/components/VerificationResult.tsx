import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  Clock,
  TrendingUp,
  Share2,
  Lightbulb,
  CheckCheck,
  Sparkles,
  Volume2,
  VolumeX,
  Pause,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';

interface VerificationResultProps {
  result: {
    verdict: 'True' | 'False' | 'Misleading' | 'Unverified';
    confidence: number;
    explanation: string;
    detailedExplanation?: string;
    evidence?: string[];
    sources: Array<{
      name: string;
      url: string;
      credibility: 'High' | 'Medium' | 'Low';
    }>;
    checkedAt: string;
    claimText: string;
    originalClaim?: string;
    hadCorrections?: boolean;
  };
}

const VerificationResult = ({ result }: VerificationResultProps) => {
  const { toast } = useToast();
  const { speak, stop, isSpeaking, isSupported } = useTextToSpeech({
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8
  });

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'False':
        return <XCircle className="h-6 w-6 text-destructive" />;
      case 'Misleading':
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'Unverified':
        return <HelpCircle className="h-6 w-6 text-muted-foreground" />;
      default:
        return <HelpCircle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return 'bg-success text-success-foreground';
      case 'False':
        return 'bg-destructive text-destructive-foreground';
      case 'Misleading':
        return 'bg-warning text-warning-foreground';
      case 'Unverified':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getCredibilityBadge = (credibility: string) => {
    const colors = {
      High: 'bg-success/10 text-success border-success/20',
      Medium: 'bg-warning/10 text-warning border-warning/20',
      Low: 'bg-destructive/10 text-destructive border-destructive/20'
    };
    return colors[credibility as keyof typeof colors] || colors.Medium;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Fact-Check Result',
        text: `Claim verified as ${result.verdict} with ${result.confidence}% confidence`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(
        `Claim verified as ${result.verdict} with ${result.confidence}% confidence. Checked on TruthGuard AI.`
      );
      toast({
        title: "Copied to clipboard",
        description: "Result summary copied to your clipboard.",
      });
    }
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    const textToRead = `
      Verification Result: ${result.verdict} with ${result.confidence}% confidence.
      
      ${result.explanation}
      
      ${result.detailedExplanation || ''}
      
      ${result.evidence ? `Evidence includes: ${result.evidence.join('. ')}` : ''}
      
      Always verify sources before sharing information.
    `;

    speak(textToRead);
    
    toast({
      title: isSpeaking ? "Stopped reading" : "Reading aloud",
      description: isSpeaking ? "Speech stopped" : "Reading the verification result",
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Main Result */}
      <Card className="shadow-card border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getVerdictIcon(result.verdict)}
              <span>Verification Result</span>
            </div>
            <div className="flex gap-2">
              {isSupported && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReadAloud}
                  className="hover:bg-secondary"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Read Aloud
                    </>
                  )}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-secondary"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Verdict Badge */}
          <div className="flex items-center justify-center">
            <Badge 
              className={`${getVerdictColor(result.verdict)} text-lg px-6 py-2 font-bold shadow-soft`}
            >
              {result.verdict}
            </Badge>
          </div>

          {/* Confidence Score */}
          <div className="text-center space-y-2">
            <div className={`text-3xl font-bold ${getConfidenceColor(result.confidence)}`}>
              {result.confidence}%
            </div>
            <div className="text-muted-foreground">Confidence Score</div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                  result.confidence >= 85 ? 'bg-success' :
                  result.confidence >= 70 ? 'bg-warning' : 'bg-destructive'
                }`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Analysis & Reasoning
            </h3>
            <div className="bg-secondary/30 p-6 rounded-lg border space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {result.explanation}
              </p>
              
              {result.detailedExplanation && (
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.detailedExplanation}
                  </p>
                </div>
              )}
              
              {result.evidence && result.evidence.length > 0 && (
                <div className="border-t border-border/50 pt-4">
                  <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                    <CheckCheck className="h-4 w-4 mr-2 text-primary" />
                    Evidence Points
                  </h4>
                  <ul className="space-y-2">
                    {result.evidence.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            Verified on {result.checkedAt}
          </div>
        </CardContent>
      </Card>

      {/* Trusted Sources */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5 text-primary" />
            <span>Trusted Sources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {result.sources.map((source, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border hover:bg-secondary/30 transition-colors group"
              >
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{source.name}</div>
                  <div className="text-sm text-muted-foreground">{source.url}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={getCredibilityBadge(source.credibility)}
                  >
                    {source.credibility} Credibility
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(source.url, '_blank')}
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-accent">Note:</strong> These sources were analyzed for relevance and credibility. 
              We recommend reviewing multiple sources to form a complete understanding.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Claim Summary */}
      <Card className="shadow-soft bg-muted/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>Verified Claim</span>
            {result.hadCorrections && (
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Auto-corrected
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground italic">
            "{result.claimText.length > 200 ? result.claimText.substring(0, 200) + '...' : result.claimText}"
          </p>
          
          {result.hadCorrections && result.originalClaim && result.originalClaim !== result.claimText && (
            <div className="border-t border-border/50 pt-4">
              <details className="space-y-2">
                <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  View original text (before corrections)
                </summary>
                <p className="text-sm text-muted-foreground italic bg-muted/30 p-3 rounded border">
                  "{result.originalClaim.length > 200 ? result.originalClaim.substring(0, 200) + '...' : result.originalClaim}"
                </p>
              </details>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Pro Tip */}
      <Card className="shadow-soft bg-accent/5 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-accent">Always verify sources before sharing</h3>
              <p className="text-xs text-muted-foreground">
                Cross-reference information with multiple trusted sources and verify the publication date and author credibility.
              </p>
              {isSupported && (
                <p className="text-xs text-accent/80 flex items-center mt-2">
                  <Volume2 className="h-3 w-3 mr-1" />
                  Use the "Read Aloud" feature to have results read to you
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationResult;
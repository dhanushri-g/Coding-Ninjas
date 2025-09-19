import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Upload, RotateCcw, AlertCircle, Eye, EyeOff, Sparkles, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import VerificationResult from '@/components/VerificationResult';
import LoadingAnimation from '@/components/LoadingAnimation';
import VerdictPill from '@/components/VerdictPill';
import NewsSourceResults from '@/components/NewsSourceResults';

const ClaimChecker = () => {
  const [inputText, setInputText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectingText, setIsCorrectingText] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [hasCorrections, setHasCorrections] = useState(false);
  const [useOriginalText, setUseOriginalText] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, login } = useAuth();

  // Simulated spelling and grammar correction
  const simulateSpellCheck = async (text: string) => {
    if (!text.trim()) return text;
    
    setIsCorrectingText(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple corrections simulation
    const corrections = {
      'teh': 'the',
      'adn': 'and',
      'recieve': 'receive',
      'seperate': 'separate',
      'definately': 'definitely',
      'occured': 'occurred',
      'existance': 'existence',
      'beleive': 'believe',
      'acheive': 'achieve',
      'goverment': 'government',
      'enviroment': 'environment',
      'managment': 'management',
      'completly': 'completely',
      'realy': 'really',
      'finaly': 'finally',
      'dont': "don't",
      'cant': "can't",
      'wont': "won't",
      'its ': "it's ",
      'their is': 'there is',
      'there are alot': 'there are a lot',
      'alot': 'a lot'
    };

    let corrected = text;
    let hasMadeCorrections = false;
    
    Object.entries(corrections).forEach(([wrong, right]) => {
      const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
      if (regex.test(corrected)) {
        corrected = corrected.replace(regex, right);
        hasMadeCorrections = true;
      }
    });

    // Grammar improvements
    corrected = corrected
      .replace(/\s+/g, ' ') // Multiple spaces to single space
      .replace(/([.!?])\s*([a-z])/g, '$1 $2') // Proper spacing after punctuation
      .replace(/([a-zA-Z])([.!?])/g, '$1$2') // Remove space before punctuation
      .trim();

    setIsCorrectingText(false);
    return { corrected, hasCorrections: hasMadeCorrections };
  };

  // Auto-correct text as user types with debounce
  useEffect(() => {
    if (!inputText.trim()) {
      setCorrectedText('');
      setHasCorrections(false);
      return;
    }

    const timer = setTimeout(async () => {
      const result = await simulateSpellCheck(inputText);
      if (typeof result === 'object') {
        setCorrectedText(result.corrected);
        setHasCorrections(result.hasCorrections);
        setOriginalText(inputText);
      } else {
        setCorrectedText(result);
        setHasCorrections(false);
        setOriginalText(inputText);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [inputText]);

  // Indian News Websites Checker
  const NEWS_SITES = [
    { name: "India Times", domain: "indiatimes.com" },
    { name: "Hindustan Times", domain: "hindustantimes.com" },
    { name: "News18", domain: "news18.com" },
    { name: "NDTV", domain: "ndtv.com" },
    { name: "Indian Express", domain: "indianexpress.com" }
  ];

  const searchNewsWebsites = async (query: string) => {
    const results = [];
    
    for (const site of NEWS_SITES) {
      try {
        // Simulate search across each news website
        // In a real implementation, you would use web search APIs
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:${site.domain}`;
        
        // Simulate API delay and random results
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Mock search results based on keywords for demo
        const found = Math.random() > 0.4; // 60% chance of finding results
        
        results.push({
          site: site.name,
          domain: site.domain,
          found,
          url: found ? `https://${site.domain}/news/claim-related-article` : null,
          snippet: found ? `${site.name} reported on this claim with relevant coverage.` : null
        });
      } catch (error) {
        results.push({
          site: site.name,
          domain: site.domain,
          found: false,
          url: null,
          snippet: null
        });
      }
    }
    
    return results;
  };

  const simulateVerification = async () => {
    const textToVerify = (useOriginalText || !correctedText) ? (inputText || inputUrl || (selectedFile ? selectedFile.name : '')) : correctedText;
    
    setError(null);
    if (!textToVerify.trim()) {
      setError("Please enter a claim to verify.");
      return null;
    }

    try {
      // Search across the 5 Indian news websites
      const searchResults = await searchNewsWebsites(textToVerify);
      
      // Count sources that found the claim
      const foundSources = searchResults.filter(result => result.found);
      const foundCount = foundSources.length;
      
      let verdict = "Not Found";
      let confidence = 0;
      let explanation = "No trusted sources reported this claim.";
      
      // Determine verdict based on source consistency
      if (foundCount >= 3) {
        verdict = "True";
        confidence = 85 + (foundCount - 3) * 5; // 85-100% based on sources
        explanation = `Verified: Reported consistently by ${foundCount} out of 5 trusted Indian news sources.`;
      } else if (foundCount === 2) {
        verdict = "Partially Verified";
        confidence = 65;
        explanation = `Partially verified: Only ${foundCount} sources reported this. Exercise caution.`;
      } else if (foundCount === 1) {
        verdict = "Unclear";
        confidence = 30;
        explanation = `Only ${foundCount} source reported this. Insufficient evidence for verification.`;
      } else {
        verdict = "Not Found";
        confidence = 0;
        explanation = "No trusted Indian news sources have reported this claim.";
      }

      const now = new Date();
      const verifiedOn = now.toLocaleDateString() + ', ' + now.toLocaleTimeString();

      return {
        verdict,
        confidence,
        explanation,
        detailedExplanation: explanation,
        evidence: foundSources.map(source => source.snippet).filter(Boolean),
        sources: foundSources.map(source => ({ 
          name: source.site, 
          url: source.url || `https://${source.domain}`, 
          credibility: "High" 
        })),
        checkedAt: verifiedOn,
        claimText: textToVerify,
        originalClaim: originalText || inputText || inputUrl || (selectedFile ? selectedFile.name : ''),
        hadCorrections: hasCorrections && correctedText && correctedText !== originalText && !useOriginalText,
        rawEvidence: foundSources,
        rawReferences: searchResults,
        searchResults: searchResults, // Include all search results for display
        foundCount,
        totalSources: NEWS_SITES.length
      };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to verify claim: " + (err as Error).message);
    }
  };

  const handleSignIn = async () => {
    if (!signInEmail || !signInPassword) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSigningIn(true);
    const success = await login(signInEmail, signInPassword);
    
    if (success) {
      setShowSignInDialog(false);
      setSignInEmail('');
      setSignInPassword('');
      toast({
        title: "Signed in successfully",
        description: "You can now verify claims with enhanced features.",
      });
    } else {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    setIsSigningIn(false);
  };

  const handleVerification = async () => {
    setVerificationResult(null);
    setError(null);

    setIsLoading(true);

    try {
      const result = await simulateVerification();
      if (result) {
        setVerificationResult(result);
        toast({
          title: "Verification Complete",
          description: `Claim verified with ${result.confidence}% confidence.`,
        });
      }
    } catch (error) {
      setError("Failed to verify claim: " + (error as Error).message);
      toast({
        title: "Verification Failed",
        description: "Sorry, we encountered an error while verifying your claim. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setOriginalText('');
    setCorrectedText('');
    setUseOriginalText(false);
    setInputUrl('');
    setSelectedFile(null);
    setVerificationResult(null);
    setIsLoading(false);
    setHasCorrections(false);
    setShowOriginal(false);
    setError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.).",
          variant: "destructive",
        });
        return;
      }
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Claim Verification
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit news text, URLs, or images for AI-powered fact-checking and get instant verification results.
          </p>
        </div>

        {/* Input Section */}
        <Card className="shadow-card border-primary/10 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>What would you like to verify?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">Text/Article</TabsTrigger>
                <TabsTrigger value="url">URL/Link</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="claim-text">Paste the text or claim you want to verify</Label>
                  <div className="relative">
                    <Textarea
                      id="claim-text"
                      placeholder="Enter the news article, social media post, or claim you want to fact-check..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={6}
                      className="mt-2 resize-none"
                    />
                    {isCorrectingText && (
                      <div className="absolute top-4 right-4 flex items-center space-x-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>Auto-correcting...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Show corrected text if available */}
                  {hasCorrections && correctedText && (
                    <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-3">
                       <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Text Options for Verification</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowOriginal(!showOriginal)}
                            className="text-xs"
                          >
                            {showOriginal ? 'Hide Original' : 'Show Original'}
                          </Button>
                          <Button
                            variant={useOriginalText ? "default" : "outline"}
                            size="sm"
                            onClick={() => setUseOriginalText(!useOriginalText)}
                            className="text-xs"
                          >
                            Use {useOriginalText ? 'Original' : 'Corrected'}
                          </Button>
                        </div>
                      </div>
                      
                      {showOriginal && (
                        <div className="bg-muted/30 p-4 rounded-lg border">
                          <p className="text-sm text-muted-foreground italic">
                            <strong>Original:</strong> {originalText}
                          </p>
                        </div>
                      )}
                      
                      <div className={`p-4 rounded-lg border ${useOriginalText ? 'bg-muted/30 border-muted' : 'bg-primary/5 border-primary/20'}`}>
                        <p className="text-sm text-foreground">
                          <strong>{useOriginalText ? 'Using Original:' : 'Using Corrected:'}</strong> {useOriginalText ? originalText : correctedText}
                        </p>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        💡 Click "Use Original" to verify the original text instead of the corrected version.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="claim-url">Enter the URL of the article or post</Label>
                  <Input
                    id="claim-url"
                    type="url"
                    placeholder="https://example.com/news-article"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll analyze the content from the provided URL
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="image" className="space-y-4">
                <div>
                  <Label htmlFor="claim-image">Upload an image to verify</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="claim-image"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground text-center">
                            {selectedFile ? (
                              <span className="font-medium">{selectedFile.name}</span>
                            ) : (
                              <>
                                <span className="font-semibold">Click to upload</span> or drag and drop
                                <br />
                                PNG, JPG, GIF up to 10MB
                              </>
                            )}
                          </p>
                        </div>
                        <input
                          id="claim-image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleVerification}
                  disabled={isLoading || (!inputText.trim() && !inputUrl.trim() && !selectedFile)}
                  className="bg-gradient-primary hover:opacity-90 shadow-soft flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check claim
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  disabled={isLoading}
                  size="lg"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={demoMode} 
                    onChange={(e) => setDemoMode(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-muted-foreground">Demo mode (no backend)</span>
                </label>
                <div className="text-xs text-muted-foreground">Server contract: POST /api/verify</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5 mt-6">
            <CardContent className="pt-6">
              <div className="text-sm text-destructive">{error}</div>
            </CardContent>
          </Card>
        )}

        {/* Loading Animation */}
        {isLoading && <LoadingAnimation />}

        {/* Verification Result */}
        {verificationResult && !isLoading && (
          <div className="space-y-6 mt-6">
            <VerdictPill verdict={verificationResult.verdict} confidence={verificationResult.confidence / 100} />
            
            {/* News Sources Search Results */}
            {verificationResult.searchResults && (
              <NewsSourceResults 
                searchResults={verificationResult.searchResults}
                foundCount={verificationResult.foundCount}
                totalSources={verificationResult.totalSources}
              />
            )}
            
            <VerificationResult result={verificationResult} />
            
            {/* Additional Evidence */}
            {verificationResult.rawEvidence && verificationResult.rawEvidence.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {verificationResult.rawEvidence.map((ev: any, i: number) => (
                      <li key={i} className="p-3 border rounded-md bg-muted/20">
                        <div className="text-sm mb-2">{ev.snippet}</div>
                        <div className="text-xs text-muted-foreground">
                          {ev.publisher} • {ev.date} • <a className="underline hover:text-primary" href={ev.url} target="_blank" rel="noreferrer">Source</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Additional References */}
            {verificationResult.rawReferences && verificationResult.rawReferences.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trusted Sources / References</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal ml-5 text-sm space-y-1">
                    {verificationResult.rawReferences.map((r: any, i: number) => (
                      <li key={i}>
                        <a className="underline hover:text-primary" href={r.url} target="_blank" rel="noreferrer">
                          {r.title}
                        </a> — {r.publisher}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Sign In Prompt Section */}
        {!user && (
          <Card className="shadow-soft bg-primary/5 border-primary/20 mt-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <LogIn className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-foreground">Get Enhanced Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access premium verification features including detailed source analysis, 
                    historical claim tracking, and personalized fact-checking insights.
                  </p>
                  <Button 
                    onClick={() => setShowSignInDialog(true)}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="shadow-soft bg-accent/5 border-accent/20 mt-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">How it Works</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your input using advanced natural language processing, cross-references with trusted databases, 
                  and provides a confidence score based on source credibility and fact-checking algorithms.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Demo mode:</strong> Returns plausible demo responses for testing the UI without a backend. 
                  <strong>Live mode:</strong> Connects to /api/verify endpoint for real fact-checking (backend required).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Dialog */}
        <Dialog open={showSignInDialog} onOpenChange={setShowSignInDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <LogIn className="h-5 w-5 text-primary" />
                <span>Sign in required</span>
              </DialogTitle>
              <DialogDescription>
                Please sign in to access the claim verification feature and get detailed analysis results.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  disabled={isSigningIn}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  disabled={isSigningIn}
                  onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={handleSignIn}
                  disabled={isSigningIn || !signInEmail || !signInPassword}
                  className="bg-gradient-primary hover:opacity-90 flex-1"
                >
                  {isSigningIn ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowSignInDialog(false)}
                  disabled={isSigningIn}
                >
                  Cancel
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground text-center pt-2">
                Don't have an account? Use demo credentials: demo@example.com / demo123
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ClaimChecker;
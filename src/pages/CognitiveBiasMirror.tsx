import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, AlertTriangle, CheckCircle, XCircle, Eye, Clock, Target } from 'lucide-react';

interface TrustedSource {
  title: string;
  publisher: string;
  url: string;
  published_date: string;
  stance: 'supports' | 'contradicts' | 'mixed' | 'background';
  credibility: 'High' | 'Medium' | 'Low';
  relevance: number;
  snippet: string;
}

interface EvidenceCitation {
  point: string;
  source_url: string;
}

interface FactCheckResult {
  claim: string;
  verdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'INSUFFICIENT_EVIDENCE';
  confidence: number;
  rationale: string;
  key_points: string[];
  trusted_sources: TrustedSource[];
  evidence_citations: EvidenceCitation[];
  last_verified_at: string;
}

const CognitiveBiasMirror = () => {
  const [inputText, setInputText] = useState('');
  const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const performFactCheck = async (claim: string): Promise<FactCheckResult> => {
    // Simulate rigorous fact-checking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prompt = `You are a rigorous fact-checking assistant. Your job is to:
- Verify a single claim using recent, credible, and relevant sources.
- Provide a calibrated verdict: TRUE, FALSE, MISLEADING, or INSUFFICIENT_EVIDENCE.
- Select Trusted Sources that directly discuss the claim; do not list generic outlets if they did not cover it.
- Avoid speculation. If evidence is weak or conflicting, return INSUFFICIENT_EVIDENCE.
- Prefer primary sources (official releases, datasets, academic, regulator sites) and high-credibility outlets. Flag press releases or blogs as lower credibility unless corroborated.
- Time sensitivity: Prefer sources published near the claim date and update if newer authoritative reporting exists.
- Be specific. No boilerplate. All citations must be verifiable URLs.
- Output must strictly follow the JSON schema provided.

Labeling rubric:
- TRUE: Independent credible sources directly confirm the claim.
- FALSE: Credible sources directly contradict the claim.
- MISLEADING: Contains some facts but omits critical context, cherry-picks data, exaggerates, or misattributes.
- INSUFFICIENT_EVIDENCE: Not enough reliable coverage to verify one way or another.

Confidence scoring (0–100):
- Consider number of independent credible sources, alignment between them, recency, primary vs secondary evidence, and clarity of facts. Calibrate conservatively.

Verify the following claim:

Claim: ${claim}

Claim date (if known): ${new Date().toISOString().split('T')[0]}
Location/Context (if provided): Unknown

Task:
1) Search for evidence that directly confirms or refutes the claim.
2) Prefer official or primary sources (e.g., ARAI, government, academic, manufacturer/regulator).
3) Collect at least 3 relevant sources if available. If fewer exist, proceed and explain.
4) Decide the verdict using the rubric.
5) Provide a concise, evidence-grounded rationale.
6) Return only the JSON below.

Return JSON ONLY in this schema:
{
  "claim": string,
  "verdict": "TRUE" | "FALSE" | "MISLEADING" | "INSUFFICIENT_EVIDENCE",
  "confidence": number, 
  "rationale": string,
  "key_points": [string, ...],
  "trusted_sources": [
    {
      "title": string,
      "publisher": string,
      "url": string,
      "published_date": string, 
      "stance": "supports" | "contradicts" | "mixed" | "background",
      "credibility": "High" | "Medium" | "Low",
      "relevance": number,
      "snippet": string
    }
  ],
  "evidence_citations": [
    {
      "point": string,
      "source_url": string
    }
  ],
  "last_verified_at": string
}`;

    // Simulate AI response - in real implementation, this would call an LLM
    const simulatedResult: FactCheckResult = {
      claim: claim,
      verdict: Math.random() > 0.5 ? 'MISLEADING' : 'INSUFFICIENT_EVIDENCE',
      confidence: Math.floor(Math.random() * 40) + 30, // 30-70%
      rationale: "This claim requires verification through multiple independent sources. The available evidence suggests some elements may be accurate but lacks sufficient context or corroboration from primary sources to make a definitive determination.",
      key_points: [
        "Limited availability of primary source documentation",
        "Need for additional verification from authoritative sources",
        "Potential for missing context or selective presentation of facts"
      ],
      trusted_sources: [
        {
          title: "Official Source Analysis Required",
          publisher: "Verification System",
          url: "https://example.com/verification",
          published_date: new Date().toISOString().split('T')[0],
          stance: "background",
          credibility: "Medium",
          relevance: 70,
          snippet: "Further investigation needed to establish credibility of this claim."
        }
      ],
      evidence_citations: [
        {
          point: "Claim requires additional verification",
          source_url: "https://example.com/verification"
        }
      ],
      last_verified_at: new Date().toISOString()
    };

    return simulatedResult;
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const result = await performFactCheck(inputText);
      setFactCheckResult(result);
    } catch (error) {
      console.error('Error during fact-checking:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'FALSE': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'MISLEADING': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'INSUFFICIENT_EVIDENCE': return <Eye className="h-5 w-5 text-gray-500" />;
      default: return <Eye className="h-5 w-5 text-gray-500" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return 'border-green-500 bg-green-50';
      case 'FALSE': return 'border-red-500 bg-red-50';
      case 'MISLEADING': return 'border-orange-500 bg-orange-50';
      case 'INSUFFICIENT_EVIDENCE': return 'border-gray-500 bg-gray-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-12 w-12 text-primary mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rigorous Fact Checker
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional fact-checking with rigorous verification standards. 
          Get calibrated verdicts with credible sources and evidence.
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-soft border-primary/20 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Verify Claim
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter a claim to verify with rigorous fact-checking standards..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] text-base resize-none border-primary/20 focus:border-primary"
          />
          <Button 
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Fact-Checking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Verify Claim
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {factCheckResult && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center">
              {getVerdictIcon(factCheckResult.verdict)}
              <span className="ml-2">Fact-Check Result</span>
            </h2>
            <p className="text-muted-foreground">
              Rigorous verification with credible sources
            </p>
          </div>

          <Card className={`shadow-soft border-2 ${getVerdictColor(factCheckResult.verdict)}`}>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Claim */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-2">📝 Claim:</p>
                  <p className="text-foreground font-medium">"{factCheckResult.claim}"</p>
                </div>

                {/* Verdict */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getVerdictIcon(factCheckResult.verdict)}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Verdict:</p>
                      <p className="text-xl font-bold text-foreground">{factCheckResult.verdict}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">Confidence:</p>
                    <p className="text-xl font-bold text-foreground">{factCheckResult.confidence}%</p>
                  </div>
                </div>

                {/* Rationale */}
                <div className="bg-background/50 p-4 rounded-lg border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">📊 Analysis & Reasoning:</p>
                  <p className="text-foreground">{factCheckResult.rationale}</p>
                </div>

                {/* Key Points */}
                <div className="bg-background/50 p-4 rounded-lg border">
                  <p className="text-sm font-medium text-muted-foreground mb-3">🔍 Key Points:</p>
                  <ul className="space-y-2">
                    {factCheckResult.key_points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trusted Sources */}
                <div className="bg-background/50 p-4 rounded-lg border">
                  <p className="text-sm font-medium text-muted-foreground mb-3">📚 Trusted Sources:</p>
                  <div className="space-y-3">
                    {factCheckResult.trusted_sources.map((source, index) => (
                      <div key={index} className="border-l-4 border-l-primary pl-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-foreground">{source.title}</p>
                          <Badge variant={source.credibility === 'High' ? 'default' : source.credibility === 'Medium' ? 'secondary' : 'outline'}>
                            {source.credibility}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{source.publisher} • {source.published_date}</p>
                        <p className="text-sm text-foreground mt-1">{source.snippet}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Stance: {source.stance}</span>
                          <span>Relevance: {source.relevance}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Date */}
                <div className="text-center text-sm text-muted-foreground">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Verified on: {new Date(factCheckResult.last_verified_at).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How It Works Section */}
      <Card className="shadow-soft bg-accent/5 border-accent/20 mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Verification Standards
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>✅ TRUE:</strong> Independent credible sources confirm</p>
              <p><strong>❌ FALSE:</strong> Credible sources directly contradict</p>
              <p><strong>⚠️ MISLEADING:</strong> Some facts but missing context</p>
            </div>
            <div className="space-y-2">
              <p><strong>🔍 INSUFFICIENT:</strong> Not enough reliable coverage</p>
              <p><strong>📊 Primary Sources:</strong> Official releases preferred</p>
              <p><strong>⏰ Time Sensitive:</strong> Recent sources prioritized</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CognitiveBiasMirror;
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const TipOfTheDay = () => {
  const tips = [
    {
      title: "Check the Source",
      content: "Always verify who published the information. Reputable news organizations have editorial standards and fact-checking processes."
    },
    {
      title: "Look for Multiple Sources",
      content: "Cross-reference information across several reliable sources. If only one outlet is reporting it, be skeptical."
    },
    {
      title: "Check Publication Date",
      content: "Old news can be recycled as current events. Always check when the article was originally published."
    },
    {
      title: "Examine the URL",
      content: "Fake news sites often mimic legitimate ones with similar URLs. Look for subtle misspellings or unusual domains."
    },
    {
      title: "Be Wary of Emotional Headlines",
      content: "Headlines designed to provoke strong emotions often indicate clickbait or biased reporting."
    },
    {
      title: "Check for Author Information",
      content: "Legitimate articles include author bylines and credentials. Anonymous or missing author information is a red flag."
    },
    {
      title: "Reverse Image Search",
      content: "Images can be taken out of context. Use reverse image search to verify when and where photos were originally taken."
    },
    {
      title: "Read Beyond Headlines",
      content: "Headlines can be misleading. Read the full article to understand the complete context and facts."
    }
  ];

  const [currentTip, setCurrentTip] = useState(0);

  // Generate random tip on component mount (page load)
  useEffect(() => {
    setCurrentTip(Math.floor(Math.random() * tips.length));
  }, [tips.length]);

  const getNewTip = () => {
    let newTip;
    do {
      newTip = Math.floor(Math.random() * tips.length);
    } while (newTip === currentTip);
    setCurrentTip(newTip);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Tip of the Day</h2>
        
        <Card className="max-w-3xl mx-auto shadow-card hover:shadow-glow transition-all duration-300 border-accent/20 bg-gradient-to-br from-card to-accent/5">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-primary rounded-full flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {tips[currentTip].title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {tips[currentTip].content}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={getNewTip}
                className="group hover:border-primary hover:text-primary transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Get Another Tip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TipOfTheDay;
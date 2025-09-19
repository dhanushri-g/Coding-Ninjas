import { Card, CardContent } from '@/components/ui/card';
import { Search, Shield, CheckCircle } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <Card className="shadow-card border-primary/20 mb-8">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <h3 className="text-xl font-semibold text-foreground">
            Verifying Your Claim...
          </h3>
          
          {/* Loading Steps */}
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center space-x-3 animate-pulse">
              <div className="p-2 bg-primary rounded-full animate-bounce">
                <Search className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-muted-foreground">Analyzing content...</span>
            </div>
            
            <div className="flex items-center space-x-3 animate-pulse [animation-delay:0.3s]">
              <div className="p-2 bg-accent rounded-full animate-bounce [animation-delay:0.3s]">
                <Shield className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-muted-foreground">Cross-referencing sources...</span>
            </div>
            
            <div className="flex items-center space-x-3 animate-pulse [animation-delay:0.6s]">
              <div className="p-2 bg-success rounded-full animate-bounce [animation-delay:0.6s]">
                <CheckCircle className="h-4 w-4 text-success-foreground" />
              </div>
              <span className="text-muted-foreground">Generating confidence score...</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-primary rounded-full animate-pulse"></div>
          </div>

          {/* Loading Spinner */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent shadow-glow"></div>
          </div>

          <p className="text-sm text-muted-foreground">
            This usually takes 2-5 seconds. Please wait while our AI analyzes the information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingAnimation;
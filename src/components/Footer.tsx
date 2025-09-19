import { Shield, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">TruthGuard</span>
                <span className="text-xs text-muted-foreground block -mt-1">AI Fact Checker</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering truth through AI-powered fact verification. Combating misinformation one claim at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/check" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Check Claim
              </Link>
              <Link to="/learn" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Learn More
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Contact & Disclaimer */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@truthguard.ai</span>
              </div>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mt-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <strong className="text-warning">Demo Notice:</strong> This is a demonstration website. 
                  Verification results are simulated for educational purposes only.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 TruthGuard. This is a demo website. AI results are simulated.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
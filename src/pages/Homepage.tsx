import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Search, BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import TipOfTheDay from '@/components/TipOfTheDay';

const Homepage = () => {
  const stats = [
    { icon: Search, label: 'Claims Verified', value: '1M+' },
    { icon: Shield, label: 'Accuracy Rate', value: '94%' },
    { icon: Users, label: 'Users Protected', value: '500K+' },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI-powered fact checking technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground">
                AI-Powered
                <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  Misinformation Checker
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
                Combat the spread of fake news with our advanced AI verification system. 
                Get instant fact-checks on claims, news articles, and social media content.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/check">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-card hover:shadow-glow transition-all duration-300 group"
                >
                  Check a Claim
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card/10 border-primary-foreground/20 backdrop-blur-sm hover:bg-card/20 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                    <div className="text-primary-foreground/80">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                The Fight Against Misinformation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In India and worldwide, fake news spreads 6 times faster than real news on social media. 
                Misinformation influences elections, causes social unrest, and undermines public health efforts.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive font-bold text-sm">73%</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">of Indians encounter fake news daily</h3>
                  <p className="text-muted-foreground text-sm">According to recent studies on misinformation spread</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-warning font-bold text-sm">2x</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Faster during crisis situations</h3>
                  <p className="text-muted-foreground text-sm">Misinformation spreads rapidly during emergencies and elections</p>
                </div>
              </div>
            </div>

            <Link to="/check">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-card hover:shadow-glow transition-all duration-300">
                Start Fact-Checking Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="lg:pl-8">
            <Card className="shadow-card hover:shadow-glow transition-all duration-300 border-primary/10">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Lightbulb className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Why This Matters</h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Democratic Impact:</strong> False information can influence voting decisions and undermine democratic processes.
                  </p>
                  <p>
                    <strong className="text-foreground">Public Health:</strong> Medical misinformation puts lives at risk, especially during pandemics.
                  </p>
                  <p>
                    <strong className="text-foreground">Social Harmony:</strong> Fake news often targets communities, spreading hatred and division.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tip of the Day */}
      <TipOfTheDay />

      {/* CTA Section */}
      <section className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
              Ready to Verify Information?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of users who trust our AI-powered verification system to distinguish fact from fiction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/check">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-card"
                >
                  Verify a Claim Now
                </Button>
              </Link>
              <Link to="/learn">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-4 text-lg"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
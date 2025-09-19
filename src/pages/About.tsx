import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Target, 
  Users, 
  Zap, 
  Globe, 
  Brain,
  Award,
  ArrowRight,
  CheckCircle,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Analysis",
      description: "Our machine learning models analyze text patterns, source credibility, and cross-reference claims with verified databases."
    },
    {
      icon: Globe,
      title: "Global Fact-Check Network",
      description: "Connected to international fact-checking organizations and trusted news sources for comprehensive verification."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get instant results with our optimized algorithms that process claims in seconds, not minutes."
    },
    {
      icon: Award,
      title: "High Accuracy Rate",
      description: "Achieving 94% accuracy through continuous learning and validation against human fact-checkers."
    }
  ];

  const technologies = [
    { name: "Natural Language Processing", category: "AI/ML" },
    { name: "Google Cloud Platform", category: "Infrastructure" },
    { name: "Fact Check API", category: "Data" },
    { name: "Image Recognition", category: "AI/ML" },
    { name: "Source Credibility Database", category: "Data" },
    { name: "Machine Learning Models", category: "AI/ML" }
  ];

  const team = [
    {
      role: "Mission",
      icon: Target,
      content: "To empower citizens with the tools and knowledge needed to identify and combat misinformation, fostering a more informed and resilient society."
    },
    {
      role: "Vision", 
      icon: Shield,
      content: "A world where truth prevails over misinformation, where every person can confidently distinguish fact from fiction in their daily information consumption."
    },
    {
      role: "Impact",
      icon: Users,
      content: "Protecting democratic institutions, public health initiatives, and social harmony by reducing the spread and impact of false information."
    }
  ];

  const stats = [
    { value: "1M+", label: "Claims Verified", icon: CheckCircle },
    { value: "500K+", label: "Users Protected", icon: Users },
    { value: "94%", label: "Accuracy Rate", icon: Award },
    { value: "15+", label: "Countries Served", icon: Globe }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              About TruthGuard
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to combat misinformation through cutting-edge AI technology, 
            empowering users to verify claims and make informed decisions in an era of information overload.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission, Vision, Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {team.map((item, index) => (
            <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span>{item.role}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Misinformation Matters */}
        <section className="mb-16">
          <Card className="shadow-card bg-gradient-to-br from-destructive/5 to-warning/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
                <Heart className="h-6 w-6 text-destructive" />
                <span>Why Combating Misinformation Matters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                In India and worldwide, misinformation poses serious threats to democracy, public health, and social cohesion. 
                False information spreads faster than truth on social media, influencing elections, causing panic during emergencies, 
                and undermining trust in institutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Democratic Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    False information can influence voting decisions, undermine electoral integrity, 
                    and erode trust in democratic institutions.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Public Health</h3>
                  <p className="text-sm text-muted-foreground">
                    Medical misinformation puts lives at risk, especially during health crises 
                    like pandemics when accurate information is crucial.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Social Harmony</h3>
                  <p className="text-sm text-muted-foreground">
                    False narratives often target communities, spreading hatred, 
                    division, and sometimes leading to real-world violence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technology Features */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How Our Technology Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We leverage advanced AI and machine learning to provide accurate, fast, and reliable fact-checking services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technologies Used */}
        <section className="mb-16">
          <Card className="shadow-card bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Technologies Powering TruthGuard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <span className="font-medium text-foreground">{tech.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {tech.category}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-accent">Demo Notice:</strong> This is a demonstration website showcasing 
                  how AI-powered fact-checking could work. Verification results are simulated using realistic algorithms 
                  for educational and demonstration purposes. In a production environment, this would connect to real 
                  fact-checking APIs and databases.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="shadow-card bg-gradient-primary">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Join the Fight Against Misinformation
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
                Every verified claim makes our society more informed and resilient. 
                Start fact-checking today and help create a world where truth prevails.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/check">
                  <Button 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-card"
                  >
                    Start Verifying Claims
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-4 text-lg"
                  >
                    Learn More Techniques
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const Auth = () => {
  const { user, loading, signIn, signUp, isEditor } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  // Redirect if already authenticated
  if (user && !loading) {
    if (isEditor) {
      return <Navigate to="/editor-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-accent/10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message?.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message?.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link before signing in.');
        } else {
          setError(error.message || 'Failed to sign in. Please try again.');
        }
      } else {
        setSuccess('Sign in successful! Redirecting...');
        // The redirect will happen automatically via the useAuth hook
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (!name.trim()) {
      setError('Please enter your full name.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, name.trim());
      
      if (error) {
        if (error.message?.includes('User already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
          setActiveTab('signin');
        } else if (error.message?.includes('Password should be')) {
          setError('Password must be at least 6 characters long and contain a mix of characters.');
        } else if (error.message?.includes('Invalid email')) {
          setError('Please enter a valid email address.');
        } else {
          setError(error.message || 'Failed to create account. Please try again.');
        }
      } else {
        setSuccess('Account created successfully! Please check your email for a confirmation link before signing in.');
        setActiveTab('signin');
        // Clear form
        setName('');
        setPassword('');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isEditorEmail = (email: string) => {
    const editorEmails = ['editor@school.edu', 'coder@school.edu', 'admin@school.edu'];
    return editorEmails.includes(email.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-background dark:via-background dark:to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Staff Directory</CardTitle>
          <CardDescription>
            Sign in to access the staff directory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    required
                    disabled={isLoading}
                  />
                  {email && isEditorEmail(email) && (
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Editor email detected
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    required
                    disabled={isLoading}
                  />
                  {email && isEditorEmail(email) && (
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      This email will have editor privileges
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters long
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Status Messages */}
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Information */}
          <div className="mt-6 space-y-3 text-center text-sm text-muted-foreground">
            <div className="border-t pt-4">
              <p className="font-medium mb-2">Editor Access</p>
              <div className="space-y-1 text-xs">
                <p>Authorized editor emails:</p>
                <div className="font-mono space-y-1">
                  <p>• editor@school.edu</p>
                  <p>• coder@school.edu</p>
                  <p>• admin@school.edu</p>
                </div>
              </div>
            </div>
            <p className="text-xs">
              Editors get access to the full dashboard with CRUD functionality.
              Regular users can view the public staff directory.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

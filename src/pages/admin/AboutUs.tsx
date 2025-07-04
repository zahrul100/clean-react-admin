
import { useState } from 'react';
import { useDataStore, AboutUs as AboutUsType } from '@/store/dataStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WysiwygEditor from '@/components/WysiwygEditor';
import { toast } from '@/hooks/use-toast';

const AboutUs = () => {
  const { aboutUs, updateItem } = useDataStore();
  const [formData, setFormData] = useState(
    aboutUs[0] || { id: '1', background: '', vision: '', mission: '' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateItem('aboutUs', formData.id, formData);
    toast({ title: 'About Us updated successfully' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-1">Manage your company's about us content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Us Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="background" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="vision">Vision</TabsTrigger>
                <TabsTrigger value="mission">Mission</TabsTrigger>
              </TabsList>
              
              <TabsContent value="background" className="space-y-4">
                <Label>Company Background</Label>
                <WysiwygEditor
                  value={formData.background}
                  onChange={(value) => setFormData({ ...formData, background: value })}
                  placeholder="Enter company background..."
                />
              </TabsContent>
              
              <TabsContent value="vision" className="space-y-4">
                <Label>Company Vision</Label>
                <WysiwygEditor
                  value={formData.vision}
                  onChange={(value) => setFormData({ ...formData, vision: value })}
                  placeholder="Enter company vision..."
                />
              </TabsContent>
              
              <TabsContent value="mission" className="space-y-4">
                <Label>Company Mission</Label>
                <WysiwygEditor
                  value={formData.mission}
                  onChange={(value) => setFormData({ ...formData, mission: value })}
                  placeholder="Enter company mission..."
                />
              </TabsContent>
            </Tabs>
            
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;

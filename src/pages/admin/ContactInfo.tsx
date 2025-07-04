
import { useState } from 'react';
import { useDataStore, ContactInfo as ContactInfoType } from '@/store/dataStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const ContactInfo = () => {
  const { contactInfo, updateItem } = useDataStore();
  const [formData, setFormData] = useState(
    contactInfo[0] || { id: '1', address: '', email: '', phone: '' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateItem('contactInfo', formData.id, formData);
    toast({ title: 'Contact information updated successfully' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-600 mt-1">Manage your company's contact details</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main St, City, State ZIP"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@company.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save Contact Information
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;

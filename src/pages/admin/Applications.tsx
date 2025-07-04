
import { useState } from 'react';
import { useDataStore, Application } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Applications = () => {
  const { applications, careers, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    careerId: '',
    applicantName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: ''
  });

  const columns = [
    { key: 'applicantName' as keyof Application, label: 'Applicant Name' },
    { key: 'email' as keyof Application, label: 'Email' },
    { key: 'phone' as keyof Application, label: 'Phone' },
    { 
      key: 'careerId' as keyof Application, 
      label: 'Job Position',
      render: (value: string) => {
        const career = careers.find(c => c.id === value);
        return career?.jobTitle || 'Unknown Position';
      }
    },
    { key: 'appliedAt' as keyof Application, label: 'Applied Date' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      careerId: '',
      applicantName: '',
      email: '',
      phone: '',
      resume: '',
      coverLetter: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Application) => {
    setEditingItem(item);
    setFormData({
      careerId: item.careerId,
      applicantName: item.applicantName,
      email: item.email,
      phone: item.phone,
      resume: item.resume,
      coverLetter: item.coverLetter
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteItem('applications', id);
      toast({ title: 'Application deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const applicationData = {
      ...formData,
      appliedAt: editingItem?.appliedAt || new Date().toISOString().split('T')[0]
    };
    
    if (editingItem) {
      updateItem('applications', editingItem.id, applicationData);
      toast({ title: 'Application updated successfully' });
    } else {
      addItem('applications', applicationData);
      toast({ title: 'Application created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataTable
        data={applications}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Job Applications"
        searchPlaceholder="Search applications..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Application' : 'Add Application'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="careerId">Job Position</Label>
              <Select
                value={formData.careerId}
                onValueChange={(value) => setFormData({ ...formData, careerId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a job position" />
                </SelectTrigger>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.jobTitle} - {career.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicantName">Applicant Name</Label>
                <Input
                  id="applicantName"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
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
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="resume">Resume URL</Label>
                <Input
                  id="resume"
                  value={formData.resume}
                  onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                  placeholder="/resume.pdf"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applications;

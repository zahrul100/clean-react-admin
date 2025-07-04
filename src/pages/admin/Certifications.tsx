
import { useState } from 'react';
import { useDataStore, Certification } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Certifications = () => {
  const { certifications, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Certification | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image: ''
  });

  const columns = [
    { key: 'title' as keyof Certification, label: 'Title' },
    { 
      key: 'image' as keyof Certification, 
      label: 'Image',
      render: (value: string) => (
        <img src={value} alt="Certification" className="w-16 h-16 object-cover rounded" />
      )
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', image: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Certification) => {
    setEditingItem(item);
    setFormData({ title: item.title, image: item.image });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      deleteItem('certifications', id);
      toast({ title: 'Certification deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateItem('certifications', editingItem.id, formData);
      toast({ title: 'Certification updated successfully' });
    } else {
      addItem('certifications', formData);
      toast({ title: 'Certification created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataTable
        data={certifications}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Certifications"
        searchPlaceholder="Search certifications..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Certification' : 'Add Certification'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/placeholder.svg"
                required
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

export default Certifications;

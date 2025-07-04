
import { useState } from 'react';
import { useDataStore, CorporateEntity } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const CorporateEntities = () => {
  const { corporateEntities, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CorporateEntity | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    location: '',
    capacity: ''
  });

  const columns = [
    { key: 'name' as keyof CorporateEntity, label: 'Name' },
    { 
      key: 'logo' as keyof CorporateEntity, 
      label: 'Logo',
      render: (value: string) => (
        <img src={value} alt="Logo" className="w-12 h-12 object-cover rounded" />
      )
    },
    { key: 'location' as keyof CorporateEntity, label: 'Location' },
    { key: 'capacity' as keyof CorporateEntity, label: 'Capacity' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', logo: '', description: '', location: '', capacity: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: CorporateEntity) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      logo: item.logo,
      description: item.description,
      location: item.location,
      capacity: item.capacity
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this corporate entity?')) {
      deleteItem('corporateEntities', id);
      toast({ title: 'Corporate entity deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateItem('corporateEntities', editingItem.id, formData);
      toast({ title: 'Corporate entity updated successfully' });
    } else {
      addItem('corporateEntities', formData);
      toast({ title: 'Corporate entity created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataTable
        data={corporateEntities}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Corporate Entities"
        searchPlaceholder="Search corporate entities..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Corporate Entity' : 'Add Corporate Entity'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="/placeholder.svg"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
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

export default CorporateEntities;

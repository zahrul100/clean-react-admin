
import { useState } from 'react';
import { useDataStore, HeroBanner } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const HeroBanners = () => {
  const { heroBanners, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeroBanner | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    image: ''
  });

  const columns = [
    { key: 'title' as keyof HeroBanner, label: 'Title' },
    { key: 'tagline' as keyof HeroBanner, label: 'Tagline' },
    { 
      key: 'image' as keyof HeroBanner, 
      label: 'Image',
      render: (value: string) => (
        <img src={value} alt="Hero" className="w-16 h-10 object-cover rounded" />
      )
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', tagline: '', image: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: HeroBanner) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      tagline: item.tagline,
      image: item.image
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hero banner?')) {
      deleteItem('heroBanners', id);
      toast({ title: 'Hero banner deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateItem('heroBanners', editingItem.id, formData);
      toast({ title: 'Hero banner updated successfully' });
    } else {
      addItem('heroBanners', formData);
      toast({ title: 'Hero banner created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataTable
        data={heroBanners}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Hero Banners"
        searchPlaceholder="Search hero banners..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Hero Banner' : 'Add Hero Banner'}
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
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
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

export default HeroBanners;

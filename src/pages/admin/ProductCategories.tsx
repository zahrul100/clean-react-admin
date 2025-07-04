
import { useState } from 'react';
import { useDataStore, ProductCategory } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ProductCategories = () => {
  const { productCategories, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  const columns = [
    { key: 'name' as keyof ProductCategory, label: 'Name' },
    { key: 'slug' as keyof ProductCategory, label: 'Slug' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', slug: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: ProductCategory) => {
    setEditingItem(item);
    setFormData({ name: item.name, slug: item.slug });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product category?')) {
      deleteItem('productCategories', id);
      toast({ title: 'Product category deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateItem('productCategories', editingItem.id, formData);
      toast({ title: 'Product category updated successfully' });
    } else {
      addItem('productCategories', formData);
      toast({ title: 'Product category created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div>
      <DataTable
        data={productCategories}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Product Categories"
        searchPlaceholder="Search product categories..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Product Category' : 'Add Product Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({ 
                    ...formData, 
                    name,
                    slug: generateSlug(name)
                  });
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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

export default ProductCategories;

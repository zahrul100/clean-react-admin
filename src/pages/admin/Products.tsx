
import { useState } from 'react';
import { useDataStore, Product } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const { products, productCategories, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    image: '',
    pdfDatasheet: '',
    description: ''
  });

  const columns = [
    { key: 'name' as keyof Product, label: 'Name' },
    { 
      key: 'categoryId' as keyof Product, 
      label: 'Category',
      render: (value: string) => {
        const category = productCategories.find(c => c.id === value);
        return category?.name || 'Unknown';
      }
    },
    { 
      key: 'image' as keyof Product, 
      label: 'Image',
      render: (value: string) => (
        <img src={value} alt="Product" className="w-16 h-10 object-cover rounded" />
      )
    },
    { key: 'description' as keyof Product, label: 'Description' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      categoryId: '',
      image: '',
      pdfDatasheet: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Product) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      categoryId: item.categoryId,
      image: item.image,
      pdfDatasheet: item.pdfDatasheet,
      description: item.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteItem('products', id);
      toast({ title: 'Product deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateItem('products', editingItem.id, formData);
      toast({ title: 'Product updated successfully' });
    } else {
      addItem('products', formData);
      toast({ title: 'Product created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataTable
        data={products}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Products"
        searchPlaceholder="Search products..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Product' : 'Add Product'}
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
              <Label htmlFor="categoryId">Category</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div>
              <Label htmlFor="pdfDatasheet">PDF Datasheet URL</Label>
              <Input
                id="pdfDatasheet"
                value={formData.pdfDatasheet}
                onChange={(e) => setFormData({ ...formData, pdfDatasheet: e.target.value })}
                placeholder="/sample.pdf"
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

export default Products;


import { useState } from 'react';
import { useDataStore, Article } from '@/store/dataStore';
import DataTable from '@/components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WysiwygEditor from '@/components/WysiwygEditor';
import { toast } from '@/hooks/use-toast';

const Articles = () => {
  const { articles, addItem, updateItem, deleteItem } = useDataStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    thumbnail: '',
    content: '',
    publishStatus: 'draft' as 'draft' | 'published'
  });

  const columns = [
    { key: 'title' as keyof Article, label: 'Title' },
    { key: 'category' as keyof Article, label: 'Category' },
    { 
      key: 'thumbnail' as keyof Article, 
      label: 'Thumbnail',
      render: (value: string) => (
        <img src={value} alt="Thumbnail" className="w-16 h-10 object-cover rounded" />
      )
    },
    { 
      key: 'publishStatus' as keyof Article, 
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'createdAt' as keyof Article, label: 'Created' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: '',
      thumbnail: '',
      content: '',
      publishStatus: 'draft'
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Article) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      thumbnail: item.thumbnail,
      content: item.content,
      publishStatus: item.publishStatus
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteItem('articles', id);
      toast({ title: 'Article deleted successfully' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      createdAt: editingItem?.createdAt || new Date().toISOString().split('T')[0]
    };
    
    if (editingItem) {
      updateItem('articles', editingItem.id, articleData);
      toast({ title: 'Article updated successfully' });
    } else {
      addItem('articles', articleData);
      toast({ title: 'Article created successfully' });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div>
      <DataTable
        data={articles}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Articles"
        searchPlaceholder="Search articles..."
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Article' : 'Add Article'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="/placeholder.svg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="publishStatus">Publish Status</Label>
                <Select
                  value={formData.publishStatus}
                  onValueChange={(value: 'draft' | 'published') => 
                    setFormData({ ...formData, publishStatus: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Content</Label>
              <WysiwygEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your article content here..."
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

export default Articles;

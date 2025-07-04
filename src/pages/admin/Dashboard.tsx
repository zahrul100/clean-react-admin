
import { useDataStore } from '@/store/dataStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Image, 
  Building, 
  Award, 
  Package, 
  FileText, 
  Briefcase,
  Users,
  Phone
} from 'lucide-react';

const Dashboard = () => {
  const {
    heroBanners,
    corporateEntities,
    certifications,
    products,
    articles,
    careers,
    applications,
    contactInfo
  } = useDataStore();

  const stats = [
    { label: 'Hero Banners', count: heroBanners.length, icon: Image, color: 'bg-blue-500' },
    { label: 'Corporate Entities', count: corporateEntities.length, icon: Building, color: 'bg-green-500' },
    { label: 'Certifications', count: certifications.length, icon: Award, color: 'bg-yellow-500' },
    { label: 'Products', count: products.length, icon: Package, color: 'bg-purple-500' },
    { label: 'Articles', count: articles.length, icon: FileText, color: 'bg-red-500' },
    { label: 'Job Openings', count: careers.filter(c => c.status === 'active').length, icon: Briefcase, color: 'bg-indigo-500' },
    { label: 'Applications', count: applications.length, icon: Users, color: 'bg-pink-500' },
    { label: 'Contact Info', count: contactInfo.length, icon: Phone, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardTitle>
              <div className={`${stat.color} p-2 rounded-md`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <div key={article.id} className="flex items-center space-x-3">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    article.publishStatus === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.publishStatus}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Job Openings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {careers.filter(c => c.status === 'active').slice(0, 5).map((career) => (
                <div key={career.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{career.jobTitle}</p>
                    <p className="text-xs text-gray-500">{career.location} • {career.type}</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    {applications.filter(a => a.careerId === career.id).length} applicants
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

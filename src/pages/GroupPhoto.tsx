
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Camera, Download, Share2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const groupPhotos = [
  {
    id: '1',
    title: 'Complete Staff Assembly 2024',
    description: 'Our entire staff family gathered for the annual group photograph',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop',
    date: 'March 2024',
    event: 'Annual Staff Meeting'
  },
  {
    id: '2',
    title: 'Academic Excellence Awards',
    description: 'Celebrating our teachers recognition at the district level',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=800&fit=crop',
    date: 'February 2024',
    event: 'Award Ceremony'
  },
  {
    id: '3',
    title: 'Sports Day Celebration',
    description: 'Staff and students together during the annual sports day',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop',
    date: 'January 2024',
    event: 'Sports Day'
  },
  {
    id: '4',
    title: 'Cultural Festival',
    description: 'Our diverse staff celebrating cultural heritage and traditions',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1200&h=800&fit=crop',
    date: 'December 2023',
    event: 'Cultural Festival'
  }
];

const GroupPhoto = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof groupPhotos[0] | null>(null);

  const handleDownload = (imageUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title}.jpg`;
    link.click();
  };

  const handleShare = async (photo: typeof groupPhotos[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Camera className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Staff Group Photos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Capturing moments of unity, celebration, and achievements of our dedicated staff members throughout the year.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {groupPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group bg-white/15 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/25 hover:bg-white/25 transition-all duration-500 hover:scale-105 animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedPhoto(photo)}
                      className="h-10 w-10 p-0 bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white border border-white/30"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(photo.image, photo.title)}
                      className="h-10 w-10 p-0 bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white border border-white/30"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShare(photo)}
                      className="h-10 w-10 p-0 bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white border border-white/30"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {photo.event}
                    </span>
                    <span className="text-sm text-gray-500">{photo.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {photo.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Statistics */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white animate-scale-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Photo Gallery Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">150+</div>
                  <div className="text-purple-100">Total Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">25</div>
                  <div className="text-purple-100">Events Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-purple-100">Staff Participation</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">5K+</div>
                  <div className="text-purple-100">Downloads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
            <Button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 p-0 bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white border border-white/30"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  {selectedPhoto.event}
                </span>
                <span className="text-sm text-gray-300">{selectedPhoto.date}</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h3>
              <p className="text-gray-300 leading-relaxed">{selectedPhoto.description}</p>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => handleDownload(selectedPhoto.image, selectedPhoto.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => handleShare(selectedPhoto)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPhoto;

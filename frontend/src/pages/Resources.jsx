import React from "react";
import { useState, useEffect, useMemo } from "react";
import { ResourceCard, Search, FilterPosts} from "../components";
import { BACKEND_URL } from "../config/env";

const Resources = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const apiUrl = BACKEND_URL ? `${BACKEND_URL}/api/posts/` : '/api/posts/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Cannot load post list');
        }
        const data = await response.json();
        setAllPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (type) => {
    // Nếu click cùng type thì bỏ chọn, ngược lại chọn type mới
    setSelectedType(type === selectedType ? null : type);
  };

  const filteredPosts = useMemo(() => {
    const hasSearch = searchTerm.trim().length > 0;
    
    // If no filters and no search, return all posts
    if (!hasSearch && !selectedType) {
      return allPosts;
    }

    let result = allPosts;

    // Apply search filter (search in title, description, and content)
    if (hasSearch) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((post) =>
        post.title?.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower) ||
        post.content?.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (selectedType) {
      result = result.filter((post) => post.type === selectedType);
    }

    return result;
  }, [allPosts, searchTerm, selectedType]);



  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white py-12 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Knowledge Hub: Best Practices for Clean Air
          </h1>
          <p className="text-green-700">
            A central repository for best practices, case studies, research, and
            resources.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <Search items={allPosts} onSearchChange={handleSearchChange} placeholder="Search for a post..."/>

          <FilterPosts selectedType={selectedType} onTypeChange={handleTypeChange} filteredPosts={filteredPosts} />
        </div>

        {/* Grid Content */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-gray-600 text-lg">Loading posts...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post) => {
                  // Map post type to display label and color
                  const getTypeDisplay = (type) => {
                    const typeMap = {
                      'case_study': { label: 'Case Study', color: 'bg-green-100 text-green-800' },
                      'best_practice': { label: 'Best Practice', color: 'bg-blue-100 text-blue-800' },
                      'research': { label: 'Research', color: 'bg-purple-100 text-purple-800' },
                      'news': { label: 'News', color: 'bg-orange-100 text-orange-800' },
                      'guide': { label: 'Guide', color: 'bg-indigo-100 text-indigo-800' },
                      'other': { label: 'Other', color: 'bg-gray-100 text-gray-800' },
                    };
                    return typeMap[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
                  };

                  const typeDisplay = getTypeDisplay(post.type);
                  const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });

                  return (
          <ResourceCard
                      key={post.id}
                      id={post.id}
                      type={typeDisplay.label}
                      tagColor={typeDisplay.color}
                      title={post.title}
                      desc={post.description}
                      author={`School ID: ${post.school_id}`}
                      date={publishedDate}
                      image={post.image}
                      onClick={(postId) => {
                        // TODO: Navigate to post detail page
                        console.log('Post clicked:', postId);
                      }}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No posts found matching your filters.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;

import { Filter as FilterIcon } from "lucide-react";

// Post types available for filtering
const postTypes = [
  { 
    value: "case_study", 
    label: "Case Study", 
    color: "bg-green-100 text-green-800 border-green-300",
    hoverColor: "hover:bg-green-200"
  },
  { 
    value: "best_practice", 
    label: "Best Practice", 
    color: "bg-blue-100 text-blue-800 border-blue-300",
    hoverColor: "hover:bg-blue-200"
  },
  { 
    value: "research", 
    label: "Research", 
    color: "bg-purple-100 text-purple-800 border-purple-300",
    hoverColor: "hover:bg-purple-200"
  },
  { 
    value: "news", 
    label: "News", 
    color: "bg-orange-100 text-orange-800 border-orange-300",
    hoverColor: "hover:bg-orange-200"
  },
  { 
    value: "guide", 
    label: "Guide", 
    color: "bg-indigo-100 text-indigo-800 border-indigo-300",
    hoverColor: "hover:bg-indigo-200"
  },
  { 
    value: "other", 
    label: "Other", 
    color: "bg-gray-100 text-gray-800 border-gray-300",
    hoverColor: "hover:bg-gray-200"
  },
];

const FilterPosts = ({ selectedType, onTypeChange, filteredPosts }) => {
  const handleTypeSelect = (typeValue) => {
    // Nếu click cùng type thì bỏ chọn, ngược lại chọn type mới
    onTypeChange(typeValue === selectedType ? null : typeValue);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FilterIcon className="w-4 h-4 text-gray-600" />
        <h3 className="font-bold text-sm text-gray-900">Filter by Type</h3>
      </div>
      
      <div className="space-y-2">
        {postTypes.map((type) => {
          const isSelected = selectedType === type.value;
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => handleTypeSelect(type.value)}
              className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                isSelected
                  ? `${type.color} border-current shadow-sm`
                  : `bg-white text-gray-700 border-gray-200 ${type.hoverColor}`
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>
      
      {/* Clear filter button */}
      {selectedType && (
        <button
          type="button"
          onClick={() => onTypeChange(null)}
          className="w-full mt-3 px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filter
        </button>
      )}

      {/* Show filtered results count */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 font-medium">Results</span>
          <span className="text-xs text-green-600 font-bold">
            {filteredPosts ? filteredPosts.length : 0} posts
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterPosts;


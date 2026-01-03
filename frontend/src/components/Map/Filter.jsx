import { Filter as FilterIcon } from "lucide-react";

const criteriaList = [
  { label: "Proactive Pollution Responses", scoreKey: "score_1" },
  { label: "Adapted Facilities", scoreKey: "score_2" },
  { label: "Air Quality Monitoring", scoreKey: "score_3" },
  { label: "Respiratory Health Check-ups", scoreKey: "score_4" },
  { label: "Mask Use Instructions", scoreKey: "score_5" },
];

const levels = [
  { value: "bad", label: "Bad", color: "bg-red-500" },
  { value: "moyen", label: "Moyen", color: "bg-yellow-500" },
  { value: "good", label: "Good", color: "bg-green-400" },
  { value: "excellent", label: "Excellent", color: "bg-green-600" },
];

const Filter = ({ filters, onFilterChange, filteredSchools, onSchoolClick }) => {
    return (
        <aside className="w-80 bg-white shadow-xl z-10 absolute top-4 left-4 bottom-4 rounded-xl overflow-y-auto border border-gray-200 hidden md:block">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 text-teal-900">
          <FilterIcon className="w-5 h-5" />
              <h2 className="font-bold text-lg">Filter Schools</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="space-y-4">
                  {criteriaList.map((criteria, index) => (
                    <div key={index}>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        {criteria.label}
                      </label>
                      <div className="flex gap-1.5">
                        {levels.map((level) => {
                          const isChecked = filters[criteria.scoreKey]?.includes(level.value) || false;
                          return (
                            <button
                              key={level.value}
                              type="button"
                              onClick={() => onFilterChange(criteria.scoreKey, level.value)}
                              className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border-2 transition-all flex-1 ${
                                isChecked
                                  ? `${level.color} text-white border-transparent shadow-sm`
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              <span className="text-xs font-medium whitespace-nowrap">{level.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900">Filter Results</h3>
              <span className="text-xs text-green-600 font-bold">
            {filteredSchools ? filteredSchools.length : 0} schools found
              </span>
            </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredSchools && Array.isArray(filteredSchools) && filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <div
                key={school.id}
                onClick={() => onSchoolClick?.(school)}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="font-bold text-gray-900 text-sm">{school.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {school.address || school.district}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">
              No schools match the selected criteria
                </div>
          )}
            </div>
          </div>
        </aside>
    );
};

export default Filter;
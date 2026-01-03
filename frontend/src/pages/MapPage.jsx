import React, { useState, useEffect, useMemo } from "react";
import { SchoolMap } from "../components";
import Search from "../components/Map/Search";
import Filter from "../components/Map/Filter";
import { BACKEND_URL } from "../config/env";

const criteriaList = [
  { label: "Proactive Pollution Responses", scoreKey: "score_1" },
  { label: "Adapted Facilities", scoreKey: "score_2" },
  { label: "Air Quality Monitoring", scoreKey: "score_3" },
  { label: "Respiratory Health Check-ups", scoreKey: "score_4" },
  { label: "Mask Use Instructions", scoreKey: "score_5" },
];

const getScoreLevel = (score) => {
  if (score <40) return "bad";
  if (score <60) return "moyen";
  if (score <80) return "good";
  return "excellent";
};

const MapPage = () => {
  const [allSchools, setAllSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/schools`);
        if (!response.ok) {
          throw new Error('Cannot load school list');
        }
        const data = await response.json();
        setAllSchools(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (scoreKey, level) => {
    setFilters((prev) => {
      if (prev[scoreKey] === level) {
        return {
          ...prev,
          [scoreKey]: undefined,
        };
      }
      return {
        ...prev,
        [scoreKey]:level,
      };
    });
  };

  const filteredSchools = useMemo(() => {
    const hasSearch = searchTerm.trim().length > 0;
    const hasFilters = Object.values(filters).some((levels) => levels && levels.length > 0);
    
    // If no filters and no search, return null to show all schools
    if (!hasSearch && !hasFilters) {
      return null;
    }

    let result = allSchools;

    // Apply search filter
    if (hasSearch) {
      result = result.filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    }

    // Apply criteria filters
    criteriaList.forEach((criteria) => {
      const selectedLevel = filters[criteria.scoreKey];
      if (selectedLevel && selectedLevel.length > 0) {
        result = result.filter((school) => {
          const score = school[criteria.scoreKey];
          if (score === null || score === undefined) return false;
          const schoolLevel = getScoreLevel(score);
          return selectedLevel === schoolLevel;
        });
      }
    });

    return result;
  }, [allSchools, searchTerm, filters]);

  const handleSchoolClick = (school) => {
    // Optional: Handle school click (e.g., center map on school)
    console.log("School clicked:", school);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex relative overflow-hidden">
        <Filter
          filters={filters}
          onFilterChange={handleFilterChange}
          filteredSchools={filteredSchools}
          onSchoolClick={handleSchoolClick}
        />

        <div className="flex-1 bg-gray-200 relative md:ml-[22rem] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <SchoolMap filteredSchools={filteredSchools} />
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-96 md:translate-x-0 w-full max-w-md px-4 z-10">
            <Search schools={allSchools} onSearchChange={handleSearchChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

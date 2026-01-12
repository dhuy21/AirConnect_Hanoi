import React, { useState } from "react";
import { ArrowRight, Calendar, User } from "lucide-react";
import styles from "./ResourceCard.module.css";

const ResourceCard = ({ 
  id,
  type, 
  title, 
  desc, 
  author, 
  date, 
  image, 
  tagColor,
  onClick 
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Default image if image fails to load or is missing
  const defaultImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80";
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className={`${styles.card} bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer group`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Image Container */}
      <div className={`${styles.imageContainer} h-48 overflow-hidden relative bg-gradient-to-br from-teal-50 to-green-50`}>
        <img
          src={imageError || !image ? defaultImage : image}
          alt={title}
          className={`${styles.image} w-full h-full object-cover`}
          onError={handleImageError}
          loading="lazy"
        />
        {/* Overlay gradient on hover */}
        <div className={`${styles.overlay} absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Type Badge */}
        <span
          className={`${styles.badge} absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${tagColor} shadow-sm border border-white/20`}
        >
          {type}
        </span>

        {/* Read More Indicator */}
        <div className={`${styles.readMore} absolute bottom-4 right-4 flex items-center gap-2 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
          Read More
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className={`${styles.title} font-bold text-lg text-teal-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors duration-200`}>
          {title}
        </h3>
        <p className={`${styles.description} text-sm text-gray-500 mb-4 line-clamp-3 flex-grow`}>
          {desc || "No description available."}
        </p>
        
        {/* Footer */}
        <div className={`${styles.footer} flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100`}>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
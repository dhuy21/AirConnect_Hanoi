"""
Simple script to fetch high schools (THPT) in Hanoi from OpenStreetMap
Run: python getschool.py
"""
import requests
import json

# Hanoi bounding box (approximate)
HANOI_BBOX = "20.95,105.70,21.10,105.95"  # south,west,north,east

# Overpass API query to get HIGH SCHOOLS in Hanoi
OVERPASS_URL = "http://overpass-api.de/api/interpreter"
QUERY = f"""
[out:json][timeout:60];
(
  node["amenity"="school"]["isced:level"="3"]({HANOI_BBOX});
  way["amenity"="school"]["isced:level"="3"]({HANOI_BBOX});
  node["amenity"="school"]["name"~"THPT|Trung học phổ thông|High School",i]({HANOI_BBOX});
  way["amenity"="school"]["name"~"THPT|Trung học phổ thông|High School",i]({HANOI_BBOX});
);
out center 100;
"""

def fetch_schools():
    """Fetch HIGH SCHOOLS from OpenStreetMap"""
    print("Fetching HIGH SCHOOLS from OpenStreetMap...")
    
    response = requests.post(OVERPASS_URL, data={"data": QUERY})
    data = response.json()
    
    schools = []
    seen_names = set()  # Avoid duplicates
    
    for element in data['elements']:
        # Get coordinates
        if 'lat' in element and 'lon' in element:
            lat, lon = element['lat'], element['lon']
        elif 'center' in element:
            lat, lon = element['center']['lat'], element['center']['lon']
        else:
            continue
        
        tags = element.get('tags', {})
        name = tags.get('name', '').strip()
        
        # Skip if no name or duplicate
        if not name or name in seen_names:
            continue

        
        # Only accept high schools (THPT)
        if not any(keyword in name.upper() for keyword in ['THPT', 'HIGH SCHOOL', 'TRUNG HỌC PHỔ THÔNG']):
            continue
        
        seen_names.add(name)
        
        # Build address from available OSM tags
        address_parts = []
        if tags.get('addr:housenumber'):
            address_parts.append(tags.get('addr:housenumber'))
        if tags.get('addr:street'):
            address_parts.append(tags.get('addr:street'))
        if tags.get('addr:suburb'):
            address_parts.append(tags.get('addr:suburb'))
        
        address = ', '.join(address_parts) if address_parts else tags.get('addr:full', 'N/A')
        
        # Get school details
        school = {
            "name": name,
            "address": address,
            "district": tags.get('addr:district', 'Unknown'),
            "latitude": lat,
            "longitude": lon,
            "school_type": "High School",
            "phone": tags.get('phone', None)
        }
        schools.append(school)
        
        # Limit to 100
        if len(schools) >= 100:
            break
    
    print(f"Found {len(schools)} high schools")
    return schools



if __name__ == "__main__":
    schools = fetch_schools()
    
    # Save to JSON file
    with open('schools_data.json', 'w', encoding='utf-8') as f:
        json.dump(schools, f, indent=2, ensure_ascii=False)
    print(f"\nSaved {len(schools)} high schools to schools_data.json")


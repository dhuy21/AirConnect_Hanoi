airconnect-hanoi/
│
├── frontend/                           # React Frontend
│   ├── public/                         # Static files
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── assets/                     # Images, icons, fonts
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── components/                 # Reusable UI components
│   │   │   ├── common/                 # Shared components
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Input/
│   │   │   │   ├── Loading/
│   │   │   │   ├── Modal/
│   │   │   │   └── Navbar/
│   │   │   │
│   │   │   ├── Map/                    # Map-specific components
│   │   │   │   ├── HanoiSchoolMap.jsx
│   │   │   │   ├── SchoolMarker.jsx
│   │   │   │   ├── SchoolPopup.jsx
│   │   │   │   ├── MapControls.jsx
│   │   │   │   ├── SearchBox.jsx
│   │   │   │   └── MapLegend.jsx
│   │   │   │
│   │   │   ├── AQI/                    # AQI components
│   │   │   │   ├── AQIBadge.jsx
│   │   │   │   ├── AQIChart.jsx
│   │   │   │   └── AQIAlert.jsx
│   │   │   │
│   │   │   └── Knowledge/              # Knowledge base components
│   │   │       ├── ArticleList.jsx
│   │   │       ├── ArticleCard.jsx
│   │   │       └── ArticleDetail.jsx
│   │   │
│   │   ├── pages/                      # Page components (Routes)
│   │   │   ├── HomePage.jsx
│   │   │   ├── MapPage.jsx
│   │   │   ├── KnowledgePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── layouts/                    # Layout components
│   │   │   ├── MainLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── services/                   # API calls (Communication layer)
│   │   │   ├── api.js                  # Axios config
│   │   │   ├── schoolService.js        # School API calls
│   │   │   ├── aqiService.js           # AQI API calls
│   │   │   ├── authService.js          # Authentication
│   │   │   └── knowledgeService.js     # Knowledge base API
│   │   │
│   │   ├── hooks/                      # Custom React hooks
│   │   │   ├── useSchools.js
│   │   │   ├── useAQI.js
│   │   │   ├── useAuth.js
│   │   │   └── useDebounce.js
│   │   │
│   │   ├── contexts/                   # React Context (State management)
│   │   │   ├── AuthContext.jsx
│   │   │   ├── MapContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── utils/                      # Helper functions
│   │   │   ├── mapHelpers.js
│   │   │   ├── dateHelpers.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   │
│   │   ├── config/                     # Configuration
│   │   │   └── map.config.js
│   │   │
│   │   ├── routes/                     # Routing config
│   │   │   └── index.jsx
│   │   │
│   │   ├── styles/                     # Global styles
│   │   │   ├── globals.css
│   │   │   └── variables.css
│   │   │
│   │   ├── App.jsx                     # Main App component
│   │   └── main.jsx                    # Entry point
│   │
│   ├── .env                            # Environment variables
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
│
├── backend/                            # Python Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI entry point
│   │   │
│   │   ├── core/                       # Core configuration
│   │   │   ├── __init__.py
│   │   │   ├── config.py               # Settings (DB, API keys, etc)
│   │   │   ├── security.py             # Auth, JWT, password hashing
│   │   │   └── dependencies.py         # Dependency injection
│   │   │
│   │   ├── api/                        # API endpoints (Controller Layer)
│   │   │   ├── __init__.py
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── router.py           # Main API router
│   │   │       └── endpoints/
│   │   │           ├── __init__.py
│   │   │           ├── schools.py      # GET /api/v1/schools
│   │   │           ├── aqi.py          # GET /api/v1/aqi
│   │   │           ├── auth.py         # POST /api/v1/auth/login
│   │   │           └── knowledge.py    # Knowledge base endpoints
│   │   │
│   │   ├── services/                   # Business Logic Layer
│   │   │   ├── __init__.py
│   │   │   ├── school_service.py       # School business logic
│   │   │   ├── aqi_service.py          # AQI processing logic
│   │   │   ├── auth_service.py         # Authentication logic
│   │   │   └── external_api/           # External API integrations
│   │   │       ├── __init__.py
│   │   │       ├── aqicn_client.py     # AQICN API client
│   │   │       └── nominatim_client.py # OSM Geocoding
│   │   │
│   │   ├── crud/                       # Data Access Layer (CRUD operations)
│   │   │   ├── __init__.py
│   │   │   ├── base.py                 # Base CRUD class
│   │   │   ├── school.py               # School CRUD
│   │   │   ├── aqi_data.py             # AQI data CRUD
│   │   │   └── user.py                 # User CRUD
│   │   │
│   │   ├── models/                     # Database Models (ORM)
│   │   │   ├── __init__.py
│   │   │   ├── school.py               # School model
│   │   │   ├── aqi_data.py             # AQI data model
│   │   │   ├── user.py                 # User model
│   │   │   └── knowledge_base.py       # Knowledge article model
│   │   │
│   │   ├── schemas/                    # Pydantic Schemas (Data validation)
│   │   │   ├── __init__.py
│   │   │   ├── school.py               # Request/Response schemas
│   │   │   ├── aqi.py
│   │   │   ├── user.py
│   │   │   └── common.py               # Shared schemas
│   │   │
│   │   ├── db/                         # Database
│   │   │   ├── __init__.py
│   │   │   ├── base.py                 # Base model class
│   │   │   ├── session.py              # DB session
│   │   │   └── init_db.py              # Initialize DB
│   │   │
│   │   ├── utils/                      # Utilities
│   │   │   ├── __init__.py
│   │   │   ├── logger.py
│   │   │   └── validators.py
│   │   │
│   │   └── tasks/                      # Background tasks
│   │       ├── __init__.py
│   │       ├── scheduler.py            # APScheduler
│   │       └── aqi_updater.py          # Periodic AQI updates
│   │
│   ├── alembic/                        # Database migrations
│   │   ├── versions/
│   │   └── env.py
│   │
│   ├── tests/                          # Tests
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   └── test_schools.py
│   │
│   ├── scripts/                        # Utility scripts
│   │   ├── seed_data.py
│   │   └── fetch_schools_osm.py
│   │
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   ├── alembic.ini
│   └── README.md
│
│
├── docs/                               # Documentation
│   ├── API.md
│   ├── SETUP.md
│   └── ARCHITECTURE.md
│
├── .gitignore
└── README.md
# 🌍 AirConnect Hanoi - Backend API

Backend API pour le projet **AirConnect Hanoi** - Une plateforme de visualisation et d'analyse de la qualité de l'air autour des écoles de Hanoi.

**Stack technique**: FastAPI + PostgreSQL + PostGIS

---

## 📋 Table des matières

- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)

---

## 🚀 Technologies utilisées

| Technologie | Version | Usage |
|------------|---------|-------|
| **Python** | 3.12+ | Langage principal |
| **FastAPI** | 0.104.1 | Framework web moderne et rapide |
| **PostgreSQL** | 16+ | Base de données relationnelle |
| **PostGIS** | 3.4+ | Extension spatiale pour PostgreSQL |
| **SQLAlchemy** | 2.0.23 | ORM pour Python |
| **GeoAlchemy2** | 0.14.2 | Extension SQLAlchemy pour PostGIS |
| **Uvicorn** | 0.24.0 | Serveur ASGI |


---

## 📦 Installation

### Prérequis

- Python 3.12+
- PostgreSQL 16+

### 1. Installation de PostgreSQL + PostGIS

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql-16 postgresql-contrib
sudo apt install postgresql-16-postgis-3

# Démarrage du service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Création de la base de données

```bash
# Connexion à PostgreSQL
sudo -u postgres psql

# Dans le console PostgreSQL:
CREATE DATABASE airconnect_hanoi;
CREATE USER airconnect_user WITH PASSWORD 'airconnecthn1209';
GRANT ALL PRIVILEGES ON DATABASE airconnect_hanoi TO airconnect_user;
\q
```

### 3. Activation de PostGIS

```bash
# Activer l'extension PostGIS dans la database
sudo -u postgres psql airconnect_hanoi -c "CREATE EXTENSION IF NOT EXISTS postgis;"

# Vérifier l'installation
sudo -u postgres psql airconnect_hanoi -c "SELECT PostGIS_version();"
```


### 4. Configuration de l'environnement Python

```bash
# Création de l'environnement virtuel
python3 -m venv venv

# Activation
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Installation des dépendances
pip install -r requirements.txt
```

---

## ⚙️ Configuration

### Fichier `.env`

Créez un fichier `.env` à la **racine du projet** (même niveau que `backend/` et `frontend/`) :

```env
DATABASE_URL=postgresql://airconnect_user:airconnecthn1209@localhost:5432/airconnect_hanoi
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

> ⚠️ **Important**: Ne commitez JAMAIS le fichier `.env` dans Git (déjà dans `.gitignore`)

---

## 🎯 Utilisation


### 1. Initialisation de la base de données

```bash
cd backend/app/db
python init_db.py

Il va créer la base de données et les tables avec PostGIS.
```


### 2. Seed the data

```bash
cd backend/scripts
python seed_data.py
```
> ⚠️ **Important**:  seed_data.py is only executed once for adding the records for the tables: admin, school, student, air_quality, post, submission, review, solution, help, view.


### 3. Démarrage du serveur

```bash
cd backend/app
uvicorn main:app --reload --port 8000
```

Le serveur sera accessible sur: **http://localhost:8000**

---


## Documentation interactive

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)


**Paramètres**:
- `latitude` (float, required): Latitude du point de recherche
- `longitude` (float, required): Longitude du point de recherche
- `radius` (float, optional): Rayon de recherche en mètres (défaut: 2000m = 2km)

> 💡 L'index spatial GIST est **essentiel** pour une application en production!




### 🔍 Vérifier les tables dans PostgreSQL

Pour vous connecter à PostgreSQL et vérifier si les tables existent :

####  Connexion avec l'utilisateur `airconnect_user`

```bash
# Se connecter avec l'utilisateur de l'application
psql -U airconnect_user -d airconnect_hanoi -h localhost
# Mot de passe: airconnecthn1209
```

#### Commandes SQL utiles une fois connecté :

```sql
-- Lister toutes les tables de la base de données
\dt

-- Lister toutes les tables avec plus de détails
\dt+

-- Vérifier si une table spécifique existe
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'schools'
);

-- Lister toutes les tables avec leur schéma
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Voir la structure d'une table
\d schools

-- Voir toutes les colonnes d'une table
\d+ schools

-- Compter les enregistrements dans une table
SELECT COUNT(*) FROM schools;

-- Voir quelques enregistrements
SELECT * FROM schools LIMIT 5;

-- Vérifier si PostGIS est activé
SELECT PostGIS_version();

-- Quitter PostgreSQL
\q
```

---

## 📚 Ressources

- [Documentation FastAPI](https://fastapi.tiangolo.com/)
- [Documentation PostGIS](https://postgis.net/documentation/)
- [GeoAlchemy2 Documentation](https://geoalchemy-2.readthedocs.io/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

---


## 👥 Auteurs

Projet AirConnect Hanoi - 2025

---

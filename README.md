# Player Team Manager

A React-based application for managing NBA players and teams with authentication, infinite scroll, and persistent state management.

## Features

- **Authentication**: Redux-based login/logout with persistent state
- **Infinite Scroll**: Load NBA players from balldontlie.io API
- **Team Management**: Create, update, and delete teams with modal forms
- **Player Assignment**: Add/remove players to teams (one team per player)
- **Form Validation**: Team name uniqueness and required field validation
- **Persistent State**: All data persists across page reloads using redux-persist
- **Performance Optimized**: Efficient infinite scroll with IntersectionObserver

## Tech Stack

- React 18 with TypeScript
- Redux Toolkit for state management
- Redux Persist for localStorage persistence
- Tailwind CSS for styling
- Vite for build tooling

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd player-team-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_BALLDONTLIE_API_KEY=your_api_key_here
```

**Get your free API key from:** https://balldontlie.io/

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Add environment variable: `VITE_BALLDONTLIE_API_KEY`
   - Deploy

### Deploy to Netlify

1. **Build the project:**

```bash
npm run build
```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Add environment variable: `VITE_BALLDONTLIE_API_KEY`

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard with tabs
│   ├── Login.tsx        # Authentication form
│   ├── PlayersList.tsx  # Infinite scroll player list
│   ├── TeamsList.tsx    # Team management
│   ├── TeamModal.tsx    # Team CRUD modal
│   └── PrivateRoute.tsx # Protected route wrapper
├── slice/              # Redux slices
│   ├── authSlice.ts    # Authentication state
│   ├── playersSlice.ts # Players data and pagination
│   └── teamsSlice.ts   # Teams and player assignments
├── services/           # API services
│   └── api.ts         # balldontlie.io API integration
├── store/             # Redux store configuration
│   └── store.ts       # Store setup with persistence
└── types/             # TypeScript type definitions
    └── store.ts       # Root state types
```

## Requirements Met

✅ **React.js** - Built with React 18 and TypeScript  
✅ **Authentication** - Redux-based login/logout with persistent state  
✅ **Infinite Scroll** - Efficient player loading with IntersectionObserver  
✅ **API Integration** - balldontlie.io API with 10 players per request  
✅ **Team CRUD** - Create, update, delete teams via modal  
✅ **Form Fields** - Name, player count, region, country  
✅ **Validation** - Team name uniqueness and required fields  
✅ **Player Management** - Add/remove players (one team per player)  
✅ **Persistent State** - Redux-persist for localStorage  
✅ **Performance** - Optimized scrolling and state management

## API Usage

The application uses the balldontlie.io NBA API:

- **Endpoint**: `https://api.balldontlie.io/v1/players`
- **Pagination**: Cursor-based for efficient infinite scroll
- **Rate Limit**: 5 requests/min (free tier)
- **Authentication**: API key required

## Performance Optimizations

- **Infinite Scroll**: Uses IntersectionObserver for efficient loading
- **State Management**: Redux Toolkit for optimized updates
- **Persistence**: Redux-persist for localStorage without performance impact
- **Component Optimization**: Proper React patterns for re-renders
- **API Caching**: Efficient pagination with cursor-based loading

## Testing the Application

1. **Login**: Enter any username to authenticate
2. **View Players**: Scroll through NBA players with infinite loading
3. **Create Team**: Use the "Create Team" button to add a new team
4. **Add Players**: Select players from the list to add to teams
5. **Manage Teams**: Edit or delete teams as needed
6. **Persistence**: Refresh the page to see data persistence

## Contact

For questions about this implementation, contact: +959263655003

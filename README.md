# Player Team Manager

A comprehensive React application for managing basketball players and teams with authentication, infinite scroll, and CRUD operations.

## Features

### ✅ Authentication

- Username-based login system
- Redux state management with persistence
- Protected routes
- Logout functionality

### ✅ Players Management

- Infinite scroll loading from [balldontlie.io API](https://www.balldontlie.io/api/v1/players)
- 10 players per API call
- Add/remove players to/from teams
- Players can only be in one team at a time

### ✅ Teams Management

- Create, Read, Update, Delete (CRUD) operations
- Modal-based forms with validation
- Team fields: name, player count, region, country
- Unique team name validation
- Error handling and form validation

### ✅ State Management

- Redux Toolkit for global state
- Redux Persist for data persistence
- Teams and authentication data persist across page reloads
- Optimized performance with proper state updates

### ✅ UI/UX

- Responsive design for desktop and mobile
- Clean, modern interface with Tailwind CSS
- Tabbed interface for better organization
- Loading states and error handling
- Confirmation dialogs for destructive actions

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **API**: balldontlie.io REST API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd player-team-manager
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard with tabs
│   ├── Login.tsx       # Authentication form
│   ├── PlayersList.tsx # Players list with infinite scroll
│   ├── TeamsList.tsx   # Teams management
│   ├── TeamModal.tsx   # Team creation/editing modal
│   └── PrivateRoute.tsx # Route protection component
├── slice/              # Redux slices
│   ├── authSlice.ts    # Authentication state
│   ├── teamsSlice.ts   # Teams state
│   └── playersSlice.ts # Players state
├── store/              # Redux store configuration
│   └── store.ts        # Store setup with persistence
├── services/           # API services
│   └── api.ts          # API calls to balldontlie.io
├── types/              # TypeScript type definitions
│   └── store.ts        # Redux store types
└── App.tsx             # Main application component
```

## API Integration

The application integrates with the [balldontlie.io API](https://www.balldontlie.io/api/v1/players) to fetch basketball player data:

- **Endpoint**: `https://www.balldontlie.io/api/v1/players`
- **Pagination**: 10 players per page
- **Infinite Scroll**: Automatically loads more players as user scrolls
- **Error Handling**: Graceful error handling with retry functionality

## State Persistence

The application uses Redux Persist to maintain state across browser sessions:

- **Persisted Data**: Authentication state and teams data
- **Non-Persisted Data**: Players data (fetched fresh from API)
- **Storage**: Local Storage

## Performance Optimizations

- **Infinite Scroll**: Efficient loading with Intersection Observer
- **Memoization**: Optimized re-renders with proper React patterns
- **Lazy Loading**: Components loaded as needed
- **State Updates**: Efficient Redux state updates
- **API Caching**: Proper API response handling

## Deployment

The application can be deployed to any static hosting service:

### Vercel

```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy the dist folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Deploy the dist folder to GitHub Pages
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact: thihaaung@codigo.co

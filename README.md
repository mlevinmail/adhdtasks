# ADHD Task Manager

A simple, focused task management application built with React and TypeScript, specifically designed for people with ADHD.

## Features

- **Clean, minimal interface** - Reduces cognitive load and visual overwhelm
- **Priority-based task organization** - Color-coded system for easy visual scanning
- **Quick task entry** - Add tasks with Enter key for speed
- **Clear visual feedback** - Immediate responses to all actions
- **Responsive design** - Works on desktop and mobile devices
- **Accessibility features** - ARIA labels and keyboard navigation

## ADHD-Friendly Design Principles

- Clear visual hierarchy with consistent spacing
- Color coding for priority levels (red=high, yellow=medium, green=low)
- Large, easy-to-click buttons and checkboxes
- Minimal cognitive load with simple, focused interface
- Immediate visual feedback for all interactions

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd adhdtasks
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Contributing

This project follows ADHD-friendly development practices:
- Keep components small and focused
- Use descriptive naming
- Maintain clear visual hierarchy
- Prioritize usability over complexity

## License

MIT License

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your app will be available at `https://yourusername.github.io/adhdtasks/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

### Setting up GitHub Repository

1. Create a new repository on GitHub named `adhdtasks`
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/yourusername/adhdtasks.git
   ```
3. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Set Source to "GitHub Actions"
4. Commit and push your code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

# Spherical Camera Visualization

An interactive 3D visualization project built with Next.js and React Three Fiber, featuring a dynamic spherical camera system with 360-degree viewing capabilities and Gaussian splatting effects.

## Features

- **Dynamic Spherical Camera**: Smooth camera movement in a spherical path with configurable parameters
- **Interactive Controls**: Real-time adjustment of Field of View (30° - 360°) and Zoom (1x - 10x)
- **3D Environment**: Immersive scene with 3D Gaussian splatting support

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/artem-konevskikh/spherical-cam-splats.git
cd spherical-cam-splats
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Details

### Camera System

The spherical camera implementation (`SphericalCamera.tsx`) features:

- Configurable movement parameters (speed, amplitude, radius)
- Dynamic FOV and zoom controls
- Smooth path interpolation
- Look-at point animation

### Key Components

- `Experience.tsx`: Main 3D scene container with UI controls
- `SphericalCamera.tsx`: Camera movement and control logic
- `Environment.tsx`: 3D scene environment setup
- `Effects.tsx`: Post-processing effects

## Development

The project uses:

- TypeScript for type safety
- ESLint for code linting
- Tailwind CSS for styling
- React Three Fiber for 3D rendering
- Three.js for 3D graphics

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com). For deployment instructions, visit the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
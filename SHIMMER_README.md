# 🎬 MovieNest Shimmer UI System

A powerful, comprehensive shimmer loading system built specifically for the MovieNest application. This system provides beautiful loading animations that enhance user experience during data fetching and API calls.

## ✨ Features

- **Multiple Shimmer Variants**: Default, Pulse, Wave, Glow effects
- **Component-Specific Shimmers**: Movie cards, lists, headers, search bars, etc.
- **Custom Hooks**: Built-in loading state management
- **Responsive Design**: Works seamlessly across all device sizes
- **Performance Optimized**: CSS-based animations with minimal JavaScript overhead
- **Easy Integration**: Simple API for quick implementation

## 🚀 Quick Start

### Basic Usage

```jsx
import { Shimmer } from './components/Shimmer';

// Basic shimmer
<Shimmer height="40px" width="200px" />

// With variants
<Shimmer height="40px" variant="wave" />
<Shimmer height="40px" variant="pulse" />
<Shimmer height="40px" variant="glow" />
```

### Component Shimmers

```jsx
import { 
  MovieCardShimmer, 
  MovieListShimmer, 
  HeaderShimmer 
} from './components/Shimmer';

// Movie card shimmer
<MovieCardShimmer />

// Movie list shimmer
<MovieListShimmer title={true} />

// Header shimmer
<HeaderShimmer />
```

### Shimmer Wrapper

```jsx
import { ShimmerWrapper, TextShimmer } from './components/Shimmer';

<ShimmerWrapper
  isLoading={isLoading}
  shimmerComponent={<TextShimmer lines={3} />}
>
  <div>Your actual content here</div>
</ShimmerWrapper>
```

## 📚 Component Reference

### Base Components

#### `Shimmer`
The base shimmer component with customizable properties.

**Props:**
- `className` (string): Additional CSS classes
- `variant` (string): Shimmer effect variant (`default`, `pulse`, `wave`, `glow`, `light`, `lightPulse`, `lightWave`, `lightGlow`)
- `width` (string): Width of the shimmer element
- `height` (string): Height of the shimmer element
- `borderRadius` (string): Border radius for rounded corners

**Example:**
```jsx
<Shimmer 
  height="40px" 
  width="200px" 
  variant="wave" 
  borderRadius="8px" 
/>
```

#### `ShimmerWrapper`
Wraps content with automatic shimmer loading states.

**Props:**
- `isLoading` (boolean): Whether to show shimmer
- `children` (ReactNode): Content to show when not loading
- `shimmerComponent` (ReactNode): Custom shimmer component
- `delay` (number): Delay before hiding shimmer (ms)
- `className` (string): Additional CSS classes

### Specialized Components

#### `MovieCardShimmer`
Shimmer for movie poster cards.

```jsx
<MovieCardShimmer className="mb-4" />
```

#### `MovieListShimmer`
Shimmer for horizontal movie lists.

**Props:**
- `title` (boolean): Whether to show title shimmer
- `className` (string): Additional CSS classes

```jsx
<MovieListShimmer title={true} />
```

#### `VideoTitleShimmer`
Shimmer for video title and description sections.

```jsx
<VideoTitleShimmer />
```

#### `HeaderShimmer`
Shimmer for application headers.

```jsx
<HeaderShimmer />
```

#### `SearchBarShimmer`
Shimmer for search input fields.

```jsx
<SearchBarShimmer />
```

#### `GPTSuggestionsShimmer`
Shimmer for GPT movie suggestions.

```jsx
<GPTSuggestionsShimmer />
```

#### `LoadingOverlayShimmer`
Full-screen loading overlay shimmer.

```jsx
<LoadingOverlayShimmer />
```

### Utility Components

#### `TextShimmer`
Shimmer for text content with multiple lines.

**Props:**
- `lines` (number): Number of text lines to show
- `className` (string): Additional CSS classes
- `variant` (string): Shimmer variant

```jsx
<TextShimmer lines={3} variant="pulse" />
```

#### `ButtonShimmer`
Shimmer for button elements.

**Props:**
- `width` (string): Button width
- `height` (string): Button height
- `className` (string): Additional CSS classes

```jsx
<ButtonShimmer width="120px" height="40px" />
```

#### `ImageShimmer`
Shimmer for image placeholders.

**Props:**
- `width` (string): Image width
- `height` (string): Image height
- `borderRadius` (string): Border radius
- `className` (string): Additional CSS classes

```jsx
<ImageShimmer height="200px" borderRadius="8px" />
```

#### `CardShimmer`
Complete card shimmer with image, text, and button.

```jsx
<CardShimmer />
```

#### `GridShimmer`
Grid layout shimmer.

**Props:**
- `columns` (number): Number of columns
- `rows` (number): Number of rows
- `className` (string): Additional CSS classes

```jsx
<GridShimmer columns={3} rows={2} />
```

#### `TableShimmer`
Table shimmer for data tables.

**Props:**
- `rows` (number): Number of table rows
- `columns` (number): Number of table columns
- `className` (string): Additional CSS classes

```jsx
<TableShimmer rows={5} columns={4} />
```

#### `MainContainerShimmer`
Full-screen main container shimmer.

```jsx
<MainContainerShimmer />
```

## 🎣 Custom Hooks

### `useShimmer`
Manages shimmer loading states with automatic transitions.

```jsx
import { useShimmer } from './hooks/useShimmer';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const showShimmer = useShimmer(isLoading, 500); // 500ms delay
  
  return showShimmer ? <Shimmer /> : <div>Content</div>;
};
```

### `useApiWithShimmer`
Manages API calls with automatic shimmer states.

```jsx
import { useApiWithShimmer } from './hooks/useShimmer';

const MyComponent = () => {
  const { data, isLoading, error } = useApiWithShimmer(
    () => fetch('/api/movies').then(res => res.json())
  );
  
  return isLoading ? <Shimmer /> : <div>{data}</div>;
};
```

### `useMultipleApiWithShimmer`
Manages multiple API calls simultaneously.

```jsx
import { useMultipleApiWithShimmer } from './hooks/useShimmer';

const MyComponent = () => {
  const { data, loadingStates, errors } = useMultipleApiWithShimmer({
    movies: () => fetch('/api/movies').then(res => res.json()),
    genres: () => fetch('/api/genres').then(res => res.json())
  });
  
  return (
    <div>
      {loadingStates.movies ? <Shimmer /> : <div>{data.movies}</div>}
      {loadingStates.genres ? <Shimmer /> : <div>{data.genres}</div>}
    </div>
  );
};
```

### `usePaginationWithShimmer`
Manages paginated data with shimmer loading.

```jsx
import { usePaginationWithShimmer } from './hooks/useShimmer';

const MyComponent = () => {
  const { data, isLoading, hasMore, loadNextPage } = usePaginationWithShimmer(
    (page) => fetch(`/api/movies?page=${page}`).then(res => res.json())
  );
  
  return (
    <div>
      {data.map(item => <div key={item.id}>{item.title}</div>)}
      {isLoading && <Shimmer />}
      {hasMore && <button onClick={loadNextPage}>Load More</button>}
    </div>
  );
};
```

### `useSearchWithShimmer`
Manages search functionality with debounced shimmer loading.

```jsx
import { useSearchWithShimmer } from './hooks/useShimmer';

const MyComponent = () => {
  const { query, setQuery, isLoading, results } = useSearchWithShimmer(
    (query) => fetch(`/api/search?q=${query}`).then(res => res.json()),
    300 // 300ms debounce
  );
  
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {isLoading && <Shimmer />}
      {results.map(result => <div key={result.id}>{result.title}</div>)}
    </div>
  );
};
```

### `useInfiniteScrollWithShimmer`
Manages infinite scroll with automatic shimmer loading.

```jsx
import { useInfiniteScrollWithShimmer } from './hooks/useShimmer';

const MyComponent = () => {
  const { data, isLoading, hasMore } = useInfiniteScrollWithShimmer(
    (page) => fetch(`/api/movies?page=${page}`).then(res => res.json())
  );
  
  return (
    <div>
      {data.map(item => <div key={item.id}>{item.title}</div>)}
      {isLoading && <Shimmer />}
    </div>
  );
};
```

## 🎨 CSS Classes

The shimmer system includes several CSS classes for custom styling:

### Animation Classes
- `.shimmer` - Basic shimmer animation
- `.shimmer-dark` - Dark theme shimmer
- `.shimmer-pulse` - Pulsing animation
- `.shimmer-wave` - Wave animation
- `.shimmer-glow` - Glowing animation

### Utility Classes
- `.scrollbar-hide` - Hides scrollbars

## 🔧 Customization

### Custom Shimmer Variants

You can create custom shimmer variants by extending the CSS:

```css
.shimmer-custom {
  background: linear-gradient(90deg, #your-color-1 25%, #your-color-2 50%, #your-color-1 75%);
  background-size: 200px 100%;
  animation: shimmer 2s infinite;
}
```

### Custom Animations

Define custom animations in your CSS:

```css
@keyframes custom-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shimmer-custom-animation {
  animation: custom-shimmer 1.5s infinite;
}
```

## 📱 Responsive Design

All shimmer components are fully responsive and work across all device sizes:

- **Mobile**: Optimized for touch interfaces
- **Tablet**: Balanced layouts for medium screens
- **Desktop**: Full-featured layouts for large screens

## ⚡ Performance Tips

1. **Use appropriate shimmer variants** based on content type
2. **Implement delays** to prevent flickering during quick transitions
3. **Optimize animations** with CSS transforms instead of layout properties
4. **Use skeleton screens** for better perceived performance
5. **Lazy load** shimmer components when possible

## 🐛 Troubleshooting

### Common Issues

1. **Shimmer not showing**: Check if `isLoading` state is properly set
2. **Animation stuttering**: Ensure CSS animations are hardware-accelerated
3. **Layout shifts**: Use consistent dimensions for shimmer and actual content
4. **Performance issues**: Reduce animation complexity or frequency

### Debug Mode

Enable debug mode to see shimmer boundaries:

```css
.shimmer {
  border: 1px solid red; /* Debug border */
}
```

## 🎯 Best Practices

1. **Match shimmer to content**: Use appropriate shimmer shapes and sizes
2. **Consistent timing**: Use similar animation durations across components
3. **Progressive loading**: Show partial content as it becomes available
4. **Error handling**: Provide fallbacks when shimmer fails
5. **Accessibility**: Ensure shimmer doesn't interfere with screen readers

## 📄 License

This shimmer system is part of the MovieNest project and follows the same licensing terms.

## 🤝 Contributing

To contribute to the shimmer system:

1. Follow the existing code patterns
2. Add appropriate TypeScript types
3. Include comprehensive documentation
4. Test across different devices and browsers
5. Update this README with new features

---

**Happy Coding! 🎬✨**

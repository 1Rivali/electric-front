# Product Image Reordering Implementation

## Overview

This document describes the implementation of the product image reordering functionality in the frontend React application. The feature allows administrators to drag and drop product images to reorder them, with the new order being saved to the backend API.

## Features Implemented

### 1. **Updated Type Definitions** (`src/types/types.ts`)

- Added `order_position?: number` field to `ProductImage` interface
- Added `ImageOrderItem` interface for API requests
- Added `ReorderImagesRequest` and `ReorderImagesResponse` interfaces

### 2. **API Service** (`src/services/api-service.ts`)

- Added `reorderProductImages()` function that calls the `/api/product-images/reorder` endpoint
- Handles authentication with Bearer token
- Returns properly typed response

### 3. **Custom Hook** (`src/hooks/useImageReorder.ts`)

- `useImageReorder` hook manages the reordering state and logic
- Provides optimistic updates for better UX
- Handles API calls and error management
- Reusable across different components

### 4. **Image Reordering Component** (`src/components/ImageReorderComponent.tsx`)

- Drag-and-drop interface using `@dnd-kit/sortable`
- Visual feedback during drag operations
- Position indicators on each image
- Save/Reset buttons for batch operations
- Delete functionality integrated
- Responsive grid layout

### 5. **Enhanced Edit Product Modal** (`src/components/AdminProductsModals/EditProductModal.tsx`)

- Added tabbed interface separating product details and image management
- Integrated the image reordering component
- Larger modal size to accommodate new functionality
- Maintained existing add/delete image functionality

## Dependencies Added

```json
{
  "@dnd-kit/core": "^latest",
  "@dnd-kit/sortable": "^latest",
  "@dnd-kit/utilities": "^latest"
}
```

## Usage

### For Administrators

1. **Access**: Open any product in the admin panel and click "Edit"
2. **Navigate**: Switch to the "Image Management" tab
3. **Reorder**: Drag images to reorder them (position numbers update in real-time)
4. **Save**: Click "Save Order" to persist changes to the backend
5. **Reset**: Click "Reset" to revert to the original order

### For Developers

#### Using the Hook

```typescript
import useImageReorder from "../hooks/useImageReorder";

const MyComponent = ({ productId, images }) => {
  const {
    images: localImages,
    isLoading,
    hasChanges,
    reorderImages,
    saveOrder,
    resetOrder,
  } = useImageReorder({
    productId,
    initialImages: images,
    onReorderSuccess: (newImages) => {
      // Handle successful reorder
    },
  });

  // Use the hook methods...
};
```

#### Using the Component

```typescript
import ImageReorderComponent from "../components/ImageReorderComponent";

<ImageReorderComponent
  productId={product.id}
  images={productImages}
  onImagesReordered={(newImages) => setProductImages(newImages)}
  onDeleteImage={(id) => handleDelete(id)}
/>;
```

## API Integration

### Request Format

```typescript
POST /api/product-images/reorder
Content-Type: application/json
Authorization: Bearer {token}

{
  "product_id": 1,
  "image_orders": [
    { "id": 5, "order_position": 0 },
    { "id": 3, "order_position": 1 },
    { "id": 7, "order_position": 2 }
  ]
}
```

### Response Format

```typescript
{
  "message": "Images reordered successfully.",
  "images": [
    {
      "id": 5,
      "product_id": 1,
      "image_path": "product_images/image1.jpg",
      "order_position": 0,
      "created_at": "2025-09-18T00:25:50.000000Z",
      "updated_at": "2025-09-18T00:30:15.000000Z"
    }
    // ... more images
  ]
}
```

## User Experience Features

### Visual Feedback

- **Drag Handles**: Clear drag handle icons on each image
- **Position Indicators**: Numbers showing current position
- **Hover Effects**: Visual feedback on hover
- **Loading States**: Spinners and disabled states during operations
- **Toast Notifications**: Success/error messages

### Accessibility

- **Keyboard Navigation**: Full keyboard support via `@dnd-kit`
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Alternative Methods**: Keyboard shortcuts for reordering

### Error Handling

- **Network Failures**: Graceful error handling with user feedback
- **Authentication Errors**: Clear messaging for token issues
- **Validation Errors**: Backend validation error display
- **Optimistic Updates**: Rollback on failure

## Performance Considerations

- **Optimistic Updates**: Immediate UI updates before API calls
- **Debouncing**: Prevents rapid API calls during drag operations
- **Lazy Loading**: Images loaded on demand
- **Memory Management**: Proper cleanup of event listeners

## Testing

### Manual Testing Checklist

- [ ] Drag and drop reordering works
- [ ] Position indicators update correctly
- [ ] Save/Reset buttons function properly
- [ ] Error handling works (network failures)
- [ ] Loading states display correctly
- [ ] Toast notifications appear
- [ ] Modal tabs switch correctly
- [ ] Add/Delete image functionality still works
- [ ] Responsive design on different screen sizes
- [ ] Keyboard accessibility

### Edge Cases Handled

- [ ] Empty image list
- [ ] Single image (no reordering needed)
- [ ] Large number of images (performance)
- [ ] Network disconnection during save
- [ ] Invalid authentication token
- [ ] Concurrent edits by multiple users

## Future Enhancements

### Potential Improvements

1. **Bulk Operations**: Select multiple images for batch operations
2. **Image Preview**: Larger preview on hover/click
3. **Undo/Redo**: History of reordering operations
4. **Auto-save**: Automatic saving after reordering
5. **Image Metadata**: Edit alt text, captions, etc.
6. **Sorting Options**: Sort by date, name, size, etc.
7. **Grid/List View**: Toggle between different view modes

### Performance Optimizations

1. **Virtual Scrolling**: For products with many images
2. **Image Compression**: Optimize image loading
3. **Caching**: Cache reorder operations
4. **Batch API Calls**: Group multiple operations

## Troubleshooting

### Common Issues

1. **Images not reordering**: Check network tab for API errors
2. **Drag not working**: Verify `@dnd-kit` installation
3. **Save button not appearing**: Check `hasChanges` state
4. **Authentication errors**: Verify token in localStorage

### Debug Information

- Check browser console for error messages
- Verify API endpoint is accessible
- Check network requests in browser dev tools
- Validate token expiration

## File Structure

```
src/
├── components/
│   ├── ImageReorderComponent.tsx       # Main reordering component
│   └── AdminProductsModals/
│       └── EditProductModal.tsx        # Enhanced modal with tabs
├── hooks/
│   └── useImageReorder.ts              # Reordering logic hook
├── services/
│   └── api-service.ts                  # API calls
└── types/
    └── types.ts                        # TypeScript definitions
```

## Conclusion

The product image reordering feature is now fully implemented with a modern, accessible, and user-friendly interface. The modular approach using custom hooks and reusable components ensures maintainability and extensibility for future enhancements.

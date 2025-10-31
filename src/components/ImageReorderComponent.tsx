import {
  Box,
  Button,
  IconButton,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleIcon, DeleteIcon } from "@chakra-ui/icons";
import { ProductImage } from "../types/types";
import { assetsBaseURL } from "../services/api-service";
import useImageReorder from "../hooks/useImageReorder";

interface SortableImageProps {
  image: ProductImage;
  onDelete: (id: number) => void;
}

const SortableImage = ({ image, onDelete }: SortableImageProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      maxW="120px"
      maxH="120px"
      position="relative"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
      cursor={isDragging ? "grabbing" : "grab"}
      bg="white"
      _hover={{ boxShadow: "md" }}
    >
      {/* Drag Handle */}
      <Box
        {...attributes}
        {...listeners}
        position="absolute"
        top={1}
        left={1}
        zIndex={2}
        bg="rgba(0,0,0,0.7)"
        borderRadius="md"
        p={1}
      >
        <DragHandleIcon color="white" boxSize={3} />
      </Box>

      {/* Delete Button */}
      <IconButton
        aria-label="Delete Image"
        size="sm"
        icon={<DeleteIcon />}
        colorScheme="red"
        position="absolute"
        top={1}
        right={1}
        zIndex={2}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(image.id);
        }}
      />

      {/* Image */}
      <Image
        src={`${assetsBaseURL}/${image.image_path}`}
        alt="Product"
        objectFit="cover"
        width="100%"
        height="100%"
        onClick={() =>
          window.open(`${assetsBaseURL}/${image.image_path}`, "_blank")
        }
      />

      {/* Order Position Indicator */}
      <Box
        position="absolute"
        bottom={1}
        left={1}
        bg="rgba(0,0,0,0.7)"
        color="white"
        px={2}
        py={1}
        borderRadius="md"
        fontSize="xs"
        fontWeight="bold"
      >
        {(image.order_position ?? 0) + 1}
      </Box>
    </Box>
  );
};

interface ImageReorderComponentProps {
  productId: number;
  images: ProductImage[];
  onImagesReordered: (images: ProductImage[]) => void;
  onDeleteImage: (id: number) => void;
}

const ImageReorderComponent = ({
  productId,
  images,
  onImagesReordered,
  onDeleteImage,
}: ImageReorderComponentProps) => {
  const {
    images: localImages,
    isLoading,
    hasChanges,
    setImages: setLocalImages,
    reorderImages,
    saveOrder,
    resetOrder,
  } = useImageReorder({
    productId,
    initialImages: images,
    onReorderSuccess: onImagesReordered,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localImages.findIndex((item) => item.id === active.id);
      const newIndex = localImages.findIndex((item) => item.id === over?.id);

      const reorderedItems = arrayMove(localImages, oldIndex, newIndex);
      reorderImages(reorderedItems);
    }
  };

  const handleDeleteImage = (id: number) => {
    const updatedImages = localImages.filter((img) => img.id !== id);
    setLocalImages(updatedImages);
    onDeleteImage(id);
  };

  // Update local images when prop changes
  React.useEffect(() => {
    setLocalImages(images);
  }, [images, setLocalImages]);

  if (localImages.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No images to reorder</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="sm" color="gray.600">
        Drag images to reorder them. The number on each image shows its current
        position.
      </Text>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localImages.map((img) => img.id)}
          strategy={verticalListSortingStrategy}
        >
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
            {localImages.map((image) => (
              <SortableImage
                key={image.id}
                image={image}
                onDelete={handleDeleteImage}
              />
            ))}
          </SimpleGrid>
        </SortableContext>
      </DndContext>

      {hasChanges && (
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            size="sm"
            variant="outline"
            onClick={resetOrder}
            isDisabled={isLoading}
          >
            Reset
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={saveOrder}
            isLoading={isLoading}
            loadingText="Saving..."
          >
            Save Order
          </Button>
        </Box>
      )}

      {isLoading && (
        <Box display="flex" alignItems="center" justifyContent="center" py={4}>
          <Spinner size="sm" mr={2} />
          <Text fontSize="sm">Saving new order...</Text>
        </Box>
      )}
    </VStack>
  );
};

export default ImageReorderComponent;

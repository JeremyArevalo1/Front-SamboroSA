import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Textarea,
  IconButton,
  Button,
  useColorModeValue,
  Icon,
  Badge,
  Tooltip,
  Fade,
  ScaleFade,
  Collapse,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiMessageCircle, FiSend, FiMoreHorizontal } from "react-icons/fi";
import { BsEmojiSmile, BsHeartFill, BsHeart } from "react-icons/bs";
import { keyframes } from "@emotion/react";
import { useAddComment } from "../../shared/hooks/Comments/useAddComments";
import { useCommentsByPublications } from "../../shared/hooks/Comments/useCommentByPublications";
import { useToggleLike } from "../../shared/hooks/Comments/useLikeComment";

import { EditComment } from "./updateComment";
import { AppContext } from "../AppContext/AppContext";

// Animaciones
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(229, 62, 62, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
`;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  14% { transform: scale(1.2); }
  28% { transform: scale(1); }
  42% { transform: scale(1.2); }
  70% { transform: scale(1); }
`;

const shimmerEffect = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// LikesPopover para mostrar usuarios que dieron like
const LikesPopover = ({ likes = [], children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cardBg = useColorModeValue("white", "gray.800");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const validLikes = Array.isArray(likes) ? likes : [];
  const hasLikes = validLikes.length > 0;

  if (!hasLikes) {
    return <>{children}</>;
  }

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger="hover"
      placement="top"
      closeOnBlur={true}
      openDelay={300}
      closeDelay={150}
    >
      <PopoverTrigger>
        <Box
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          cursor="pointer"
          display="inline-block"
        >
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        shadow="xl"
        rounded="xl"
        maxW="280px"
        maxH="300px"
        overflow="hidden"
        p={0}
        zIndex={1500}
      >
        <PopoverArrow bg={cardBg} />
        <PopoverBody p={4}>
          <VStack spacing={3} align="start" w="full">
            <Text fontSize="sm" fontWeight="700" color={textPrimary}>
              Les gusta a {validLikes.length}{" "}
              {validLikes.length === 1 ? "persona" : "personas"}
            </Text>

            <VStack
              spacing={2}
              align="stretch"
              maxH="200px"
              overflowY="auto"
              w="full"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: borderColor,
                  borderRadius: "2px",
                },
              }}
            >
              {validLikes.slice(0, 10).map((user, index) => {
                if (!user || typeof user === "string") {
                  return null;
                }
                return (
                  <HStack key={user._id || `user-${index}`} spacing={3}>
                    <Avatar
                      size="sm"
                      src={user.profilePhoto || "/img/logosamboro.png"}
                      name={user.username || "Usuario"}
                    />
                    <Text
                      fontSize="sm"
                      color={textPrimary}
                      fontWeight="500"
                      noOfLines={1}
                      flex={1}
                    >
                      {user.username || "Usuario"}
                    </Text>
                  </HStack>
                );
              })}
              {validLikes.length > 10 && (
                <Text
                  fontSize="xs"
                  color={textSecondary}
                  textAlign="center"
                  mt={2}
                >
                  y {validLikes.length - 10} más...
                </Text>
              )}
            </VStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const CommentsSection = ({ publicationId, isOpen }) => {
  const { comments, loading, error, fetchComments } =
    useCommentsByPublications(publicationId);
  const [commentsData, setCommentsData] = useState([]);
  const { user } = useContext(AppContext);
  const [newComment, setNewComment] = useState("");
  const [hoveredComment, setHoveredComment] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const { addComment, loading: addingComment } = useAddComment();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { handleToggleLike, loading: togglingLike } = useToggleLike();

  // Sincronizar estado local con comentarios del hook
  useEffect(() => {
    setCommentsData(comments);
  }, [comments]);

  // Colores
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const textMuted = useColorModeValue("gray.500", "gray.500");
  const accentColor = useColorModeValue("#E53E3E", "#E53E3E");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)");
  const gradientBg = useColorModeValue(
    "linear(135deg, red.400, pink.400, purple.500)",
    "linear(135deg, red.500, pink.500, purple.600)"
  );

  // Detectar si el usuario actual dio like
  // Detectar si el usuario actual dio like
  const hasUserLiked = (comment) => {
    if (!comment?.likes || !Array.isArray(comment.likes) || !user?._id) {
      return false;
    }
    return comment.likes.some((like) => {
      if (typeof like === "string") {
        return like === user._id;
      } else if (like && typeof like === "object") {
        return like._id === user._id;
      }
      return false;
    });
  };

  // Manejar like toggle
  const handleLikeComment = async (commentId) => {
    // Optimistic update
    setCommentsData((prev) =>
      prev.map((comment) => {
        if (comment._id === commentId) {
          const alreadyLiked = hasUserLiked(comment);
          let newLikes;

          if (alreadyLiked) {
            // quitar like
            newLikes = comment.likes.filter(
              (like) =>
                (typeof like === "string" ? like : like._id) !== user._id
            );
          } else {
            // agregar like
            newLikes = [
              ...comment.likes,
              {
                _id: user._id,
                username: user.username,
              },
            ];
          }

          return {
            ...comment,
            likes: newLikes,
            likesCount: newLikes.length,
          };
        }
        return comment;
      })
    );

    // Llamar al backend
    const result = await handleToggleLike(commentId);

    if (!result.success) {
      // revertir si hubo error
      fetchComments();
      console.error("Error al dar like:", result.msg);
    }
  };

  // Manejar cambio en textarea
  const handleCommentChange = (value) => {
    setNewComment(value);
    setIsTyping(value.length > 0);
  };

  // Enviar nuevo comentario
  const handleSubmitComment = async () => {
    if (!newComment?.trim()) return;

    const commentData = await addComment({
      text: newComment,
      publication: publicationId,
    });
    if (commentData) {
      setCommentsData((prev) => [commentData, ...prev]);
      setNewComment("");
      setIsTyping(false);
    }
  };

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box
        borderTop="3px solid"
        borderColor={accentColor}
        bg={cardBg}
        position="relative"
        overflow="hidden"
      >
        {/* Efecto de brillo superior */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="1px"
          bgGradient={gradientBg}
          opacity="0.6"
        />

        <VStack spacing={6} p={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box position="relative">
                <Icon as={FiMessageCircle} w={6} h={6} color={accentColor} />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="30px"
                  h="30px"
                  bg={accentColor}
                  rounded="full"
                  opacity="0.1"
                  animation={`${pulseGlow} 3s infinite`}
                />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight="700" fontSize="lg" color={textPrimary}>
                  Comentarios
                </Text>
                <Text fontSize="sm" color={textSecondary}>
                  {commentsData.length}{" "}
                  {commentsData.length === 1 ? "comentario" : "comentarios"}
                </Text>
              </VStack>
            </HStack>

            <Badge
              colorScheme="red"
              rounded="full"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="600"
            >
              {commentsData.length > 0 ? "Activa" : "Sin actividad"}
            </Badge>
          </HStack>

          {/* Input nuevo comentario */}
          <Box
            bg={useColorModeValue("gray.50", "gray.700")}
            p={4}
            rounded="3xl"
            border="2px solid"
            borderColor={cardBorder}
            position="relative"
            _hover={{
              borderColor: accentColor,
              shadow: `0 0 0 3px ${accentColor}15`,
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            <HStack spacing={4} align="start">
              <Avatar
                size="md"
                src={user?.profilePhoto || "/img/logosamboro.png"}
                ring="3px"
                ringColor={accentColor}
                ringOffset="2px"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              />

              <Box flex={1} position="relative">
                <Textarea
                  placeholder="Comparte tu opinión... ✨"
                  size="lg"
                  resize="none"
                  minH="50px"
                  maxH="120px"
                  bg="transparent"
                  border="none"
                  rounded="2xl"
                  px={0}
                  py={2}
                  value={newComment}
                  onChange={(e) => handleCommentChange(e.target.value)}
                  fontSize="md"
                  fontWeight="500"
                  _focus={{
                    border: "none",
                    shadow: "none",
                  }}
                  _placeholder={{
                    color: textMuted,
                    fontSize: "md",
                  }}
                />

                <HStack justify="space-between" mt={3}>
                  <Tooltip label="Agregar emoji" placement="top">
                    <IconButton
                      size="sm"
                      variant="ghost"
                      icon={<Icon as={BsEmojiSmile} />}
                      rounded="full"
                      color={textMuted}
                      _hover={{
                        color: accentColor,
                        bg: `${accentColor}10`,
                        transform: "scale(1.1)",
                      }}
                      transition="all 0.2s"
                    />
                  </Tooltip>

                  <Button
                    size="sm"
                    colorScheme="red"
                    rounded="full"
                    leftIcon={<Icon as={FiSend} w={4} h={4} />}
                    isDisabled={!newComment?.trim() || addingComment}
                    isLoading={addingComment}
                    onClick={handleSubmitComment}
                    px={6}
                    fontWeight="700"
                    _hover={{
                      transform: "translateY(-1px)",
                      shadow: `0 5px 15px ${accentColor}40`,
                    }}
                    _disabled={{
                      opacity: 0.4,
                      cursor: "not-allowed",
                    }}
                    transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    position="relative"
                    overflow="hidden"
                  >
                    {isTyping ? "Enviar" : "Comentar"}
                  </Button>
                </HStack>
              </Box>
            </HStack>
          </Box>

          {/* Lista de comentarios */}
          {commentsData.length > 0 ? (
            <VStack spacing={5} align="stretch">
              {commentsData.map((comment, idx) => (
                <ScaleFade
                  key={comment._id}
                  in={true}
                  initialScale={0.9}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Box
                    bg={cardBg}
                    p={5}
                    rounded="2xl"
                    border="1px solid"
                    borderColor={cardBorder}
                    shadow={
                      hoveredComment === comment._id
                        ? `0 10px 25px ${shadowColor}`
                        : `0 2px 8px ${shadowColor}`
                    }
                    onMouseEnter={() => setHoveredComment(comment._id)}
                    onMouseLeave={() => setHoveredComment(null)}
                    transform={
                      hoveredComment === comment._id
                        ? "translateY(-2px)"
                        : "translateY(0)"
                    }
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    position="relative"
                    overflow="visible"
                  >
                    {hoveredComment === comment._id && (
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        h="2px"
                        bgGradient={gradientBg}
                        animation={`${shimmerEffect} 2s infinite`}
                      />
                    )}

                    <HStack spacing={4} align="start">
                      <Avatar
                        size="md"
                        src={
                          comment.user?.profilePhoto || "/img/logosamboro.png"
                        }
                        ring="2px"
                        ringColor={
                          hoveredComment === comment._id
                            ? accentColor
                            : "transparent"
                        }
                        ringOffset="2px"
                        transition="all 0.3s"
                      />

                      <VStack align="start" spacing={3} flex={1}>
                        <HStack justify="space-between" w="full">
                          <VStack align="start" spacing={1}>
                            <Text
                              fontWeight="700"
                              fontSize="md"
                              color={textPrimary}
                            >
                              {comment.user?.username}
                            </Text>
                            <Text
                              fontSize="xs"
                              color={textMuted}
                              fontWeight="500"
                            >
                              {new Date(comment.createdAt).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </Text>
                          </VStack>

                          {/* Menú con opciones */}
                          {(user?._id === comment.user?._id ||
                            user?.role === "DEVELOPER") && (
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                size="sm"
                                variant="ghost"
                                icon={<FiMoreHorizontal />}
                                rounded="full"
                                color={textMuted}
                                _hover={{
                                  color: accentColor,
                                  bg: `${accentColor}10`,
                                }}
                              />
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    setEditingCommentId(comment._id)
                                  }
                                >
                                  Editar
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          )}
                        </HStack>

                        {editingCommentId === comment._id ? (
                          <Modal
  isOpen={editingCommentId === comment._id}
  onClose={() => setEditingCommentId(null)}
  size="lg"
  isCentered
>
  <ModalOverlay />
  <ModalContent bg={cardBg} rounded="2xl" shadow="2xl">
    <ModalHeader>Editar comentario</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
<EditComment
  comment={comment}
  user={user}
  onCancel={() => setEditingCommentId(null)}   // 👈 corregido
  onUpdate={(updatedComment) => {
    setCommentsData((prev) =>
      prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
    );
    setEditingCommentId(null);   // 👈 corregido
  }}
/>
    </ModalBody>
    <ModalFooter>
      <Button onClick={() => setEditingCommentId(null)} colorScheme="red" variant="outline">
        Cancelar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
                        ) : (
                          <Text
                            fontSize="md"
                            lineHeight="1.6"
                            color={textPrimary}
                          >
                            {comment.text}
                          </Text>
                        )}

                        <HStack spacing={0} justify="flex-end" w="100%">
                          <LikesPopover likes={comment.likes || []}>
                            <Button
                              size="sm"
                              variant="ghost"
                              leftIcon={
                                <Icon
                                  as={
                                    hasUserLiked(comment)
                                      ? BsHeartFill
                                      : BsHeart
                                  }
                                  color={
                                    hasUserLiked(comment)
                                      ? "red.500"
                                      : textMuted
                                  }
                                  animation={
                                    hasUserLiked(comment)
                                      ? `${heartBeat} 0.6s ease-in-out`
                                      : "none"
                                  }
                                />
                              }
                              color={
                                hasUserLiked(comment) ? "red.500" : textMuted
                              }
                              fontWeight="600"
                              fontSize="sm"
                              rounded="full"
                              px={3}
                              isLoading={togglingLike}
                              _hover={{
                                color: "red.500",
                                bg: "red.50",
                                transform: "scale(1.05)",
                              }}
                              onClick={() => handleLikeComment(comment._id)}
                              transition="all 0.2s"
                            >
                              {comment.likesCount > 0
                                ? `${comment.likesCount} `
                                : ""}
                              Me gusta
                            </Button>
                          </LikesPopover>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                </ScaleFade>
              ))}
            </VStack>
          ) : (
            <Fade in={true}>
              <VStack spacing={4} py={12} textAlign="center">
                <Box position="relative">
                  <Icon
                    as={FiMessageCircle}
                    w={16}
                    h={16}
                    color={textMuted}
                    opacity="0.5"
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="80px"
                    h="80px"
                    border="2px dashed"
                    borderColor={textMuted}
                    rounded="full"
                    opacity="0.2"
                  />
                </Box>
                <VStack spacing={2}>
                  <Text fontSize="lg" fontWeight="600" color={textPrimary}>
                    ¡Sé el primero en comentar!
                  </Text>
                  <Text fontSize="md" color={textSecondary} maxW="300px">
                    Comparte tu opinión y empieza la conversación
                  </Text>
                </VStack>
              </VStack>
            </Fade>
          )}
        </VStack>
      </Box>
    </Collapse>
  );
};

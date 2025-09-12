import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Textarea,
  Button,
  Icon,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { useUpdateComment } from "../../shared/hooks/Comments/useUpdateComment";
import { AppContext } from "../AppContext/AppContext";

export const EditComment = ({ comment, onCancel, onUpdate }) => {
  const [text, setText] = useState(comment?.text || "");
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useContext(AppContext);

  const { handleUpdateComment, loading } = useUpdateComment();

  // Actualizar texto si cambia el comentario (por si se reabre con otro)
  useEffect(() => {
    setText(comment?.text || "");
    setIsTyping(false);
  }, [comment]);

  const handleChange = (value) => {
    setText(value);
    setIsTyping(value.length > 0);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const updatedComment = await handleUpdateComment(comment._id, text.trim());
    if (updatedComment) {
      onUpdate(updatedComment);
    }
  };

  // Colores
  const textMuted = useColorModeValue("gray.500", "gray.500");
  const accentColor = useColorModeValue("#E53E3E", "#E53E3E");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
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
      mb={4}
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
            placeholder="Edita tu comentario... ✨"
            size="lg"
            resize="none"
            minH="50px"
            maxH="120px"
            bg="transparent"
            border="none"
            rounded="2xl"
            px={0}
            py={2}
            value={text}
            onChange={(e) => handleChange(e.target.value)}
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
                // Aquí podrías agregar funcionalidad para emojis si quieres
              />
            </Tooltip>

            <HStack spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                fontWeight="600"
                _hover={{ bg: "gray.200" }}
              >
                Cancelar
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                rounded="full"
                leftIcon={<Icon as={FiSend} w={4} h={4} />}
                isDisabled={!text.trim() || loading}
                isLoading={loading}
                onClick={handleSubmit}
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
                Guardar
              </Button>
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

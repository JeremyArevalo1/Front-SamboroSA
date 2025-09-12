import { SimpleGrid, Box, useColorModeValue } from "@chakra-ui/react";
import { ListPublicationsIT } from "../componentPublications/ListPublicationsIT";
import { ListPublicationsRRHH } from "../componentPublications/ListPublicationsRRHH";
import { ListPublicationsMarketing } from "../componentPublications/ListPublicationsMarketing";
import { PublicationsHeader } from "../componentPublications/PublicationHeader";
import { useDisclosure } from "@chakra-ui/react";
import react, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import { CreatePublication } from "../componentPublications/AddPublications";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from "@chakra-ui/react";

export const ComponentPrincipalPage = () => {
  const bgMain = useColorModeValue("whiteAlpha", "gray.900");
  const bgBox = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const accentColor = useColorModeValue("#E53E3E", "#E53E3E");
  const accentHover = useColorModeValue("#C53030", "#C53030");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AppContext);


  return (
    <Box w="100%" minH="100vh" bg={bgMain} px={5} color={textColor}>
      {/* HEADER + BOTÓN */}
      {user && (
        <PublicationsHeader
          user={user}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          accentColor={accentColor}
          accentHover={accentHover}
        />
      )}

      {/* Modal Crear Publicación */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="3xl" p={4} bg={bgBox}>
          <ModalCloseButton />
          <ModalBody p={0}>
            <CreatePublication onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* LISTA DE PUBLICACIONES */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        <Box bg={bgMain} rounded="xl" p={2}>
          <ListPublicationsRRHH />
        </Box>
        <Box bg={bgMain} rounded="xl" p={2}>
          <ListPublicationsMarketing />
        </Box>
        <Box bg={bgMain} rounded="xl" p={2}>
          <ListPublicationsIT />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

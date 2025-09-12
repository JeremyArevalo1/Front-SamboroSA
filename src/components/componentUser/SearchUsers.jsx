import React, { useState, useEffect } from "react";
import { InputGroup, InputLeftElement, InputRightElement, Input, IconButton, HStack } from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useBarSearchUser } from "../../shared/hooks/User/useBarSearchUser";

export const SearchBar = ({ onResults, allUsers }) => {
  const { term, setTerm, userData, search } = useBarSearchUser("", allUsers);

  useEffect(() => {
    onResults(userData); // notifica cambios
  }, [userData, onResults]);

  const handleClear = () => search(""); // limpiar y mostrar todos

  return (
    <HStack spacing={2} w="100%" maxW="400px">
      <InputGroup>
        <InputLeftElement>
          <IconButton
            aria-label="Buscar usuario"
            icon={<FaSearch />}
            size="sm"
            onClick={() => search(term)}
            variant="ghost"
            colorScheme="gray"
          />
        </InputLeftElement>

        <Input
          placeholder="Buscar usuario (nombre, apellido, email, ID)..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(term)}
          borderRadius="xl"
        />

        {term && (
          <InputRightElement>
            <IconButton
              aria-label="Limpiar búsqueda"
              icon={<FaTimes />}
              size="sm"
              onClick={handleClear}
              variant="ghost"
              colorScheme="gray"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </HStack>
  );
};


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SignIn from '../SignIn';

import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button
} from '@chakra-ui/react';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [Name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', {
        email: email,
        password: password,
        Name: Name,
      });

      if (response.status == 200 ) {
        navigate('/SignIn');
        console.log("Registration successful");
      } else { 
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <ChakraProvider>
      <Box p={4} bg="pink.50" maxW="md" mx="auto" mt={8} borderRadius="md"> {/* Change background color and adjust width */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mt-5 mb-3">Register </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id="Name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"} 
                  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                 <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="xs"
                    onClick={() => setShowPassword(!showPassword)}
                    colorScheme="pink" 
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button colorScheme="pink" type="submit" size="md"> {/* Change button color and size */}
            Register
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default Register;

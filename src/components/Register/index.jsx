import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  extendTheme,
} from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: "#ff6b81", // Your pink color
    },
  },
});

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', {
        Name: name,
        Email: Email,  // Updated to use 'Name' instead of 'Email'
        Password: password,
      });

      if (response.status >= 200 && response.status <= 299) {
        // Assuming the server returns a token on successful login
        const token = response.data.token;

        // You might want to store the token securely, e.g., using localStorage
        localStorage.setItem('token', token);

        // Call the onLoginSuccess callback (if provided)
    
        // Redirect to some authenticated route
        navigate('/');
      } else {
        console.log(response.data.message);
        // Show error message to the user
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error.message);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4} backgroundColor="white" borderRadius="8px" boxShadow="0 4px 8px rgba(0,0,0,0.1)">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input 
                type="text" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </FormControl>

            <FormControl id="Email">
              <FormLabel>Email</FormLabel>
              <Input 
                type="text" 
                placeholder="Enter your Email" 
                value={Email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button 
                    h="1.75rem" 
                    size="sm" 
                    colorScheme="brand" // Use pink color for the button
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button colorScheme="brand" type="submit">Login</Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
}



export default Register;

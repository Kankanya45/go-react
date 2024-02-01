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

function SignIn({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        Email: email,
        Password: password,
      });

      if (response.data.message === "success") {
        onLoginSuccess();
        navigate('/'); // Redirect to the home page
        console.log("Login successful");
      } else {
        console.log(response.data.message);
        // Show error message to the user
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Login error:', error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4} backgroundColor="white" borderRadius="8px" boxShadow="0 4px 8px rgba(0,0,0,0.1)">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
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

SignIn.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default SignIn;

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'


export default function RegiSuccess({page="Registered"}){
    return(
        <div>
            <Alert
  status='success'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='200px'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>
    User {page}!
  </AlertTitle>
  <AlertDescription maxWidth='sm'>
    Enjoy your virtual travel experience.
  </AlertDescription>
</Alert>
        </div>
    )
}


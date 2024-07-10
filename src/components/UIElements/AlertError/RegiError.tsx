"use client"
import { useToast} from '@chakra-ui/react'


export default function ToastError({page=""}) {
    const toast = useToast()
    return(
        toast({
            title: ` Please try again.`,
            status: "error",
            isClosable: true,
          })
    )

}
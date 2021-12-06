import { Formik, Form } from 'formik'
import { $fetch } from 'ohmyfetch'
import { useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'
import FormikField from '@components/forms/formik-field'
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, 
  Stack, HStack, Spacer
} from '@chakra-ui/react'

export default function NewProject({ isOpen, onOpen, onClose }) {
  const toast = useToast()
  const { mutate } = useSWRConfig()
  
  const onSubmit = (values, { setSubmitting }) => {
    $fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(r => {
        setSubmitting(false)
        onClose()
        mutate('/api/projects')
        toast({
          title: "Project created 🚀",
          description: `${values.name} has been successfully created!`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        })
      })
      .catch(() => {
        setSubmitting(false)
        console.log('Issue creating project :(')
      })
  }

  const stringIsNotEmpty = (value) => {
    if (!value?.length > 0) {
      return 'Value must not be empty!'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Project</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Formik initialValues={{}} onSubmit={onSubmit}>
            {(props) => (
              <Form>
                <Stack spacing='2'>
                  <FormikField name="name" label="Project name" validation={stringIsNotEmpty} />
                  <FormikField name="description" label="Description" validation={stringIsNotEmpty} />
                  <FormikField name="owner" label="Org or User" validation={stringIsNotEmpty} />
                  <HStack>
                    <Spacer />
                    <Button isLoading={props.isSubmitting} type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </HStack>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}

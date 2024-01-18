import { ragApiInstance } from '.'

export const createAssistant = (documentId: string) => {
  return ragApiInstance
    .get(`/assistant/${documentId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error))
}

export const uploadDocument = (formData: any) => {
  return ragApiInstance.post(`/documents/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const indexDocument = (document: any) => {
  return ragApiInstance.post(`/documents/index`, document)
}

export const fetchDocument = (docId: string) => {
  return ragApiInstance.get(`/documents/${docId}`)
}

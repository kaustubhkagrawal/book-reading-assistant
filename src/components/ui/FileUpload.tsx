import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploadProps {
  name?: string
  onChange: (file: File) => void
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ name, onChange }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const onDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        onChange(file)
      }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'application/pdf': ['.pdf'],
        'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
        'text/markdown': ['.md'],
        'text/plain': ['.txt'],
      },
      onDrop,
      maxSize: 10000000, // 10 MB
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0]
      if (file) {
        onChange(file)
      }
    }

    console.log('isDragActive', isDragActive)

    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click() // Trigger the file input
      }
    }

    useImperativeHandle(
      ref,
      () =>
        ({
          focus: () => {
            inputRef.current && inputRef.current.focus()
          },
        } as any),
    )

    return (
      <div
        {...getRootProps({
          // className: 'w-full flex flex-col',
        })}
      >
        <input
          name={name}
          {...getInputProps({ className: 'hidden' })}
          onChange={handleChange}
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <div
          className="p-4 border-2 border-dashed rounded-md flex flex-col justify-center flex-1 w-full items-center min-h-40 my-4 cursor-pointer"
          onClick={handleButtonClick}
        >
          <div className="mb-4 text-gray-600">
            {isDragActive
              ? 'Drop the files here'
              : "Drag 'n' drop some files here, or click to select files"}
          </div>
        </div>
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'

export default FileUpload

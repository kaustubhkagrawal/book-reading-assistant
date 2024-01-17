import { Button } from '@/components/ui/Button'
import FileUpload from '@/components/ui/FileUpload'
import { envConfig } from '@/config/env.config'
import axios from 'axios'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FileText, X } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [isIndexingDone, setIsIndexingDone] = useState(false)

  const { control, watch, setValue, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('file', data.file)

    try {
      const response = await axios.post(
        `${envConfig.ragUrl}/documents/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('File uploaded successfully: ', response.data)

      const document = response.data

      try {
        const response = await axios.post(
          `${envConfig.ragUrl}/documents/index`,
          document,
        )
        console.log('response', response.data)
        setIsIndexingDone(true)
      } catch (error) {
        console.error('Error in indexing the file', error)
        setIsIndexingDone(false)
      }
      // Handle the response as needed
    } catch (error) {
      console.error('Error uploading file: ', error)
      // Handle the error as needed
    }
  }

  const file = watch('file')

  return (
    <>
      <div className="flex flex-wrap flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-center w-full text-lg">Explore the Book</h2>
        <h1 className="text-center w-full text-3xl pb-3">
          20000 Leagues Under the Sea
        </h1>
        <p className="max-w-96 text-center pb-4 text-slate-600">
          Ask any questions about this book. Like what is the content of the
          book. What is it about? Who is the author?
        </p>

        {/* <div className="p-4 max-w-96 text-center text-3xl text-cyan-900">
          {activeTranscript?.transcript ?? ''}
        </div> */}

        <form className="max-w-96 w-full" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="file"
            control={control}
            render={({ field }) => <FileUpload {...field} />}
          />

          {file ? (
            <div className="flex gap-2 mb-4">
              <FileText />
              <span>{file.name}</span>

              <button
                className="ml-auto"
                onClick={() => setValue('file', null)}
              >
                <X />
              </button>
            </div>
          ) : null}
          <Button variant={'default'} type="submit">
            Upload
          </Button>
        </form>
        {/* <Button
          variant={
            isCallActive === CALL_STATUS.ACTIVE ? 'destructive' : 'success'
          }
          className={`w-20 h-20 rounded-full transition-all shadow-${shadowLevel}`}
          shadow={shadowLevel}
          disabled={isCallActive === CALL_STATUS.LOADING}
          onClick={onClick}
        >
          {buttonTextConfig[isCallActive]}
        </Button> */}
        {/* <Button
          asChild
          className="rounded-full cursor-pointer group p-10 transition-all shadow-${shadowLevel} bg-transparent hover:bg-transparent"
          variant={'ghost_shadow'}
          shadow={shadowLevel}
          disabled={isCallActive === CALL_STATUS.LOADING}
          onClick={onClick}
        >
          <Lottie
            animationData={ICONS_DATA[buttonState]}
            style={{
              width: buttonState === CALL_STATUS.LOADING ? 150 : 250,
              height: buttonState === CALL_STATUS.LOADING ? 150 : 250,
              margin: buttonState === CALL_STATUS.LOADING ? 50 : 0,
            }}
          />
        </Button> */}
      </div>
    </>
  )
}

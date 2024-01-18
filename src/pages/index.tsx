import { Button } from '@/components/ui/Button'
import FileUpload from '@/components/ui/FileUpload'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import { Inter } from 'next/font/google'
import { ComponentProps, useEffect, useState } from 'react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { envConfig } from '@/config/env.config'

const inter = Inter({ subsets: ['latin'] })

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}

export default function Home() {
  const [isIndexingDone, setIsIndexingDone] = useState(false)
  const { isCallActive, audioLevel, activeTranscript, toggleCall } = useVapi()

  const { control, register, handleSubmit } = useForm()

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

  // const [audioLevel, setAudioLevel] = useState(0.123)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAudioLevel(Math.random())
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  const shadowLevel = Math.floor(audioLevel / 0.1) as ComponentProps<
    typeof Button
  >['shadow']

  console.log('audioLevel', audioLevel)
  return (
    <>
      <div className="flex flex-wrap flex-col items-center justify-center min-h-screen">
        <h2 className="text-center w-full text-lg">Explore the Book</h2>
        <h1 className="text-center w-full text-3xl pb-3">
          20000 Leagues Under the Sea
        </h1>
        <p className="max-w-96 text-center pb-4 text-slate-600">
          Ask any questions about this book. Like what is the content of the
          book. What is it about? Who is the author?
        </p>

        <div className="p-4 max-w-96 text-center text-3xl text-cyan-900">
          {activeTranscript?.transcript ?? ''}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>File Upload</h1>
          <Controller
            name="file"
            control={control}
            render={({ field }) => <FileUpload {...field} />}
          />
          <Button type="submit">Upload</Button>
        </form>
        <Button
          variant={
            isCallActive === CALL_STATUS.ACTIVE ? 'destructive' : 'success'
          }
          className={`w-20 h-20 rounded-full transition-all shadow-${shadowLevel}`}
          shadow={shadowLevel}
          disabled={isCallActive === CALL_STATUS.LOADING}
          onClick={toggleCall}
        >
          {buttonTextConfig[isCallActive]}
        </Button>
      </div>
    </>
  )
}

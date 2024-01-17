import { Button } from '@/components/ui/Button'
import FileUpload from '@/components/ui/FileUpload'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import { Inter } from 'next/font/google'
import { ComponentProps, useEffect, useState } from 'react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { envConfig } from '@/config/env.config'
import Lottie from 'lottie-react'
import ActiveIcon from '../lottie-icons/active_icon.json'
import LoadingIcon from '../lottie-icons/loading_icon.json'
import InactiveIcon from '../lottie-icons/inactive_icon.json'

const inter = Inter({ subsets: ['latin'] })

const ICONS_DATA = {
  [CALL_STATUS.ACTIVE]: ActiveIcon,
  [CALL_STATUS.INACTIVE]: InactiveIcon,
  [CALL_STATUS.LOADING]: LoadingIcon,
}
const ICONS = {
  [CALL_STATUS.ACTIVE]: (
    <iframe
      className="cursor-pointer group-hover:cursor-pointer"
      style={{
        cursor: 'pointer',
      }}
      src="https://lottie.host/embed/60c85682-04b5-4710-9a2b-f7f00bfb3a10/JeY8YLxnk0.json"
    ></iframe>
  ),
  [CALL_STATUS.INACTIVE]: (
    <iframe
      className="cursor-pointer group-hover:cursor-pointer"
      style={{
        cursor: 'pointer',
      }}
      src="https://lottie.host/embed/e703afb5-ec40-4ea3-bcc2-55e6f063b68e/zsxo03NzbZ.json"
    ></iframe>
  ),
  [CALL_STATUS.LOADING]: (
    <iframe
      className="cursor-pointer group-hover:cursor-pointer"
      style={{
        cursor: 'pointer',
      }}
      src="https://lottie.host/embed/f857b64e-6a1e-4d38-8172-b1670606718c/gNhBOqmVBV.json"
    ></iframe>
  ),
}

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}
// enum BUTTON_STATE {
//   ON = 'ON',
//   OFF = 'OFF',
//   LOADING = 'LOADING',
// }

export default function Home() {
  const [isIndexingDone, setIsIndexingDone] = useState(false)
  const { isCallActive, audioLevel, activeTranscript, toggleCall } = useVapi()
  const [buttonState, setButtonState] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE,
  )

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

  const onClick = () => {
    const preState = buttonState
    const timeOut = setTimeout(() => {
      setButtonState(
        preState === CALL_STATUS.ACTIVE
          ? CALL_STATUS.INACTIVE
          : CALL_STATUS.ACTIVE,
      )
    }, 2000)

    if (CALL_STATUS.LOADING !== buttonState) {
      setButtonState(CALL_STATUS.LOADING)
    } else {
      clearTimeout(timeOut)
      setButtonState(CALL_STATUS.INACTIVE)
    }
  }

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
        <Button
          asChild
          className="rounded-full cursor-pointer group p-10 transition-all shadow-${shadowLevel} bg-transparent hover:bg-transparent"
          // variant={'ghost'}
          // onClick={onClick}
          shadow={shadowLevel}
          disabled={isCallActive === CALL_STATUS.LOADING}
          onClick={onClick}
        >
          <Lottie
            animationData={ICONS_DATA[buttonState]}
            style={{
              width: buttonState === CALL_STATUS.LOADING ? 150 : 250,
              height: buttonState === CALL_STATUS.LOADING ? 150 : 250,
              // padding: buttonState === CALL_STATUS.LOADING ? 25 : 0,
              margin: buttonState === CALL_STATUS.LOADING ? 50 : 0,
            }}
          />
        </Button>
      </div>
    </>
  )
}

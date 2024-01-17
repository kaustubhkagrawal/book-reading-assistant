import { Button } from '@/components/ui/Button'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import { Inter } from 'next/font/google'
import { ComponentProps, useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}

export default function Home() {
  const { isCallActive, audioLevel, activeTranscript, toggleCall } = useVapi()

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

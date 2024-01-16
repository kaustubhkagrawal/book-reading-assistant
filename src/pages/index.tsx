import { Button } from '@/components/ui/Button'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Inter } from 'next/font/google'
import { ComponentProps, useEffect, useReducer, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}

export default function Home() {
  const { isCallActive, toggleCall } = useVapi()

  const [audioLevel, setAudioLevel] = useState(0.123)

  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(Math.random())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const shadowLevel = Math.floor(audioLevel / 0.1) as ComponentProps<
    typeof Button
  >['shadow']

  console.log('audioLevel', audioLevel)
  return (
    <>
      <div className="flex flex-wrap flex-col items-center justify-center min-h-screen">
        <h2 className="text-center w-full text-3xl pb-3">Playground</h2>
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

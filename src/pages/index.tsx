import { Button } from '@/components/ui/Button'
import { useVapi } from '@/lib/hooks/useVapi'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [activeCallStatus, setActiveCallStatus] = useState(false)

  const { start, stop } = useVapi()

  const toggleCall = () => {
    if (activeCallStatus) {
      stop()
    } else {
      start()
    }
    setActiveCallStatus((status) => !status)
  }

  return (
    <>
      <div className="flex flex-wrap flex-col items-center justify-center min-h-screen">
        <h2 className="text-center w-full text-3xl pb-3">Playground</h2>
        <Button
          variant={activeCallStatus ? 'destructive' : 'success'}
          onClick={toggleCall}
        >
          {activeCallStatus ? 'Stop' : 'Start'}
        </Button>
      </div>
    </>
  )
}

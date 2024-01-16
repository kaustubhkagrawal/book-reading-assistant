import { Button } from '@/components/ui/Button'
import { CALL_STATUS } from '@/lib/constants'
import { useVapi } from '@/lib/hooks/useVapi'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const buttonTextConfig = {
  [CALL_STATUS.ACTIVE]: 'Stop',
  [CALL_STATUS.LOADING]: 'Loading...',
  [CALL_STATUS.INACTIVE]: 'Start',
}

export default function Home() {
  const { isCallActive, toggleCall } = useVapi()

  return (
    <>
      <div className="flex flex-wrap flex-col items-center justify-center min-h-screen">
        <h2 className="text-center w-full text-3xl pb-3">Playground</h2>
        <Button
          variant={
            isCallActive === CALL_STATUS.ACTIVE ? 'destructive' : 'success'
          }
          disabled={isCallActive === CALL_STATUS.LOADING}
          onClick={toggleCall}
        >
          {buttonTextConfig[isCallActive]}
        </Button>
      </div>
    </>
  )
}

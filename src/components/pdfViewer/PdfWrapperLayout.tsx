import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import React from 'react'

type IProps = {
  left: React.ReactNode
  right: React.ReactNode
}
export function ResizableDemo({ left, right }: IProps) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border w-screen max-h-[90vh]"
    >
      <ResizablePanel>
        {left || (
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Left</span>
          </div>
        )}
      </ResizablePanel>
      <ResizableHandle className="w-1 hover:bg-gray-200 mx-2" />
      <ResizablePanel defaultSize={50} className="p-4 overflow-scroll">
        <div className="overflow-scroll">
          {right || (
            <div className="flex h-full items-center justify-center p-6 overflow-scroll">
              <span className="font-semibold">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aliquid mollitia id, atque assumenda impedit sed? Ipsum sunt
                natus animi vel iure aspernatur molestiae quidem, rerum
                temporibus perspiciatis repudiandae voluptatum ullam.
              </span>
            </div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

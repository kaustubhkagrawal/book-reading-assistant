import { bookAssistant } from '@/assistants/book.assistant'
import { envConfig } from '@/config/env.config'
import Vapi from '@vapi-ai/web'
import { useEffect, useReducer, useRef, useState } from 'react'
import { CALL_STATUS } from '../constants'
import {
  Message,
  MessageTypeEnum,
  TranscriptMessage,
  TranscriptMessageTypeEnum,
} from '@/types/conversation.type'
import debounce from 'lodash.debounce'
import { MessageActionTypeEnum, useMessages } from './useMessages'
import axios from 'axios'
import { createAssistant } from '@/apis/vapi.api'

interface useVapiProps {
  onCallStart: (vapi: Vapi) => void
}

const vapi = new Vapi(envConfig.vapi.token)

export function useVapi({ onCallStart }: useVapiProps) {
  const [isSpeechActive, setIsSpeechActive] = useState(false)
  const [isCallActive, setIsCallActive] = useState<CALL_STATUS>(
    CALL_STATUS.INACTIVE,
  )

  const [assistantId, setAssistantId] = useState('')

  // const [messages, setMessages] = useState<Message[]>([])
  const [messages, dispatch] = useReducer(useMessages, [
    // {
    //   type: 'function-call-result',
    //   functionCallResult: {
    //     result:
    //       'CALM is different from other methods in several ways [2]. Firstly, CALM does not require updating individual models and instead learns a dense interaction between the models through a few trainable cross-attention parameters. This allows CALM to utilize the expertise from multiple models and achieve improved performance across various tasks. In contrast, other methods focus on parameter efficient fine-tuning, which introduces a small number of trainable parameters while keeping the original model intact [2]. Secondly, CALM is more generic and applicable to any set of models, unlike model merging techniques that are only relevant when the original models are well aligned or derived from the same model [2]. Lastly, CALM enables a model to be adapted to completely new domains using an augmenting model, making it more effective than representative parameter efficient fine-tuning methods like LoRA [2].',
    //     sources: [
    //       {
    //         document_id: 'd95f9eb6-8ea6-4945-a508-7a26b5d6ddea',
    //         text: 'Source 2:\n2 R ELATED WORKS\nParameter efficient fine-tuning: A large body of work focuses on efficient ways of fine-tuning\nmodels for new domains by introducing a small number of trainable parameters, keeping the original\nmodel intact (Houlsby et al., 2019; Wang et al., 2021; Pfeiffer et al., 2021; Hu et al., 2022; Kessler\net al., 2021). Since this paradigm allows a small set of new parameters to be trained, it is challenging\nto use this approach to adapt a model to a new domain, which is absent from the original training\ncorpus. In contrast, CALM enables a model to be adapted to completely new domains using an\naugmenting model. In Section 4.4, we demonstrate that CALM is significantly more effective than\nLoRA (Hu et al., 2022), a representative parameter efficient fine-tuning method.\nModel Merging: Merging different expert models with simple techniques like task vector aver-\naging provides a way of recombining different capabilities of these models (Ilharco et al., 2022;\nMatena & Raffel, 2022). However, these methods are only relevant when the original models are\nwell aligned. Other related approaches are also applicable only when the models are derived from\nthe same model (Matena & Raffel, 2022) or they are of same size (Muqeeth et al., 2023). In contrast,\nCALM is more generic and is applicable to any set of models.\nModel and Task Compositionality: The modular encoder-decoder based method in (Dalmia\net al., 2022) adapts components of encoder-decoder models to allow flexible re-usability of dif-\nferent encoders, each with their own capabilities. Several past studies explore compositionality\nfrom a multi-modal standpoint. Alayrac et al.\n',
    //         page_number: 3,
    //         score: 0.8180614709855056,
    //       },
    //       {
    //         document_id: 'd95f9eb6-8ea6-4945-a508-7a26b5d6ddea',
    //         text: 'Source 3:\nCALM can enable best of both worlds.\nCode Domain Data Here, we use the code-specific corpus, DCode, consisting of open-source code\nextracted from GitHub heads for a variety of programming languages to train mA.\nModels Similar to §4.1, a version of the PaLM2-XXS model has been further pre-trained on DCode\nis used as mA, while the base pre-trained PaLM2-S model acts as mB. We build mA⊕Bby training\nCALM with only 7% of the same code data (data used for mA) to have a data parity.\nEvaluation Tasks We evaluate the efficacy of CALM on three different tasks:\n(i)Code-Completion (CC): Given an initial set of lines of a code, the model is prompted to complete\nthe code snippet. Here the aim is to evaluate the model for code syntax. We perform zero-shot eval-\nuations on HumanEval benchmark dataset (Chen et al., 2021) and report the Pass@1 (P@1) metric.\n(ii)Text-to-Code (T2C): Given a textual context, the model is prompted to generate the correspond-\ning code snippet. Here, the evaluation indicates language understanding and code generation capa-\nbilities. We perform 3-shot inference on the MBPP dataset (Austin et al., 2021) and report P@1.\n(iii)Code-to-Text (C2T): Given a code snippet, the goal is to generate a natural language explanation\nof the code. This task evaluates code understanding and text generation. We perform 3-shot evalua-\ntions on the CodeXGlue benchmark (Lu et al., 2021) and report chrF1 scores across languages.\n',
    //         page_number: 8,
    //         score: 0.8143123077582028,
    //       },
    //       {
    //         document_id: 'd95f9eb6-8ea6-4945-a508-7a26b5d6ddea',
    //         text: 'Source 1:\nCALM does not require updating the\nindividual models and learns a dense interaction between the models through a few trainable cross-\nattention parameters. Our experiments present consistent evidence that CALM learns to utilize the\nexpertise from the two models. That is, when composed with relevant augmenting models, we\nobserve a significant uptick in the anchor model’s performance across multiple challenging tasks,\nsuch as low-resource translation, reasoning, and code explanation/generation.\nThat is, CALM is especially useful in scenarios where proprietary data and knowledge is stored in\nparametric models. With CALM, a foundational LLM could be augmented with such proprietary\nmodels to extend a variety of foundational capabilities such as reasoning, world knowledge, and\ncoherent generation over the target proprietary domains. Finally, extensions of CALM could be\nused to acquire distinct knowledge from multiple augmenting models.\n9\n',
    //         page_number: 9,
    //         score: 0.8231129013703767,
    //       },
    //     ],
    //     forwardToClientEnabled: true,
    //   },
    // },
  ])

  const [activeTranscript, setActiveTranscript] =
    useState<TranscriptMessage | null>(null)

  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const onSpeechStart = () => setIsSpeechActive(true)
    const onSpeechEnd = () => {
      console.log('Speech has ended')
      setIsSpeechActive(false)
    }

    const onCallStartHandler = () => {
      console.log('Call has started')
      setIsCallActive(CALL_STATUS.ACTIVE)
      onCallStart(vapi)
    }

    const onCallEnd = () => {
      console.log('Call has stopped')
      setIsCallActive(CALL_STATUS.INACTIVE)
    }

    const onVolumeLevel = (volume: number) => {
      console.log(`Assistant volume level: ${volume}`)
      setAudioLevel(volume)
    }

    const onMessageUpdate = (message: Message) => {
      console.log('message', message)
      if (
        message.type === MessageTypeEnum.TRANSCRIPT &&
        message.transcriptType === TranscriptMessageTypeEnum.PARTIAL
      ) {
        setActiveTranscript(message)
      } else {
        setActiveTranscript(null)
        dispatch({
          type: MessageActionTypeEnum.UPDATE_LAST_MESSAGE,
          payload: message,
        })
        // debounce(fn, 100)
      }
    }

    const onError = (e: any) => {
      setIsCallActive(CALL_STATUS.INACTIVE)
      console.error(e)
    }

    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)
    vapi.on('call-start', onCallStartHandler)
    vapi.on('call-end', onCallEnd)
    vapi.on('volume-level', onVolumeLevel)
    vapi.on('message', onMessageUpdate)
    vapi.on('error', onError)

    return () => {
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
      vapi.off('call-start', onCallStartHandler)
      vapi.off('call-end', onCallEnd)
      vapi.off('volume-level', onVolumeLevel)
      vapi.off('message', onMessageUpdate)
      vapi.off('error', onError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCallStart])

  const start = async (docId?: string) => {
    const assistant = docId ? await createAssistant(docId) : null
    setIsCallActive(CALL_STATUS.LOADING)
    const response = vapi.start(
      assistantId
        ? assistantId
        : assistant
        ? assistant.assistant_id
        : bookAssistant,
    )

    response.then((res) => {
      console.log({ res })
      if (res?.id) {
        setAssistantId(res?.id)
      }
    })
  }

  const stop = () => {
    setIsCallActive(CALL_STATUS.LOADING)
    vapi.stop()
  }

  const toggleCall = (docId: string) => {
    if (isCallActive == CALL_STATUS.ACTIVE) {
      stop()
    } else {
      start(docId)
    }
  }

  return {
    isSpeechActive,
    isCallActive,
    audioLevel,
    activeTranscript,
    messages,
    start,
    stop,
    toggleCall,
  }
}

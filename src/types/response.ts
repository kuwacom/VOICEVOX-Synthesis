export type AudioQuery = {
    accent_phrases: {}[],
    speedScale: number,
    pitchScale: number,
    intonationScale: number,
    volumeScale: number,
    prePhonemeLength: number,
    postPhonemeLength: number,
    pauseLength: number,
    pauseLengthScale: number,
    outputSamplingRate: number,
    outputStereo: boolean,
    kana: string
}

export type SpeakersStyle = {
    name: string,
    id: number,
    type: string
}

export type Speakers = {
    name: string,
    speaker_uuid: string,
    styles: SpeakersStyle[],
    version: string,
    supported_features: {
        permitted_synthesis_morphing: string
    }
}[]
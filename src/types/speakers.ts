export type SpeakersStyle = {
    name: string;
    id: number;
    type: string;
}

export type Speakers = {
    name: string;
    speaker_uuid: string;
    styles: SpeakersStyle[];
    version: string;
    supported_features: {
        permitted_synthesis_morphing: string;
    }
}[]
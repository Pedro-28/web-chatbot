export interface OptionContent {
  option: string;
  optionResponse: string;
  referenceLink: string;
}

export interface ChatContent {
  id?: string;
  name: string;
  date: string;
  imageUrl: string;
  shortName: string;
  content: string;
  options: OptionContent[] | null;
  isOptionsDisabled: boolean;
  referenceLink?: string;
}
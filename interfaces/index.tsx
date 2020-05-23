import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


export interface IconInterface {
  width?: number;
  rotate?: boolean;
  color?: string;
  primaryColor?: string;
  secondaryColor?: string;
  icon:
    'home' | 'alert' | 'book' | 'words' | 'cards' | 'loading' |
    'notification-dash' | 'notification' | 'plus' | 'saved' | 'search' |
    'sort-by-name' | 'sort' | 'trash' | 'user' | 'wifi' | 'arrow'
  ;
}

export interface FireData {
  username: string;
  email: string;
  uid: string;
}

export interface LingueTranslationInterface {
  query: string;
  words: Array<{
    term: string; // money
    audio: string; // url
    additionalInfo: string | null;
    type: string; // noun
    translations: Array<{
      term: string;
      audio: string;
      type: string;
      alternatives: [];
      examples: Array<{
        from: string;
        to: string;
      }>;
      lessCommonTranslations: Array<{
        term: string;
        type: string;
        usage: null | string;
      }>;
    }>
  }>;
  examples: Array<{
    from: {
      content: string;
      type: string;
      audio: string;
    };
    to: Array<{
      content: string;
      type: string;
      audio: string;
    }>;
  }>;
}

export interface SimpleTranslationData {
  term: string;
  translation: string;
}

export interface SavedWordInterface {
  uid?: string;
  creationDate?: Date; // 'Y-M-D mm'
  lastReview?: null | Date; // 'Y-M-D mm'
  reviewNumber?: number | null | FirebaseFirestoreTypes.FieldValue;
  api?: 'linguee' | 'simple';
  data?: LingueTranslationInterface | SimpleTranslationData;
}

export interface WordInterface {
  uid: string;
  creationDate: string; // 'Y-M-D mm'
  lastReview: null | string; // 'Y-M-D mm'
  reviewNumber: number | null;
  api: 'linguee' | 'simple';
  data: LingueTranslationInterface | SimpleTranslationData;
}

export interface WordData extends WordInterface {
  name: string;
}

export interface ShortTermAdd {
  input: {
    [key: string]: {
      [key: string]: Date; // Creation date
    }; // lang key
  } | null;
  output: {
    [key: string]: {
      [key: string]: {
        [key: string]: WordInterface;
      }; // target translation key
    }; // lang key
  } | null;
}

export interface ShortTerm {
  uid: string; // FireData.uid
  user: FireData;
  input: {
    [key: string]: {
      [key: string]: Date; // Creation date
    }; // lang key
  } | null;
  output: {
    [key: string]: {
      [key: string]: {
        [key: string]: WordInterface;
      }; // target translation key
    }; // lang key
  } | null;
}

export interface LongTerm {
  uid: string; // FireData.uid
  output: {
    [key: string]: {
      [key: string]: {
        [key: string]: WordInterface;
      }; // target translation key
    }; // lang key
  } | null;
}

export interface SavedShortTerm {
  uid: string; // FireData.uid
  user: FireData;
  input: {
    [key: string]: {
      [key: string]: Date; // Creation date
    }; // lang key
  } | null;
  output: {
    [key: string]: {
      [key: string]: {
        [key: string]: SavedWordInterface;
      }; // target translation key
    }; // lang key
  } | null;
}

export interface SavedLongTerm {
  uid: string; // FireData.uid
  output: {
    [key: string]: {
      [key: string]: {
        [key: string]: SavedWordInterface;
      }; // target translation key
    }; // lang key
  } | null;
}

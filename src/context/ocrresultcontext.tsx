import image from 'antd/es/image';
import * as React from 'react';

export type OcrResult = {
  text: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};


type OcrResultContextValue = {
  imageUrl: string;
  ocrResults: OcrResult[];
  setImage: (imageUrl: string) => void;
  setOcrResults: (ocrResults: OcrResult[]) => void;
};

export const OcrResultContext = React.createContext<OcrResultContextValue>({
  imageUrl: '',
  ocrResults: [],
  setImage:  () => { },
  setOcrResults: () => { },
});

export const OcrResultProvider: React.FC<{
  children: React.ReactNode,
  value: OcrResultContextValue;
}> = ({ children, value }) => {

  const subscriptions: Array<(newImage: string) => void> = [];

  const subscribe = (setter: (newImage: string) => void) => {
    subscriptions.push(setter);
    return () => {
      const index = subscriptions.indexOf(setter);
      subscriptions.splice(index, 1);
    };
  };

  const notifySubscribers = (newImage: string) => {
    subscriptions.forEach(subscription => subscription(newImage));
  };

  // call notifySubscribers whenever the image value changes
  React.useEffect(() => {
    notifySubscribers(value.imageUrl);
  }, [value.imageUrl]);


  return <OcrResultContext.Provider value={{
    imageUrl: '',
    ocrResults: [],
    setImage: () => { },
    setOcrResults: () => { }
  }}>
    {children}
  </OcrResultContext.Provider>;
};

export const useOcrResultContext = (): OcrResultContextValue => {
  const context = React.useContext(OcrResultContext);
  if (context === undefined) {
    throw new Error('useOcrResultContext must be used within a OcrResultProvider');
  }
  return context;
};

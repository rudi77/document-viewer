import React, {useState} from 'react';
import {  CFormCheck } from '@coreui/react';
import './document-viewer.css';

export type OcrResult = {
  text: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

type DisplayerProps = {
  imageUrl: string;
};


const DocumentViewer: React.FC<DisplayerProps> = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageWidth(event.currentTarget.offsetWidth);
    setImageHeight(event.currentTarget.offsetHeight);
  };


  const onOcrResultClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  // const resizeBoundingBoxes = () => {
  //   const widthRatio = 1000 / imageWidth;
  //   const heightRatio = 1200 / imageHeight;

  //   const newOcrResults = props.ocrResults.map((result) => ({
  //     text: result.text,
  //     boundingBox: {
  //       x: result.boundingBox.x * widthRatio,
  //       y: result.boundingBox.y * heightRatio,
  //       width: result.boundingBox.width * widthRatio,
  //       height: result.boundingBox.height * heightRatio,
  //     },
  //   }));

  //   return newOcrResults;
  // };

  // const boundingBoxes = resizeBoundingBoxes();

  return (
    <>
    <CFormCheck label="OcrResult" onChange={onOcrResultClickHandler} checked={isChecked}/>
    <div className='document-viewer'>
      <img src={props.imageUrl} alt="Document" onLoad={onImageLoad} style={{ width: '1000px', height: '1200px' }} />
      {/* { showOcrResults ? boundingBoxes.map((result) => (
        <div
          key={result.text}
          className="bounding-box"
          style={{
            left: result.boundingBox.x,
            top: result.boundingBox.y,
            width: result.boundingBox.width,
            height: result.boundingBox.height,
          }}
        />
      )) : null } */}
    </div>
    
    </>
  );
};

export default DocumentViewer;
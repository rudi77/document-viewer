import React, { ChangeEvent, ChangeEventHandler } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import { useOcrResultContext } from '../../context/ocrresultcontext';

const DocumentUploader: React.FC = () => {
  const { imageUrl, ocrResults, setImage, setOcrResults } = useOcrResultContext();
  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
  
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setImage(fileUrl)
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch('http://localhost:9090/upload/ocrresult?format=json', {
        method: 'POST',
        body: formData,
      });
      const ocrResult = await response.json();
      // do something with the JSON result
      setOcrResults(ocrResult);
    } catch (error) {
      // handle the error
      console.error(error);
    }
  }


  return (
    <div className="mb-3">
      <CFormInput type="file" id="formFile" onChange={onChangeHandler} />
    </div>
  );
};

export default DocumentUploader;

import React, { useState } from 'react';
import {
    CCol,
    CRow,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCollapse,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
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
import DocumentViewer from './document-viewer';



// type Props = {
//   // ...other props
// };

type State = {
    images: { url: string; name: string; size: number; type: string; id: number }[];
    selectedImageId: number | null;
};


const Document: React.FC = () => {
    const [state, setState] = useState<State>({
        images: [],
        selectedImageId: null,
    });

    const [visible, setVisible] = useState(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files == null) return;

        const newImages: { url: string; name: string; size: number; type: string; id: number }[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                newImages.push({ url: reader.result as string, name: file.name, size: file.size, type: file.type, id: Date.now() });
                setState((prevState) => ({
                    ...prevState,
                    images: [...prevState.images, ...newImages],
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (id: number) => {
        setState((prevState) => ({ ...prevState, selectedImageId: id }));
    };

    return (
        <>
            <CRow>
                <CCol xs={4}>
                    <CCard className="mb-4">
                        <CCardHeader onClick={() => setVisible(!visible)}>
                            <strong>Upload Document</strong>
                        </CCardHeader>
                        <CCollapse visible={visible}>
                            <CCardBody>
                                <ImageUploader onImageChange={handleImageChange} />
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CCol>
                <CCol xs={8}>
                    <CCard className="mb-4">
                        <CCardHeader onClick={() => setVisible(!visible)}>
                            <strong>Uploaded Documents</strong>
                        </CCardHeader>
                        <CCollapse visible={visible}>
                            <CCardBody>
                                <ImageList
                                    images={state.images}
                                    onImageClick={handleImageClick}
                                    selectedImageId={state.selectedImageId}
                                />
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            {state.selectedImageId && (
                                <DocumentViewer
                                    imageUrl={state.images.find((image) => image.id === state.selectedImageId)!.url}
                                />
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};
export default Document

type UploaderProps = {
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUploader: React.FC<UploaderProps> = (props) => {
    return <input type="file" onChange={props.onImageChange} multiple />;
};

type DisplayerProps = {
    imageUrl: string;
};

const ImageDisplayer: React.FC<DisplayerProps> = (props) => {
    return <img src={props.imageUrl} alt="No Uploaded Image" style={{ width: '1000px', height: '1200px' }} />;
};

type ListProps = {
    images: { url: string; name: string; size: number; type: string; id: number }[];
    onImageClick: (id: number) => void;
    selectedImageId: number | null;
};

const ImageList: React.FC<ListProps> = (props) => {
    return (

        <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
                <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Size</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Id</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {props.images.map((image) => {
                    return (
                        <CTableRow
                            v-for="item in tableItems"
                            onClick={() => props.onImageClick(image.id)}
                            className={image.id === props.selectedImageId ? 'selected' : undefined}>

                            <CTableDataCell>
                                <div>{image.name}</div>
                            </CTableDataCell>

                            <CTableDataCell className="text-center">
                                <div>{image.size}</div>
                            </CTableDataCell>

                            <CTableDataCell>
                                <div>{image.type}</div>

                            </CTableDataCell>

                            <CTableDataCell className="text-center">
                                <div>{image.id}</div>
                            </CTableDataCell>
                        </CTableRow>
                    );
                })}
            </CTableBody>
        </CTable>
    );
};




import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='miniartworks';
const REGION ='us-west-2';
const ACCESS_KEY ='AKIASQKFA6TJFWCNHBHY';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const InputFile = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data.location))
            .catch(err => console.error(err))
    }

    return <div>
        <div>Choose your Art to Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload</button>
    </div>
}

export default InputFile;




import mongoose from 'mongoose';

const DocumentModel = {
    rg: { 
      type: String,
      required: true 
    } ,
    cnh: { 
      type: String,
      required: true 
    },
    signature: { 
      type: String,
      required: true 
    },
    selfie: { 
      type: String,
      required: true 
    }
}
    
const Document = mongoose.model('Document', DocumentModel);

export default Document;
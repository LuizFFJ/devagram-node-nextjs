import multer from "multer";
import { createBucketClient } from '@cosmicjs/sdk';

const meuBucketDevaria = createBucketClient({
    bucketSlug: 'devaria-devagram-9386c7b0-182e-11ee-b3e2-c18f43d0ee6c',
    readKey: 'iWqwlpYI9CtEEah1hSPM44tJdFRI3SkrlD2N0pnoGQXPuEBqge',
    writeKey : 'UKAg5GVaOXzizeRGAG32xvyIFxc36CcayQaSvPljb6N0HhDAFr'
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

const uploadImagemCosmic = async (req: any) => {
    if(req?.file?.originalname){
        const media_object={
            originalname: req.file.originalname,
            buffer: req.file.buffer,
        };


        if(req.url && req.url.includes('publicacao')){
            console.log('Imagem subiu para a pasta [publicacoes]')
            return await meuBucketDevaria.media.insertOne({
                media: media_object,
                folder: 'publicacoes'
            });
        }else{
            console.log('Imagem subiu para a pasta [avatares]');
            return await meuBucketDevaria.media.insertOne({
                media: media_object,
                folder: 'avatares'
            });
        }
    }
}

export { upload, uploadImagemCosmic };
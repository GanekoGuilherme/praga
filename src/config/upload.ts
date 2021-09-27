import { request } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export default{
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..','..','uploads'),
        filename: (request,file,cb) =>{
            const fileName = `${Date.now()}-${uuidv4()}`;
            cb(null,fileName);
        },
    })
};
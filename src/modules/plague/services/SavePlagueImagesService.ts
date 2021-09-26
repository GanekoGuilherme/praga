import { v4 as uuidv4 } from 'uuid';

import PlagueImages from '../schemas/PlagueImages';

interface IRequestDTO {
    images: { path: string }[];
    plagueId: string;
}

class SavePlagueImagesService {

    public async execute({ images, plagueId } : IRequestDTO): Promise<void>{
        for (let index = 0; index < images?.length; index += 1){
            await PlagueImages.create({ _id: uuidv4(), path: images[index].path, plagueId});
        }
    }
}

export default SavePlagueImagesService;
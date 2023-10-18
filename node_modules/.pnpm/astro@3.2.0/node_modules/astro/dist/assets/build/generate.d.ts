import type { BuildPipeline } from '../../core/build/buildPipeline.js';
import type { ImageTransform } from '../types.js';
interface GenerationDataUncached {
    cached: false;
    weight: {
        before: number;
        after: number;
    };
}
interface GenerationDataCached {
    cached: true;
}
type GenerationData = GenerationDataUncached | GenerationDataCached;
export declare function generateImage(pipeline: BuildPipeline, options: ImageTransform, filepath: string): Promise<GenerationData | undefined>;
export declare function getStaticImageList(): Map<string, {
    path: string;
    options: ImageTransform;
}>;
export {};

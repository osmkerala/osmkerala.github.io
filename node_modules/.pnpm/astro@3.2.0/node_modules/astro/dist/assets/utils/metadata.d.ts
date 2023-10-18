/// <reference types="node" resolution-mode="require"/>
import type { ImageMetadata } from '../types.js';
export declare function imageMetadata(data: Buffer, src?: string): Promise<Omit<ImageMetadata, 'src'>>;

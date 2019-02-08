export interface IStoryOptions {
    text: string;
    value: string;
}

export interface IStory {
    point: string;
    text: string;
    options: IStoryOptions[];
}

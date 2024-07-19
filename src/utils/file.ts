export const isImage = (file: File | null): boolean => {
    const fileTypeRegex = /^(image\/)(png|jpeg|jpg)$/i;
    const isFileMatch = file?.type.match(fileTypeRegex);

    return !!isFileMatch;
}
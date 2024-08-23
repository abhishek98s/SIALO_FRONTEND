export const isImage = (file: File | null): boolean => {
    const fileTypeRegex = /^(image\/)(png|jpeg|jpg)$/i;
    const isFileMatch = file?.type.match(fileTypeRegex);

    return !!isFileMatch;
}

export const dataURItoBlob = (base64Image: string) => {
    const base64Data = base64Image.split(',')[1];
    const binaryString = atob(base64Data);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: 'image/png' });
}

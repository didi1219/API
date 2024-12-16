export const calculOffset = ({size, page}) =>{

    return (page - 1) * size;
};

export const verifyValueOfPerPage = (perPage) =>{
    const valueMax = 20;
    if(perPage > valueMax){
        return valueMax;
    }
    return perPage;
};



const HighlightText = ({text, light}) => {

    if(light){
        return(
            <span className="bg-gradient-to-br font-bold from-[#5433FF] via-[#20BDFF] to-[#89f9ba] text-transparent bg-clip-text">
                {text}
            </span>
        )
    }else{
        return(
            <span className="bg-gradient-to-br font-bold from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
                {text}
            </span>

        )
    }
    
};

export default HighlightText;
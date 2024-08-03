

type btnProps = { 

    title:string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    svg:string;
};

const IconBtn : React.FC<btnProps> = ({title, onClick, svg }) => {
    return ( <button onClick={(e) => onClick(e)}  className="uppercase flex justify-center items-center gap-2 bg-white text-black py-1 px-6">
  {svg}<p className="mt-1">{title}</p>
    </button> );
}
 
export default IconBtn;
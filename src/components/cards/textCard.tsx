import Image from "next/image";
interface TextCardProps {
    imageSrc: string;
    date: string;
    title: string;
    description: string;
}

const TextCard: React.FC<TextCardProps> = ({ imageSrc, date, title, description }) => {
    return (
        <div className="flex flex-col justify-start text-center items-center w-1/4">
        <div className="w-60 h-60 mb-1 flex items-center justify-center overflow-hidden">
          <Image width={240} height={240} className="object-cover w-full h-full" src={imageSrc} alt="image" />
        </div>
        <p className="opacity-55 font-thin mt-2">{date}</p>
        <p className="font-bold mt-1">{title}</p>
        <p className="opacity-60 font-light mt-1">{description}</p>
      </div>
    );
}

export default TextCard;
import Image from "next/image"

export default function Comment(props) {
    return (
        <div className="flex flex-col justify-center p-4 ml-16">
            <div className="flex items-center gap-2">
                <div className='relative w-8 h-8'>
                    <Image fill src="/malpa.jpg" alt="" sizes="100vw" className="rounded-full " />
                </div>
                <p className="text-2xl">@{props.author}</p>
            </div>
            <p className="py-2 text-xl text-neutral-400">{props.comment}</p>
        </div>
    )
}